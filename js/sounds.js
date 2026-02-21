// ===================================================================
// SOUND ENGINE — Real Audio Samples
// Uses recorded typewriter sounds from a Hermes Precisa 305
// Source: BigSoundBank.com (CC0 Public Domain)
// ===================================================================

var soundEnabled = true;
var soundsLoaded = false;

// Audio buffers (Web Audio API for low-latency playback)
var audioCtx = null;
var buffers = {
    key: null,
    bell: null,
    carriageReturn: null
};

// --- Initialize Audio Context ---
function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// --- Load an audio file into a buffer ---
function loadSound(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        getAudioContext().decodeAudioData(request.response, function(buffer) {
            callback(buffer);
        }, function(err) {
            console.warn('Error decoding audio: ' + url, err);
        });
    };
    request.onerror = function() {
        console.warn('Error loading audio: ' + url);
    };
    request.send();
}

// --- Load all sounds ---
function loadAllSounds() {
    var loaded = 0;
    var total = 3;

    function checkDone() {
        loaded++;
        if (loaded >= total) {
            soundsLoaded = true;
        }
    }

    loadSound('audio/typewriter-key.mp3', function(buffer) {
        buffers.key = buffer;
        checkDone();
    });
    loadSound('audio/typewriter-bell.mp3', function(buffer) {
        buffers.bell = buffer;
        checkDone();
    });
    loadSound('audio/typewriter-return.mp3', function(buffer) {
        buffers.carriageReturn = buffer;
        checkDone();
    });
}

// --- Play a buffer with optional pitch/volume variation ---
function playBuffer(buffer, volume, playbackRate) {
    if (!buffer || !soundEnabled) return;
    var ctx = getAudioContext();

    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = playbackRate || 1.0;

    var gain = ctx.createGain();
    gain.gain.value = volume || 1.0;

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(0);
}

// --- Sound toggle ---
function toggleSound() {
    soundEnabled = !soundEnabled;

    // Initialize audio context on first user interaction
    if (soundEnabled && !audioCtx) {
        loadAllSounds();
    }

    var btn = document.getElementById('soundToggle');
    var icon = document.getElementById('soundIcon');
    if (soundEnabled) {
        btn.classList.remove('muted');
        btn.classList.add('active');
        icon.innerHTML = '\u266B';
    } else {
        btn.classList.remove('active');
        btn.classList.add('muted');
        icon.innerHTML = '\u266A';
    }
}

// --- Sound dispatcher ---
function playSound(type) {
    if (!soundEnabled || !soundsLoaded) return;
    try {
        if (type === 'key') {
            // Slight random pitch variation for natural feel
            var rate = 0.95 + Math.random() * 0.10;
            playBuffer(buffers.key, 0.7, rate);
        } else if (type === 'space') {
            // Lower pitch, slightly louder for spacebar
            playBuffer(buffers.key, 0.85, 0.8);
        } else if (type === 'backspace') {
            // Higher pitch, quieter for backspace
            playBuffer(buffers.key, 0.4, 1.15);
        } else if (type === 'bell') {
            // Warning bell near end of line
            playBuffer(buffers.bell, 0.4, 1.0);
        } else if (type === 'carriageReturn') {
            // End of a line — just the carriage return (bell already rang as warning)
            playBuffer(buffers.carriageReturn, 0.6, 1.0);
        } else if (type === 'complete') {
            // End of passage — louder carriage return + bell
            playBuffer(buffers.carriageReturn, 0.8, 1.0);
            setTimeout(function() {
                playBuffer(buffers.bell, 0.6, 1.0);
            }, 300);
        }
    } catch(e) {
        // Silently fail if audio has issues
    }
}

// --- Start loading sounds immediately ---
// (Will initialize audio context on first user interaction)
try {
    loadAllSounds();
} catch(e) {
    // Audio context may need user interaction first — that's fine,
    // toggleSound or first keypress will trigger it
}
