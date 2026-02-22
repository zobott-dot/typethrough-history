// ===================================================================
// APP — Typing engine, stats, navigation
// ===================================================================

// --- Passage freshness system ---
// Uses localStorage to track recently seen passages across sessions.
// Ensures you cycle through most of the library before seeing repeats.

var recentPassageKey = 'typethrough-recent-passages';
var recentLimit = Math.floor(passages.length * 0.75); // remember 75% of library
var selectedEra = 'all'; // current era filter

function selectEra(era) {
    selectedEra = era;
    // Update button states
    var buttons = document.querySelectorAll('.era-btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
    });
    // Find the clicked button by matching the era
    buttons.forEach(function(btn) {
        var btnEra = btn.getAttribute('onclick').match(/selectEra\('(.+?)'\)/);
        if (btnEra && btnEra[1] === era) {
            btn.classList.add('selected');
        }
    });
    // Pre-pick a passage for the selected era
    currentPassageIndex = pickNextPassage();
}

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

    // Build list of eligible passages (matching era filter)
    var eligible = [];
    for (var i = 0; i < passages.length; i++) {
        if (selectedEra === 'all' || passages[i].era.indexOf(selectedEra) !== -1) {
            eligible.push(i);
        }
    }

    // From eligible, filter out recently seen
    var unseen = eligible.filter(function(i) {
        return recent.indexOf(passages[i].title) === -1;
    });

    // If all eligible passages have been seen, use full eligible list
    if (unseen.length === 0) {
        unseen = eligible;
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
// NAVIGATION
// ===================================================================
var navHome = document.getElementById('navHome');
var navStats = document.getElementById('navStats');

function updateNav(activePage) {
    navHome.classList.remove('nav-active');
    navStats.classList.remove('nav-active');
    if (activePage === 'home') navHome.classList.add('nav-active');
    if (activePage === 'stats') navStats.classList.add('nav-active');
}
updateNav('home');

function hideAllScreens() {
    if (statsInterval) clearInterval(statsInterval);
    startScreen.style.display = 'none';
    typingScreen.classList.remove('visible');
    statsScreen.classList.remove('visible');
    isComplete = false;
}

function goHome() {
    hideAllScreens();
    startScreen.style.display = '';
    updateNav('home');
    currentPassageIndex = pickNextPassage();
}

function navigateToStats() {
    hideAllScreens();
    statsScreen.classList.add('visible');
    updateNav('stats');
    renderStats();
}

// ===================================================================
// START & NAVIGATION
// ===================================================================
function startTyping() {
    hideAllScreens();
    typingScreen.classList.add('visible');
    updateNav('');
    loadPassage(currentPassageIndex);
}

function quitToHome() {
    goHome();
}

function skipPassage() {
    // Stop any running stats timer
    if (statsInterval) clearInterval(statsInterval);

    // Pick a new passage and load it
    currentPassageIndex = pickNextPassage();
    loadPassage(currentPassageIndex);
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
// CHARACTER NORMALIZATION
// Accepts standard keyboard characters for special Unicode characters
// ===================================================================
function charsMatch(typed, expected) {
    if (typed === expected) return true;

    // Em dash or en dash: accept hyphen
    if ((expected === '\u2014' || expected === '\u2013') && typed === '-') return true;

    // Accented e: accept plain e
    if (expected === '\u00e9' && typed === 'e') return true;

    // Superscript 2: accept 2
    if (expected === '\u00b2' && typed === '2') return true;

    // Curly quotes: accept straight quotes
    if ((expected === '\u201C' || expected === '\u201D') && typed === '"') return true;
    if ((expected === '\u2018' || expected === '\u2019') && typed === "'") return true;

    return false;
}

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

        if (charsMatch(lastTyped, expectedChar)) {
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

    // Save stats
    saveSessionStats(passage.title, passage.era, wpm, accuracy, errors);

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

// ===================================================================
// STATS PERSISTENCE
// ===================================================================
var statsKey = 'typethrough-session-stats';
var maxStoredSessions = 100;

function saveSessionStats(title, era, wpm, accuracy, errorCount) {
    var history = getSessionHistory();
    history.push({
        title: title,
        era: era,
        wpm: wpm,
        accuracy: accuracy,
        errors: errorCount,
        date: new Date().toISOString()
    });
    // Keep only most recent sessions
    while (history.length > maxStoredSessions) {
        history.shift();
    }
    try {
        localStorage.setItem(statsKey, JSON.stringify(history));
    } catch(e) {}
}

function getSessionHistory() {
    try {
        var stored = localStorage.getItem(statsKey);
        return stored ? JSON.parse(stored) : [];
    } catch(e) {
        return [];
    }
}

// ===================================================================
// STATS DASHBOARD
// ===================================================================
var statsScreen = document.getElementById('statsScreen');

function showStats() {
    navigateToStats();
}

function showStatsFromTyping() {
    navigateToStats();
}

function hideStats() {
    goHome();
}

function clearStats() {
    if (confirm('Clear all your typing history? This cannot be undone.')) {
        try {
            localStorage.removeItem(statsKey);
            localStorage.removeItem(recentPassageKey);
        } catch(e) {}
        renderStats();
    }
}

function renderStats() {
    var history = getSessionHistory();

    // Summary stats
    var totalPassages = history.length;
    var bestWpm = 0;
    var totalWpm = 0;
    var totalAccuracy = 0;

    for (var i = 0; i < history.length; i++) {
        if (history[i].wpm > bestWpm) bestWpm = history[i].wpm;
        totalWpm += history[i].wpm;
        totalAccuracy += history[i].accuracy;
    }

    var avgWpm = totalPassages > 0 ? Math.round(totalWpm / totalPassages) : 0;
    var avgAccuracy = totalPassages > 0 ? Math.round(totalAccuracy / totalPassages) : 0;

    document.getElementById('statsTotalPassages').textContent = totalPassages;
    document.getElementById('statsBestWpm').textContent = bestWpm;
    document.getElementById('statsAvgWpm').textContent = avgWpm;
    document.getElementById('statsAvgAccuracy').textContent = avgAccuracy + '%';

    // Color code the summary stats
    document.getElementById('statsBestWpm').className = 'result-stat-value ' + getStatClass('wpm', bestWpm);
    document.getElementById('statsAvgWpm').className = 'result-stat-value ' + getStatClass('wpm', avgWpm);
    document.getElementById('statsAvgAccuracy').className = 'result-stat-value ' + getStatClass('accuracy', avgAccuracy);

    // Chart — last 20 sessions
    var chartContainer = document.getElementById('statsChart');
    var recent20 = history.slice(-20);

    if (recent20.length === 0) {
        chartContainer.innerHTML = '<div class="stats-chart-empty">Complete a few passages to see your trend here.</div>';
    } else {
        var maxWpm = 0;
        for (var j = 0; j < recent20.length; j++) {
            if (recent20[j].wpm > maxWpm) maxWpm = recent20[j].wpm;
        }
        if (maxWpm < 20) maxWpm = 20; // minimum scale

        var barsHtml = '';
        for (var k = 0; k < recent20.length; k++) {
            var s = recent20[k];
            var heightPct = Math.max(4, Math.round((s.wpm / maxWpm) * 100));
            var barColor = s.accuracy >= 95 ? 'var(--correct-green)' :
                           s.accuracy >= 85 ? 'var(--accent-gold)' : 'var(--accent-red-soft)';
            barsHtml += '<div class="stats-chart-bar" style="height:' + heightPct + '%;background:' + barColor + ';">';
            barsHtml += '<div class="bar-tooltip">' + s.wpm + ' WPM · ' + s.accuracy + '%</div>';
            barsHtml += '</div>';
        }
        chartContainer.innerHTML = barsHtml;
    }

    // Recent passages list — last 10
    var listContainer = document.getElementById('statsRecentList');
    var recent10 = history.slice(-10).reverse();

    if (recent10.length === 0) {
        listContainer.innerHTML = '<div class="stats-chart-empty">No passages completed yet.</div>';
    } else {
        var listHtml = '';
        for (var m = 0; m < recent10.length; m++) {
            var entry = recent10[m];
            var dateStr = formatDate(entry.date);
            listHtml += '<div class="stats-recent-item">';
            listHtml += '<span class="stats-recent-item-title">' + entry.title + '</span>';
            listHtml += '<span class="stats-recent-item-data">' + entry.wpm + ' WPM · ' + entry.accuracy + '% · ' + dateStr + '</span>';
            listHtml += '</div>';
        }
        listContainer.innerHTML = listHtml;
    }
}

function formatDate(isoString) {
    try {
        var d = new Date(isoString);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[d.getMonth()] + ' ' + d.getDate();
    } catch(e) {
        return '';
    }
}
