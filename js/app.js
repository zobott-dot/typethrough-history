// ===================================================================
// APP — Typing engine, stats, navigation, game loop
// ===================================================================

// ===================================================================
// GAME STATE & CONSTANTS
// ===================================================================
var ACCURACY_THRESHOLD = 85; // minimum accuracy to "earn" a passage
var STORAGE_KEYS = {
    recentPassages: 'typethrough-recent-passages',
    sessionStats: 'typethrough-session-stats',
    campaignProgress: 'typethrough-campaign-progress',
    totalScore: 'typethrough-total-score',
    gameMode: 'typethrough-game-mode',
    typingMode: 'typethrough-typing-mode'
};
var maxStoredSessions = 100;

// The five main historical eras (campaign eras)
var CAMPAIGN_ERAS = [
    'The New Century',
    'The Great War',
    'The Roaring Twenties',
    'The Great Depression',
    'The World at War Again'
];

var selectedEra = 'all';
var gameMode = loadGameMode(); // 'campaign' or 'freeplay'
var typingMode = loadTypingMode(); // 'correction' or 'flow'

// ===================================================================
// PASSAGE MANAGEMENT
// ===================================================================

// Build an index of passages by era for campaign mode
var passagesByEra = {};
(function() {
    for (var i = 0; i < passages.length; i++) {
        for (var e = 0; e < CAMPAIGN_ERAS.length; e++) {
            if (passages[i].era.indexOf(CAMPAIGN_ERAS[e]) !== -1) {
                if (!passagesByEra[CAMPAIGN_ERAS[e]]) {
                    passagesByEra[CAMPAIGN_ERAS[e]] = [];
                }
                passagesByEra[CAMPAIGN_ERAS[e]].push(i);
                break;
            }
        }
    }
})();

function selectEra(era) {
    selectedEra = era;
    var buttons = document.querySelectorAll('.era-btn');
    buttons.forEach(function(btn) {
        btn.classList.remove('selected');
    });
    buttons.forEach(function(btn) {
        var btnEra = btn.getAttribute('onclick').match(/selectEra\('(.+?)'\)/);
        if (btnEra && btnEra[1] === era) {
            btn.classList.add('selected');
        }
    });
    currentPassageIndex = pickNextPassage();
    updateEraProgress();
}

// --- Freshness system (Free Play) ---
var recentLimit = Math.floor(passages.length * 0.75);

function getRecentPassages() {
    try {
        var stored = localStorage.getItem(STORAGE_KEYS.recentPassages);
        return stored ? JSON.parse(stored) : [];
    } catch(e) { return []; }
}

function markPassageSeen(title) {
    var recent = getRecentPassages();
    recent = recent.filter(function(t) { return t !== title; });
    recent.push(title);
    while (recent.length > recentLimit) { recent.shift(); }
    try { localStorage.setItem(STORAGE_KEYS.recentPassages, JSON.stringify(recent)); } catch(e) {}
}

// --- Campaign progress ---
function getCampaignProgress() {
    try {
        var stored = localStorage.getItem(STORAGE_KEYS.campaignProgress);
        return stored ? JSON.parse(stored) : {};
    } catch(e) { return {}; }
}

function saveCampaignProgress(progress) {
    try { localStorage.setItem(STORAGE_KEYS.campaignProgress, JSON.stringify(progress)); } catch(e) {}
}

function markPassageEarned(passageTitle, eraName) {
    var progress = getCampaignProgress();
    if (!progress[eraName]) progress[eraName] = [];
    if (progress[eraName].indexOf(passageTitle) === -1) {
        progress[eraName].push(passageTitle);
    }
    saveCampaignProgress(progress);
}

function isPassageEarned(passageTitle, eraName) {
    var progress = getCampaignProgress();
    return progress[eraName] && progress[eraName].indexOf(passageTitle) !== -1;
}

function getEraCompletionCount(eraName) {
    var progress = getCampaignProgress();
    return progress[eraName] ? progress[eraName].length : 0;
}

function getEraTotalCount(eraName) {
    return passagesByEra[eraName] ? passagesByEra[eraName].length : 0;
}

// --- Passage picking ---
function pickNextPassage() {
    if (gameMode === 'campaign' && selectedEra !== 'all') {
        return pickNextCampaignPassage();
    }
    return pickNextFreePlayPassage();
}

function pickNextCampaignPassage() {
    var eraName = selectedEra;
    var indices = passagesByEra[eraName] || [];
    var progress = getCampaignProgress();
    var earned = progress[eraName] || [];

    // Find first unearned passage (in order)
    for (var i = 0; i < indices.length; i++) {
        var idx = indices[i];
        if (earned.indexOf(passages[idx].title) === -1) {
            return idx;
        }
    }
    // All earned — return first passage (replay)
    return indices.length > 0 ? indices[0] : 0;
}

