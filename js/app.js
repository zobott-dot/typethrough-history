// ===================================================================
// APP — Typing engine, stats, navigation
// ===================================================================

// --- Shuffle passages on load ---
function shufflePassages() {
    for (var i = passages.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = passages[i];
        passages[i] = passages[j];
        passages[j] = temp;
    }
}
shufflePassages();

// --- App State ---
var currentPassageIndex = 0;
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
var finalWpm = document.getElementById('finalWpm');
var finalAccuracy = document.getElementById('finalAccuracy');
var finalErrors = document.getElementById('finalErrors');
var footnoteText = document.getElementById('footnoteText');
var nextBtn = document.getElementById('nextBtn');

// ===================================================================
// START & NAVIGATION
// ===================================================================
function startTyping() {
    startScreen.style.display = 'none';
    typingScreen.classList.add('visible');
    loadPassage(currentPassageIndex);
}

function loadPassage(index) {
    var passage = passages[index];

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
    passageCount.textContent = 'Passage ' + (index + 1) + ' of ' + passages.length;

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

    // Hide results
    results.classList.remove('visible');

    // Update next button on last passage
    nextBtn.textContent = index >= passages.length - 1 ? 'Start Over' : 'Next Passage';
}

function nextPassage() {
    currentPassageIndex = (currentPassageIndex + 1) % passages.length;
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
}

// ===================================================================
// COMPLETION
// ===================================================================
function completePassage() {
    isComplete = true;
    if (statsInterval) clearInterval(statsInterval);
    playSound('complete');

    var passage = passages[currentPassageIndex];
    var wpm = calculateWPM();
    var accuracy = calculateAccuracy();

    // Hide prompt and live stats
    clickPrompt.style.display = 'none';
    liveStats.style.display = 'none';

    // Show results
    finalWpm.textContent = wpm;
    finalAccuracy.textContent = accuracy + '%';
    finalErrors.textContent = errors;
    footnoteText.textContent = passage.footnote;

    results.classList.add('visible');
}
