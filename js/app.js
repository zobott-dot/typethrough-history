// ===================================================================
// APP — Typing engine, stats, navigation
// ===================================================================

// --- Passage freshness system ---
// Uses localStorage to track recently seen passages across sessions.
// Ensures you cycle through most of the library before seeing repeats.

var recentPassageKey = 'typethrough-recent-passages';
var recentLimit = Math.floor(passages.length * 0.75); // remember 75% of library

function getRecentPassages() {
    try {
        var stored = localStorage.getItem(recentPassageKey);
        return stored ? JSON.parse(stored) : [];
    } catch(e) {
        return [];
    }
}

function markPassageSeen(title) {
    var recent = getRecentPassages();
    // Remove if already in list (so it moves to end)
    recent = recent.filter(function(t) { return t !== title; });
    recent.push(title);
    // Trim to limit
    while (recent.length > recentLimit) {
        recent.shift();
    }
    try {
        localStorage.setItem(recentPassageKey, JSON.stringify(recent));
    } catch(e) {
        // localStorage full or unavailable — continue without persistence
    }
}

function pickNextPassage() {
    var recent = getRecentPassages();
    // Build list of unseen passages
    var unseen = [];
    for (var i = 0; i < passages.length; i++) {
        if (recent.indexOf(passages[i].title) === -1) {
            unseen.push(i);
        }
    }
    // If all passages have been seen recently, clear history and use full list
    if (unseen.length === 0) {
        try { localStorage.removeItem(recentPassageKey); } catch(e) {}
        unseen = [];
        for (var j = 0; j < passages.length; j++) {
            unseen.push(j);
        }
    }
    // Pick a random index from unseen
    var pick = unseen[Math.floor(Math.random() * unseen.length)];
    return pick;
}

// Pick the first passage
var currentPassageIndex = pickNextPassage();
var currentCharIndex = 0;
var errors = 0;
var totalKeystrokes = 0;
var startTime = null;
var isTyping = false;
var isComplete = false;
var statsInterval = null;
var bellPlayedForLine = -1; // tracks which line the bell has already rung for
var carriagePlayedAtIndex = -1; // tracks which char index the carriage return played at

// --- DOM Elements ---
var startScreen = document.getElementById('startScreen');
var typingScreen = document.getElementById('typingScreen');
var passageDisplay = document.getElementById('passageDisplay');
var passageTitle = document.getElementById('passageTitle');
var passageEra = document.getElementById('passageEra');
var passageCount = document.getElementById('passageCount');
var typingInput = document.getElementById('typingInput');
var clickPrompt = document.getElementById('clickPrompt');
var liveStats = document.getElementById('liveStats');
var liveWpm = document.getElementById('liveWpm');
var liveAccuracy = document.getElementById('liveAccuracy');
var liveProgress = document.getElementById('liveProgress');
var results = document.getElementById('results');
var resultsRating = document.getElementById('resultsRating');
var finalWpm = document.getElementById('finalWpm');
var finalAccuracy = document.getElementById('finalAccuracy');
var finalErrors = document.getElementById('finalErrors');
var footnoteText = document.getElementById('footnoteText');
var nextBtn = document.getElementById('nextBtn');
var progressBar = document.getElementById('progressBar');

// ===================================================================
// START & NAVIGATION
// ===================================================================
function startTyping() {
    startScreen.style.display = 'none';
    typingScreen.classList.add('visible');
    loadPassage(currentPassageIndex);
}

function quitToHome() {
    // Stop any running stats timer
    if (statsInterval) clearInterval(statsInterval);

    // Hide typing screen, show start screen
    typingScreen.classList.remove('visible');
    startScreen.style.display = '';

    // Reset for next time
    isComplete = false;
    currentPassageIndex = pickNextPassage();
}