function pickNextFreePlayPassage() {
    var recent = getRecentPassages();
    var eligible = [];
    for (var i = 0; i < passages.length; i++) {
        if (selectedEra === 'all' || passages[i].era.indexOf(selectedEra) !== -1) {
            eligible.push(i);
        }
    }
    var unseen = eligible.filter(function(i) {
        return recent.indexOf(passages[i].title) === -1;
    });
    if (unseen.length === 0) unseen = eligible;

    // Weakness-aware weighting
    var weakChars = getWeakCharacters(15);
    var stats = getSessionHistory();
    var avgWpm = 0;
    if (stats.length > 0) {
        var sum = 0;
        var count = Math.min(stats.length, 10);
        for (var s = stats.length - count; s < stats.length; s++) {
            sum += (stats[s].wpm || 0);
        }
        avgWpm = sum / count;
    }

    if (weakChars.length === 0 && avgWpm < 20) {
        // No data yet — pure random
        return unseen[Math.floor(Math.random() * unseen.length)];
    }

    // Score each eligible passage
    var scored = [];
    for (var j = 0; j < unseen.length; j++) {
        var idx = unseen[j];
        var weakScore = getPassageWeaknessScore(idx);
        var diff = calculatePassageDifficulty(passages[idx].text);

        // Adaptive: prefer harder passages as WPM rises
        var diffBonus = 0;
        if (avgWpm >= 50) diffBonus = diff.score * 0.5;
        else if (avgWpm >= 35) diffBonus = diff.score * 0.25;

        var total = 1 + weakScore * 10 + diffBonus;
        scored.push({ index: idx, weight: total });
    }

    // Weighted random selection
    var totalWeight = 0;
    for (var k = 0; k < scored.length; k++) totalWeight += scored[k].weight;

    var roll = Math.random() * totalWeight;
    var cumulative = 0;
    for (var m = 0; m < scored.length; m++) {
        cumulative += scored[m].weight;
        if (roll <= cumulative) return scored[m].index;
    }
    return scored[scored.length - 1].index;
}

// --- Game mode ---
function loadGameMode() {
    try {
        var stored = localStorage.getItem(STORAGE_KEYS.gameMode);
        return stored === 'campaign' ? 'campaign' : 'freeplay';
    } catch(e) { return 'freeplay'; }
}

function setGameMode(mode) {
    gameMode = mode;
    try { localStorage.setItem(STORAGE_KEYS.gameMode, mode); } catch(e) {}
    var btnCampaign = document.getElementById('btnCampaign');
    var btnFreeplay = document.getElementById('btnFreeplay');
    if (btnCampaign && btnFreeplay) {
        btnCampaign.classList.toggle('btn-primary', mode === 'campaign');
        btnCampaign.classList.toggle('btn-secondary', mode !== 'campaign');
        btnFreeplay.classList.toggle('btn-primary', mode === 'freeplay');
        btnFreeplay.classList.toggle('btn-secondary', mode !== 'freeplay');
    }
    currentPassageIndex = pickNextPassage();
    updateEraProgress();

    var desc = document.getElementById('modeDescription');
    if (desc) {
        desc.textContent = mode === 'campaign'
            ? 'Earn passages in order. 85% accuracy required.'
            : 'Random passages. Type at your own pace.';
    }
}

// --- Typing mode (correction vs flow) ---
function loadTypingMode() {
    try {
        var stored = localStorage.getItem(STORAGE_KEYS.typingMode);
        return stored === 'flow' ? 'flow' : 'correction';
    } catch(e) { return 'correction'; }
}

function setTypingMode(mode) {
    typingMode = mode;
    try { localStorage.setItem(STORAGE_KEYS.typingMode, mode); } catch(e) {}
    var btnCorrection = document.getElementById('btnCorrection');
    var btnFlow = document.getElementById('btnFlow');
    if (btnCorrection && btnFlow) {
        btnCorrection.classList.toggle('btn-primary', mode === 'correction');
        btnCorrection.classList.toggle('btn-secondary', mode !== 'correction');
        btnFlow.classList.toggle('btn-primary', mode === 'flow');
        btnFlow.classList.toggle('btn-secondary', mode !== 'flow');
    }
    var hint = document.getElementById('typingModeHint');
    if (hint) {
        hint.textContent = mode === 'flow'
            ? 'No backspace — push through mistakes to build muscle memory.'
            : 'Backspace allowed — fix errors as you go.';
    }
    // Update indicator on typing screen
    var indicator = document.getElementById('typingModeIndicator');
    if (indicator) {
        indicator.textContent = mode === 'flow' ? 'Flow mode' : '';
    }
}

// ===================================================================
// SCORING
// ===================================================================
function calculateScore(wpm, accuracy) {
    var multiplier = 1.0;
    if (accuracy >= 100) multiplier = 2.0;
    else if (accuracy >= 97) multiplier = 1.8;
    else if (accuracy >= 95) multiplier = 1.5;
    else if (accuracy >= 90) multiplier = 1.2;
    else if (accuracy >= 85) multiplier = 1.0;
    else multiplier = 0.5;
    return Math.round(wpm * multiplier * 10);
}

function getTotalScore() {
    try {
        var stored = localStorage.getItem(STORAGE_KEYS.totalScore);
        return stored ? parseInt(stored, 10) : 0;
    } catch(e) { return 0; }
}

function addToTotalScore(points) {
    var total = getTotalScore() + points;
    try { localStorage.setItem(STORAGE_KEYS.totalScore, total.toString()); } catch(e) {}
    return total;
}

// ===================================================================
// TYPING INTELLIGENCE
// ===================================================================
var CHAR_STATS_KEY = 'typethrough-char-stats';

// Per-session tracking (reset each passage)
var sessionCharErrors = {}; // { char: errorCount }
var sessionCharAttempts = {}; // { char: attemptCount }

function getCharStats() {
    try {
        var stored = localStorage.getItem(CHAR_STATS_KEY);
        return stored ? JSON.parse(stored) : { errors: {}, attempts: {} };
    } catch(e) { return { errors: {}, attempts: {} }; }
}

function saveCharStats(charErrors, charAttempts) {
    var stats = getCharStats();
    for (var ch in charErrors) {
        stats.errors[ch] = (stats.errors[ch] || 0) + charErrors[ch];
    }
    for (var ch2 in charAttempts) {
        stats.attempts[ch2] = (stats.attempts[ch2] || 0) + charAttempts[ch2];
    }
    try { localStorage.setItem(CHAR_STATS_KEY, JSON.stringify(stats)); } catch(e) {}
}

function getWeakCharacters(topN) {
    var stats = getCharStats();
    var rates = [];
    for (var ch in stats.attempts) {
        if (stats.attempts[ch] >= 5) { // minimum sample size
            var errorRate = (stats.errors[ch] || 0) / stats.attempts[ch];
            if (errorRate > 0.05) { // only show chars with >5% error rate
                rates.push({ char: ch, rate: errorRate, attempts: stats.attempts[ch] });
            }
        }
    }
    rates.sort(function(a, b) { return b.rate - a.rate; });
    return rates.slice(0, topN || 10);
}

// --- Passage difficulty ---
function calculatePassageDifficulty(text) {
    var length = text.length;
    if (length === 0) return { score: 0, label: 'Easy', css: 'difficulty-easy' };

    var numbers = 0;
    var punctuation = 0;
    var uppercase = 0;
    var special = 0;

    for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if (c >= '0' && c <= '9') numbers++;
        else if (',.:;!?\'"()'.indexOf(c) !== -1) punctuation++;
        else if (c === c.toUpperCase() && c !== c.toLowerCase()) uppercase++;
        if ('\u2014\u2013\u00e9\u00b2'.indexOf(c) !== -1) special++;
    }

    // Calculate density scores (percentage of text)
    var numberDensity = numbers / length;
    var punctDensity = punctuation / length;
    var specialDensity = special / length;

    // Words and average word length
    var words = text.split(/\s+/);
    var avgWordLen = 0;
    for (var w = 0; w < words.length; w++) avgWordLen += words[w].length;
    avgWordLen = words.length > 0 ? avgWordLen / words.length : 0;

    // Composite score 0-100
    var score = Math.round(
        (numberDensity * 200) +
        (punctDensity * 150) +
        (specialDensity * 300) +
        (Math.max(0, avgWordLen - 4) * 5) +
        (length > 400 ? 10 : 0) +
        (length > 600 ? 10 : 0)
    );
    score = Math.min(100, score);

    if (score >= 40) return { score: score, label: 'Challenging', css: 'difficulty-challenging' };
    if (score >= 20) return { score: score, label: 'Moderate', css: 'difficulty-moderate' };
    return { score: score, label: 'Easy', css: 'difficulty-easy' };
}

// --- Weakness-aware passage scoring ---
function getPassageWeaknessScore(passageIndex) {
    var weakChars = getWeakCharacters(15);
    if (weakChars.length === 0) return 0;

    var text = passages[passageIndex].text.toLowerCase();
    var score = 0;

    for (var w = 0; w < weakChars.length; w++) {
        var ch = weakChars[w].char.toLowerCase();
        for (var i = 0; i < text.length; i++) {
            if (text[i] === ch) score += weakChars[w].rate;
        }
    }
    return score;
}
// ===================================================================
// APP STATE
// ===================================================================
var currentPassageIndex = pickNextPassage();
var currentCharIndex = 0;
var errors = 0;
var totalKeystrokes = 0;
var startTime = null;
var isTyping = false;
var isComplete = false;
var statsInterval = null;
var bellPlayedForLine = -1;
var carriagePlayedAtIndex = -1;

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
var finalScore = document.getElementById('finalScore');
var passageEarnedMsg = document.getElementById('passageEarnedMsg');
var footnoteText = document.getElementById('footnoteText');
var nextBtn = document.getElementById('nextBtn');
var progressBar = document.getElementById('progressBar');
var statsScreen = document.getElementById('statsScreen');
var journeyScreen = document.getElementById('journeyScreen');
var tipsScreen = document.getElementById('tipsScreen');