function loadPassage(index) {
    var passage = passages[index];
    markPassageSeen(passage.title);

    // Reset state
    currentCharIndex = 0;
    errors = 0;
    totalKeystrokes = 0;
    startTime = null;
    isTyping = false;
    isComplete = false;
    bellPlayedForLine = -1;
    carriagePlayedAtIndex = -1;
    if (statsInterval) clearInterval(statsInterval);

    // Update UI
    passageTitle.textContent = passage.title;
    passageEra.textContent = passage.era;
    var unseenCount = passages.length - getRecentPassages().length;
    passageCount.textContent = unseenCount + ' of ' + passages.length + ' passages remaining';

    // Render characters
    passageDisplay.innerHTML = '';
    for (var i = 0; i < passage.text.length; i++) {
        var span = document.createElement('span');
        span.className = 'char' + (i === 0 ? ' current' : '');
        span.textContent = passage.text[i];
        passageDisplay.appendChild(span);
    }

    // Reset input and prompt
    typingInput.value = '';
    clickPrompt.style.display = 'block';
    clickPrompt.textContent = 'Click here or press any key to begin typing...';
    clickPrompt.className = 'click-prompt';

    // Reset stats
    liveWpm.textContent = '0';
    liveAccuracy.textContent = '100%';
    liveProgress.textContent = '0%';
    liveStats.style.display = 'flex';
    progressBar.style.width = '0%';

    // Hide results
    results.classList.remove('visible');

    // Update next button on last passage
    nextBtn.textContent = 'Next Passage';
}

function nextPassage() {
    currentPassageIndex = pickNextPassage();
    loadPassage(currentPassageIndex);
}

function retryPassage() {
    loadPassage(currentPassageIndex);
}

// ===================================================================
// TYPING ACTIVATION
// ===================================================================
function activateTyping() {
    if (isComplete) return;
    typingInput.focus();
    clickPrompt.textContent = 'Typing active \u2014 start when ready...';
    clickPrompt.classList.add('active');
}

// Listen for any keypress on the page to activate
document.addEventListener('keydown', function(e) {
    if (startScreen.style.display !== 'none') return;
    if (isComplete) return;
    if (!typingInput.matches(':focus')) {
        activateTyping();
    }
});

// ===================================================================
// CORE TYPING ENGINE
// ===================================================================
typingInput.addEventListener('input', function(e) {
    if (isComplete) return;

    var passage = passages[currentPassageIndex];
    var chars = passageDisplay.querySelectorAll('.char');

    // Start timer on first keystroke
    if (!startTime) {
        startTime = new Date();
        statsInterval = setInterval(updateLiveStats, 200);
    }

    var inputVal = typingInput.value;
    var lastTyped = inputVal[inputVal.length - 1];

    if (currentCharIndex < passage.text.length) {
        totalKeystrokes++;
        var expectedChar = passage.text[currentCharIndex];

        if (lastTyped === expectedChar) {
            chars[currentCharIndex].classList.remove('current');
            chars[currentCharIndex].classList.add('correct');
        } else {
            chars[currentCharIndex].classList.remove('current');
            chars[currentCharIndex].classList.add('incorrect');
            errors++;
        }
        // --- Typewriter line-awareness ---
        // Look ahead to find if a line wrap is coming soon
        var bellDistance = 7; // bell rings this many chars before line end
        var isAtLineWrap = false;
        var isBellZone = false;

        if (currentCharIndex < passage.text.length - 1) {
            var currentTop = chars[currentCharIndex].offsetTop;

            // Check if the NEXT character wraps to a new line
            var nextTop = chars[currentCharIndex + 1] ? chars[currentCharIndex + 1].offsetTop : currentTop;
            if (nextTop > currentTop) {
                isAtLineWrap = true;
            }

            // Check if we're approaching a line wrap (bell warning zone)
            if (!isAtLineWrap) {
                for (var look = 1; look <= bellDistance; look++) {
                    var ahead = currentCharIndex + look;
                    if (ahead < passage.text.length) {
                        if (chars[ahead].offsetTop > currentTop) {
                            isBellZone = true;
                            break;
                        }
                    }
                }
            }
        }

        if (isAtLineWrap && carriagePlayedAtIndex !== currentCharIndex) {
            carriagePlayedAtIndex = currentCharIndex;
            playSound('carriageReturn');
        } else if (isBellZone && bellPlayedForLine !== currentTop) {
            bellPlayedForLine = currentTop;
            playSound('bell');
            playSound(lastTyped === ' ' ? 'space' : 'key');
        } else {
            playSound(lastTyped === ' ' ? 'space' : 'key');
        }

        currentCharIndex++;

        // Mark next character as current
        if (currentCharIndex < passage.text.length) {
            chars[currentCharIndex].classList.add('current');
        }

        // Check completion
        if (currentCharIndex >= passage.text.length) {
            completePassage();
        }
    }

    // Reset input to prevent it from growing
    typingInput.value = '';
});