// ===================================================================
// NAVIGATION
// ===================================================================
var navHome = document.getElementById('navHome');
var navJourney = document.getElementById('navJourney');
var navStats = document.getElementById('navStats');
var navTips = document.getElementById('navTips');

function updateNav(activePage) {
    navHome.classList.remove('nav-active');
    navJourney.classList.remove('nav-active');
    navStats.classList.remove('nav-active');
    navTips.classList.remove('nav-active');
    if (activePage === 'home') navHome.classList.add('nav-active');
    if (activePage === 'journey') navJourney.classList.add('nav-active');
    if (activePage === 'stats') navStats.classList.add('nav-active');
    if (activePage === 'tips') navTips.classList.add('nav-active');
}
updateNav('home');

function hideAllScreens() {
    if (statsInterval) clearInterval(statsInterval);
    startScreen.style.display = 'none';
    typingScreen.classList.remove('visible');
    statsScreen.classList.remove('visible');
    journeyScreen.classList.remove('visible');
    tipsScreen.classList.remove('visible');
    isComplete = false;
}

function goHome() {
    hideAllScreens();
    startScreen.style.display = '';
    updateNav('home');
    currentPassageIndex = pickNextPassage();
    updateEraProgress();
    updateHomeScore();
}

function navigateToStats() {
    hideAllScreens();
    statsScreen.classList.add('visible');
    updateNav('stats');
    renderStats();
}

function navigateToJourney() {
    hideAllScreens();
    journeyScreen.classList.add('visible');
    updateNav('journey');
    renderJourney();
}

function navigateToTips() {
    hideAllScreens();
    tipsScreen.classList.add('visible');
    updateNav('tips');
}

// ===================================================================
// ERA PROGRESS DISPLAY
// ===================================================================
function updateEraProgress() {
    for (var e = 0; e < CAMPAIGN_ERAS.length; e++) {
        var eraName = CAMPAIGN_ERAS[e];
        var earned = getEraCompletionCount(eraName);
        var total = getEraTotalCount(eraName);
        var el = document.getElementById('eraProgress-' + e);
        if (el) {
            if (gameMode === 'campaign') {
                el.textContent = earned + ' / ' + total;
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        }
    }
    // Also update All Eras
    var allEl = document.getElementById('eraProgress-all');
    if (allEl) {
        if (gameMode === 'campaign') {
            var totalEarned = 0;
            var totalAll = 0;
            for (var f = 0; f < CAMPAIGN_ERAS.length; f++) {
                totalEarned += getEraCompletionCount(CAMPAIGN_ERAS[f]);
                totalAll += getEraTotalCount(CAMPAIGN_ERAS[f]);
            }
            allEl.textContent = totalEarned + ' / ' + totalAll;
            allEl.style.display = '';
        } else {
            allEl.style.display = 'none';
        }
    }
}

function updateHomeScore() {
    var el = document.getElementById('homeScore');
    if (el) {
        var total = getTotalScore();
        el.textContent = total.toLocaleString() + ' pts';
        el.style.display = total > 0 ? '' : 'none';
    }
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
    if (statsInterval) clearInterval(statsInterval);
    currentPassageIndex = pickNextPassage();
    loadPassage(currentPassageIndex);
}

function loadPassage(index) {
    var passage = passages[index];
    markPassageSeen(passage.title);

    currentCharIndex = 0;
    errors = 0;
    totalKeystrokes = 0;
    startTime = null;
    isTyping = false;
    isComplete = false;
    bellPlayedForLine = -1;
    carriagePlayedAtIndex = -1;
    sessionCharErrors = {};
    sessionCharAttempts = {};
    if (statsInterval) clearInterval(statsInterval);
    typingScreen.classList.remove('focus-active');

    // Update UI
    passageTitle.textContent = passage.title;
    passageEra.textContent = passage.era;

    // Difficulty badge
    var diffEl = document.getElementById('passageDifficulty');
    if (diffEl) {
        var diff = calculatePassageDifficulty(passage.text);
        diffEl.textContent = diff.label;
        diffEl.className = 'passage-difficulty ' + diff.css;
    }

    // Typing mode indicator
    var indicator = document.getElementById('typingModeIndicator');
    if (indicator) {
        indicator.textContent = typingMode === 'flow' ? 'Flow mode' : '';
    }

    // Passage count — show campaign progress or remaining
    if (gameMode === 'campaign' && selectedEra !== 'all') {
        var earned = getEraCompletionCount(selectedEra);
        var total = getEraTotalCount(selectedEra);
        passageCount.textContent = earned + ' of ' + total + ' earned';
    } else {
        var unseenCount = passages.length - getRecentPassages().length;
        passageCount.textContent = unseenCount + ' of ' + passages.length + ' passages remaining';
    }

    // Render characters
    passageDisplay.innerHTML = '';
    passageDisplay.scrollTop = 0;
    for (var i = 0; i < passage.text.length; i++) {
        var span = document.createElement('span');
        span.className = 'char' + (i === 0 ? ' current' : '');
        span.textContent = passage.text[i];
        passageDisplay.appendChild(span);
    }

    typingInput.value = '';
    clickPrompt.style.display = 'block';
    clickPrompt.textContent = 'Click here or press any key to begin typing...';
    clickPrompt.className = 'click-prompt';

    liveWpm.textContent = '0';
    liveAccuracy.textContent = '100%';
    liveProgress.textContent = '0%';
    liveStats.style.display = 'flex';
    progressBar.style.width = '0%';

    results.classList.remove('visible');
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

document.addEventListener('keydown', function(e) {
    if (startScreen.style.display !== 'none') return;
    if (isComplete) return;
    if (!typingInput.matches(':focus')) {
        activateTyping();
    }
});

// ===================================================================
// CHARACTER NORMALIZATION
// ===================================================================
function charsMatch(typed, expected) {
    if (typed === expected) return true;
    if ((expected === '\u2014' || expected === '\u2013') && typed === '-') return true;
    if (expected === '\u00e9' && typed === 'e') return true;
    if (expected === '\u00b2' && typed === '2') return true;
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

    if (!startTime) {
        startTime = new Date();
        statsInterval = setInterval(updateLiveStats, 200);
        // Focus Mode: fade non-essential UI
        typingScreen.classList.add('focus-active');
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
            // Track character error
            var errKey = expectedChar === ' ' ? 'SPACE' : expectedChar;
            sessionCharErrors[errKey] = (sessionCharErrors[errKey] || 0) + 1;
        }
        // Track character attempt
        var attemptKey = expectedChar === ' ' ? 'SPACE' : expectedChar;
        sessionCharAttempts[attemptKey] = (sessionCharAttempts[attemptKey] || 0) + 1;

        // --- Typewriter line-awareness ---
        var bellDistance = 7;
        var isAtLineWrap = false;
        var isBellZone = false;

        if (currentCharIndex < passage.text.length - 1) {
            var currentTop = chars[currentCharIndex].offsetTop;
            var nextTop = chars[currentCharIndex + 1] ? chars[currentCharIndex + 1].offsetTop : currentTop;
            if (nextTop > currentTop) {
                isAtLineWrap = true;
            }
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

        if (currentCharIndex < passage.text.length) {
            chars[currentCharIndex].classList.add('current');
            // Auto-scroll: keep current character visible
            autoScrollToCurrentChar(chars[currentCharIndex]);
        }

        if (currentCharIndex >= passage.text.length) {
            completePassage();
        }
    }

    typingInput.value = '';
});

// Handle backspace
typingInput.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
        e.preventDefault();
        // Flow mode: no backspace allowed
        if (typingMode === 'flow') return;
        if (currentCharIndex > 0 && !isComplete) {
            playSound('backspace');
            currentCharIndex--;
            var chars = passageDisplay.querySelectorAll('.char');

            if (currentCharIndex + 1 < chars.length) {
                chars[currentCharIndex + 1].classList.remove('current');
            }

            if (chars[currentCharIndex].classList.contains('incorrect')) {
                errors--;
                totalKeystrokes--;
            } else if (chars[currentCharIndex].classList.contains('correct')) {
                totalKeystrokes--;
            }

            chars[currentCharIndex].classList.remove('correct', 'incorrect');
            chars[currentCharIndex].classList.add('current');
            // Auto-scroll back
            autoScrollToCurrentChar(chars[currentCharIndex]);
        }
    }
    if (e.key === 'Tab') {
        e.preventDefault();
    }
});

// ===================================================================
// AUTO-SCROLL
// ===================================================================
function autoScrollToCurrentChar(charEl) {
    if (!charEl || !passageDisplay) return;
    var containerRect = passageDisplay.getBoundingClientRect();
    var charRect = charEl.getBoundingClientRect();

    // If the character is below the visible area, scroll down
    if (charRect.bottom > containerRect.bottom - 20) {
        passageDisplay.scrollTop += charRect.bottom - containerRect.bottom + 40;
    }
    // If the character is above the visible area, scroll up
    if (charRect.top < containerRect.top + 20) {
        passageDisplay.scrollTop -= containerRect.top - charRect.top + 40;
    }
}