// Handle backspace - go back one character and clear its state
typingInput.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
        e.preventDefault();
        if (currentCharIndex > 0 && !isComplete) {
            playSound('backspace');
            currentCharIndex--;
            var chars = passageDisplay.querySelectorAll('.char');

            // Remove current marker from where we were
            if (currentCharIndex + 1 < chars.length) {
                chars[currentCharIndex + 1].classList.remove('current');
            }

            // If the character we're going back to was incorrect, reduce error count
            if (chars[currentCharIndex].classList.contains('incorrect')) {
                errors--;
                totalKeystrokes--;
            } else if (chars[currentCharIndex].classList.contains('correct')) {
                totalKeystrokes--;
            }

            // Clear the state of the character we're going back to
            chars[currentCharIndex].classList.remove('correct', 'incorrect');
            chars[currentCharIndex].classList.add('current');
        }
    }
    // Prevent Tab from leaving
    if (e.key === 'Tab') {
        e.preventDefault();
    }
});

// ===================================================================
// STATS CALCULATION
// ===================================================================
function calculateWPM() {
    if (!startTime || currentCharIndex === 0) return 0;
    var elapsed = (new Date() - startTime) / 1000 / 60; // minutes
    var words = currentCharIndex / 5; // standard: 5 chars = 1 word
    return Math.round(words / elapsed);
}

function calculateAccuracy() {
    if (totalKeystrokes === 0) return 100;
    return Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100);
}

function updateLiveStats() {
    liveWpm.textContent = calculateWPM();
    liveAccuracy.textContent = calculateAccuracy() + '%';
    var progress = Math.round((currentCharIndex / passages[currentPassageIndex].text.length) * 100);
    liveProgress.textContent = progress + '%';
    progressBar.style.width = progress + '%';
}

// ===================================================================
// COMPLETION
// ===================================================================
function getPerformanceRating(wpm, accuracy) {
    if (wpm >= 60 && accuracy >= 97) return { text: 'Legendary Typist', css: 'rating-legendary' };
    if (wpm >= 45 && accuracy >= 95) return { text: 'Expert Typist', css: 'rating-excellent' };
    if (wpm >= 30 && accuracy >= 90) return { text: 'Solid Typist', css: 'rating-solid' };
    if (wpm >= 20 && accuracy >= 80) return { text: 'Getting There', css: 'rating-solid' };
    return { text: 'Keep Practicing', css: 'rating-learning' };
}

function getStatClass(type, value) {
    if (type === 'wpm') {
        if (value >= 50) return 'stat-great';
        if (value >= 30) return 'stat-good';
        return 'stat-needs-work';
    }
    if (type === 'accuracy') {
        if (value >= 95) return 'stat-great';
        if (value >= 85) return 'stat-good';
        return 'stat-needs-work';
    }
    if (type === 'errors') {
        if (value <= 2) return 'stat-great';
        if (value <= 8) return 'stat-good';
        return 'stat-needs-work';
    }
    return 'stat-good';
}

function completePassage() {
    isComplete = true;
    if (statsInterval) clearInterval(statsInterval);
    playSound('complete');

    // Fill progress bar to 100%
    progressBar.style.width = '100%';

    var passage = passages[currentPassageIndex];
    var wpm = calculateWPM();
    var accuracy = calculateAccuracy();

    // Hide prompt and live stats
    clickPrompt.style.display = 'none';
    liveStats.style.display = 'none';

    // Performance rating
    var rating = getPerformanceRating(wpm, accuracy);
    resultsRating.textContent = rating.text;
    resultsRating.className = 'results-rating ' + rating.css;

    // Color-coded stats
    finalWpm.textContent = wpm;
    finalWpm.className = 'result-stat-value ' + getStatClass('wpm', wpm);
    finalAccuracy.textContent = accuracy + '%';
    finalAccuracy.className = 'result-stat-value ' + getStatClass('accuracy', accuracy);
    finalErrors.textContent = errors;
    finalErrors.className = 'result-stat-value ' + getStatClass('errors', errors);

    footnoteText.textContent = passage.footnote;

    results.classList.add('visible');
}