// ===================================================================
// STATS CALCULATION
// ===================================================================
function calculateWPM() {
    if (!startTime || currentCharIndex === 0) return 0;
    var elapsed = (new Date() - startTime) / 1000 / 60;
    var words = currentCharIndex / 5;
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
    progressBar.style.width = '100%';
    // Restore full UI from focus mode
    typingScreen.classList.remove('focus-active');

    var passage = passages[currentPassageIndex];
    var wpm = calculateWPM();
    var accuracy = calculateAccuracy();
    var score = calculateScore(wpm, accuracy);
    var earned = accuracy >= ACCURACY_THRESHOLD;

    // Determine which campaign era this passage belongs to
    var passageEraName = null;
    for (var e = 0; e < CAMPAIGN_ERAS.length; e++) {
        if (passage.era.indexOf(CAMPAIGN_ERAS[e]) !== -1) {
            passageEraName = CAMPAIGN_ERAS[e];
            break;
        }
    }

    // Save stats
    saveSessionStats(passage.title, passage.era, wpm, accuracy, errors, score, earned);
    saveCharStats(sessionCharErrors, sessionCharAttempts);

    // Add score
    if (earned) {
        addToTotalScore(score);
        if (passageEraName) {
            markPassageEarned(passage.title, passageEraName);
        }
    }

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

    // Score display
    finalScore.textContent = '+' + score + ' pts';
    finalScore.className = 'result-score ' + (earned ? 'score-earned' : 'score-not-earned');

    // Earned message
    if (earned) {
        var eraEarned = getEraCompletionCount(passageEraName);
        var eraTotal = getEraTotalCount(passageEraName);
        if (passageEraName && eraEarned >= eraTotal) {
            passageEarnedMsg.textContent = 'Era complete! You\'ve earned every passage in ' + passageEraName + '.';
            passageEarnedMsg.className = 'passage-earned-msg earned-era-complete';
        } else {
            passageEarnedMsg.textContent = 'Passage earned!';
            passageEarnedMsg.className = 'passage-earned-msg earned';
        }
    } else {
        passageEarnedMsg.textContent = 'Below ' + ACCURACY_THRESHOLD + '% accuracy \u2014 passage not earned. Try again?';
        passageEarnedMsg.className = 'passage-earned-msg not-earned';
    }

    footnoteText.textContent = passage.footnote;
    results.classList.add('visible');
}

// ===================================================================
// STATS PERSISTENCE
// ===================================================================
function saveSessionStats(title, era, wpm, accuracy, errorCount, score, earned) {
    var history = getSessionHistory();
    history.push({
        title: title,
        era: era,
        wpm: wpm,
        accuracy: accuracy,
        errors: errorCount,
        score: score,
        earned: earned,
        date: new Date().toISOString()
    });
    while (history.length > maxStoredSessions) { history.shift(); }
    try { localStorage.setItem(STORAGE_KEYS.sessionStats, JSON.stringify(history)); } catch(e) {}
}

function getSessionHistory() {
    try {
        var stored = localStorage.getItem(STORAGE_KEYS.sessionStats);
        return stored ? JSON.parse(stored) : [];
    } catch(e) { return []; }
}

// ===================================================================
// STATS DASHBOARD
// ===================================================================
function showStats() { navigateToStats(); }
function showStatsFromTyping() { navigateToStats(); }
function hideStats() { goHome(); }

function clearStats() {
    if (confirm('Clear all your typing history and progress? This cannot be undone.')) {
        try {
            for (var key in STORAGE_KEYS) {
                localStorage.removeItem(STORAGE_KEYS[key]);
            }
            localStorage.removeItem(CHAR_STATS_KEY);
        } catch(e) {}
        renderStats();
        updateEraProgress();
        updateHomeScore();
    }
}

function renderStats() {
    var history = getSessionHistory();

    var totalPassages = history.length;
    var earnedPassages = 0;
    var bestWpm = 0;
    var totalWpm = 0;
    var totalAccuracy = 0;
    var totalScoreSum = 0;

    for (var i = 0; i < history.length; i++) {
        if (history[i].wpm > bestWpm) bestWpm = history[i].wpm;
        totalWpm += history[i].wpm;
        totalAccuracy += history[i].accuracy;
        totalScoreSum += (history[i].score || 0);
        if (history[i].earned) earnedPassages++;
    }

    var avgWpm = totalPassages > 0 ? Math.round(totalWpm / totalPassages) : 0;
    var avgAccuracy = totalPassages > 0 ? Math.round(totalAccuracy / totalPassages) : 0;

    document.getElementById('statsTotalPassages').textContent = earnedPassages;
    document.getElementById('statsBestWpm').textContent = bestWpm;
    document.getElementById('statsAvgWpm').textContent = avgWpm;
    document.getElementById('statsAvgAccuracy').textContent = avgAccuracy + '%';
    document.getElementById('statsTotalScore').textContent = getTotalScore().toLocaleString();

    document.getElementById('statsBestWpm').className = 'result-stat-value ' + getStatClass('wpm', bestWpm);
    document.getElementById('statsAvgWpm').className = 'result-stat-value ' + getStatClass('wpm', avgWpm);
    document.getElementById('statsAvgAccuracy').className = 'result-stat-value ' + getStatClass('accuracy', avgAccuracy);

    // Chart
    var chartContainer = document.getElementById('statsChart');
    var recent20 = history.slice(-20);

    if (recent20.length === 0) {
        chartContainer.innerHTML = '<div class="stats-chart-empty">Complete a few passages to see your trend here.</div>';
    } else {
        var maxWpm = 0;
        for (var j = 0; j < recent20.length; j++) {
            if (recent20[j].wpm > maxWpm) maxWpm = recent20[j].wpm;
        }
        if (maxWpm < 20) maxWpm = 20;

        var barsHtml = '';
        for (var k = 0; k < recent20.length; k++) {
            var s = recent20[k];
            var heightPct = Math.max(4, Math.round((s.wpm / maxWpm) * 100));
            var barColor = s.accuracy >= 95 ? 'var(--correct-green)' :
                           s.accuracy >= 85 ? 'var(--accent-gold)' : 'var(--accent-red-soft)';
            var earnedMark = s.earned ? ' \u2713' : '';
            barsHtml += '<div class="stats-chart-bar" style="height:' + heightPct + '%;background:' + barColor + ';">';
            barsHtml += '<div class="bar-tooltip">' + s.wpm + ' WPM \u00b7 ' + s.accuracy + '%' + earnedMark + '</div>';
            barsHtml += '</div>';
        }
        chartContainer.innerHTML = barsHtml;
    }

    // Recent passages list
    var listContainer = document.getElementById('statsRecentList');
    var recent10 = history.slice(-10).reverse();

    if (recent10.length === 0) {
        listContainer.innerHTML = '<div class="stats-chart-empty">No passages completed yet.</div>';
    } else {
        var listHtml = '';
        for (var m = 0; m < recent10.length; m++) {
            var entry = recent10[m];
            var dateStr = formatDate(entry.date);
            var earnedIcon = entry.earned ? '<span class="earned-icon">\u2713</span>' : '';
            listHtml += '<div class="stats-recent-item">';
            listHtml += '<span class="stats-recent-item-title">' + earnedIcon + entry.title + '</span>';
            listHtml += '<span class="stats-recent-item-data">' + (entry.score || 0) + ' pts \u00b7 ' + entry.wpm + ' WPM \u00b7 ' + entry.accuracy + '% \u00b7 ' + dateStr + '</span>';
            listHtml += '</div>';
        }
        listContainer.innerHTML = listHtml;
    }

    // Era completion summary
    var eraHtml = '';
    for (var n = 0; n < CAMPAIGN_ERAS.length; n++) {
        var eraName = CAMPAIGN_ERAS[n];
        var eraEarned = getEraCompletionCount(eraName);
        var eraTotal = getEraTotalCount(eraName);
        var pct = eraTotal > 0 ? Math.round((eraEarned / eraTotal) * 100) : 0;
        eraHtml += '<div class="stats-era-row">';
        eraHtml += '<span class="stats-era-name">' + eraName + '</span>';
        eraHtml += '<span class="stats-era-bar-bg"><span class="stats-era-bar-fill" style="width:' + pct + '%"></span></span>';
        eraHtml += '<span class="stats-era-count">' + eraEarned + '/' + eraTotal + '</span>';
        eraHtml += '</div>';
    }
    document.getElementById('statsEraProgress').innerHTML = eraHtml;

    // Trouble spots
    renderTroubleSpots();
}

function renderTroubleSpots() {
    var container = document.getElementById('statsTroubleSpots');
    var weakChars = getWeakCharacters(10);

    if (weakChars.length === 0) {
        // Check if we have any data at all
        var stats = getCharStats();
        var hasData = false;
        for (var key in stats.attempts) { hasData = true; break; }

        if (!hasData) {
            container.innerHTML = '<div class="stats-chart-empty">Type a few passages to reveal your trouble spots.</div>';
        } else {
            container.innerHTML = '<div class="stats-chart-empty">No significant weak spots detected — nice work!</div>';
        }
        return;
    }

    var html = '<div class="trouble-spots-row">';
    for (var i = 0; i < weakChars.length; i++) {
        var wc = weakChars[i];
        var pct = Math.round(wc.rate * 100);
        var severity = pct >= 20 ? 'trouble-high' : 'trouble-medium';
        var displayChar = wc.char;
        if (displayChar === 'SPACE') displayChar = '⎵';

        html += '<div class="trouble-char ' + severity + '">';
        html += '<span class="trouble-char-key">' + displayChar + '</span>';
        html += '<span class="trouble-char-rate">' + pct + '% miss</span>';
        html += '</div>';
    }
    html += '</div>';
    html += '<p class="trouble-hint">Free Play will favor passages that exercise your weak characters.</p>';
    container.innerHTML = html;
}

function formatDate(isoString) {
    try {
        var d = new Date(isoString);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[d.getMonth()] + ' ' + d.getDate();
    } catch(e) { return ''; }
}

// ===================================================================
// THE JOURNEY
// ===================================================================
var MILESTONES = [
    { id: 'first', name: 'First Steps', desc: 'Earn your first passage', icon: '\u270E', threshold: 1 },
    { id: 'ten', name: 'Finding a Rhythm', desc: 'Earn 10 passages', icon: '\u2606', threshold: 10 },
    { id: 'quarter', name: 'A Quarter Century', desc: 'Earn 25 passages', icon: '\u2605', threshold: 25 },
    { id: 'half', name: 'Half the Century', desc: 'Earn half the campaign', icon: '\u2736', threshold: 0 },
    { id: 'all', name: 'Century Mastered', desc: 'Earn every campaign passage', icon: '\u2741', threshold: 0 }
];

(function setMilestoneThresholds() {
    var totalCampaign = 0;
    for (var e = 0; e < CAMPAIGN_ERAS.length; e++) {
        totalCampaign += getEraTotalCount(CAMPAIGN_ERAS[e]);
    }
    for (var m = 0; m < MILESTONES.length; m++) {
        if (MILESTONES[m].id === 'half') MILESTONES[m].threshold = Math.ceil(totalCampaign / 2);
        if (MILESTONES[m].id === 'all') MILESTONES[m].threshold = totalCampaign;
    }
})();

function getTotalEarned() {
    var total = 0;
    for (var e = 0; e < CAMPAIGN_ERAS.length; e++) {
        total += getEraCompletionCount(CAMPAIGN_ERAS[e]);
    }
    return total;
}

function renderJourney() {
    var progress = getCampaignProgress();
    var totalEarned = getTotalEarned();

    // Score
    var scoreEl = document.getElementById('journeyScore');
    var total = getTotalScore();
    scoreEl.textContent = total > 0 ? total.toLocaleString() + ' points' : '';

    // Timeline
    var timelineEl = document.getElementById('journeyTimeline');
    var html = '';

    for (var e = 0; e < CAMPAIGN_ERAS.length; e++) {
        var eraName = CAMPAIGN_ERAS[e];
        var eraIndices = passagesByEra[eraName] || [];
        var earned = progress[eraName] || [];
        var eraComplete = earned.length >= eraIndices.length && eraIndices.length > 0;

        // Era year ranges
        var yearRanges = ['1900\u20131913', '1914\u20131918', '1919\u20131929', '1929\u20131939', '1939\u20131945'];

        html += '<div class="journey-era">';
        html += '<div class="journey-era-header">';
        html += '<span class="journey-era-name">' + eraName + '</span>';
        html += '<span class="journey-era-years">' + yearRanges[e] + '</span>';
        html += '<span class="journey-era-line"></span>';
        html += '<span class="journey-era-status ' + (eraComplete ? 'era-done' : '') + '">';
        html += eraComplete ? '\u2713 Complete' : earned.length + ' / ' + eraIndices.length;
        html += '</span>';
        html += '</div>';

        html += '<div class="journey-passages">';
        for (var p = 0; p < eraIndices.length; p++) {
            var passage = passages[eraIndices[p]];
            var isEarned = earned.indexOf(passage.title) !== -1;
            html += '<div class="journey-dot ' + (isEarned ? 'earned' : '') + '">';
            html += '<span class="dot-tooltip">' + passage.title + '</span>';
            if (!isEarned) {
                html += (p + 1);
            }
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    timelineEl.innerHTML = html;

    // Milestones
    var milestonesEl = document.getElementById('journeyMilestones');
    var mHtml = '<h3 class="journey-milestones-title">Milestones</h3>';
    mHtml += '<div class="journey-milestone-list">';

    // Add era completion milestones
    for (var f = 0; f < CAMPAIGN_ERAS.length; f++) {
        var eName = CAMPAIGN_ERAS[f];
        var eIndices = passagesByEra[eName] || [];
        var eEarned = progress[eName] || [];
        var done = eEarned.length >= eIndices.length && eIndices.length > 0;
        mHtml += '<div class="journey-milestone ' + (done ? 'achieved' : '') + '">';
        mHtml += '<span class="journey-milestone-icon">' + (done ? '\u2713' : '\u25CB') + '</span>';
        mHtml += eName;
        mHtml += '</div>';
    }

    // Add general milestones
    for (var g = 0; g < MILESTONES.length; g++) {
        var ms = MILESTONES[g];
        var achieved = totalEarned >= ms.threshold;
        mHtml += '<div class="journey-milestone ' + (achieved ? 'achieved' : '') + '">';
        mHtml += '<span class="journey-milestone-icon">' + ms.icon + '</span>';
        mHtml += ms.name;
        mHtml += '</div>';
    }

    mHtml += '</div>';
    milestonesEl.innerHTML = mHtml;
}

// ===================================================================
// INIT
// ===================================================================
(function init() {
    setGameMode(gameMode);
    setTypingMode(typingMode);
    updateEraProgress();
    updateHomeScore();
})();
