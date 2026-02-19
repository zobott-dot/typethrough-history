// ===================================================================
// SOUND ENGINE — Web Audio API
// Three themes: Typewriter, Telegraph, Fountain Pen
// ===================================================================

let audioCtx = null;
let soundEnabled = true;
let currentTheme = 'typewriter';

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggle');
    const icon = document.getElementById('soundIcon');
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

function changeSoundTheme(theme) {
    currentTheme = theme;
    if (theme === 'silent') {
        soundEnabled = false;
        const btn = document.getElementById('soundToggle');
        btn.classList.remove('active');
        btn.classList.add('muted');
        document.getElementById('soundIcon').innerHTML = '\u266A';
    } else if (!soundEnabled) {
        soundEnabled = true;
        const btn = document.getElementById('soundToggle');
        btn.classList.remove('muted');
        btn.classList.add('active');
        document.getElementById('soundIcon').innerHTML = '\u266B';
    }
}

// --- Noise generator helper ---
function createNoiseBuffer(ctx, duration) {
    var bufferSize = ctx.sampleRate * duration;
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    return buffer;
}

// =====================
// TYPEWRITER SOUNDS
// =====================
function typewriterKey() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.035);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800 + Math.random() * 400;
    filter.Q.value = 2;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.035);
}

function typewriterSpace() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.06);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    filter.Q.value = 1;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.06);
}

function typewriterBackspace() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.03);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 2;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.03);
}

function typewriterBell() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, t);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.8);

    var osc2 = ctx.createOscillator();
    var gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(3300, t);
    gain2.gain.setValueAtTime(0.08, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.6);
}

function typewriterCarriageReturn() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.4);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, t);
    filter.frequency.exponentialRampToValueAtTime(400, t + 0.35);
    filter.Q.value = 1;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.4);

    setTimeout(function() { typewriterBell(); }, 350);
}

// =====================
// TELEGRAPH SOUNDS
// =====================
function telegraphKey() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 700 + Math.random() * 50;
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.setValueAtTime(0.18, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
}

function telegraphSpace() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 700;
    gain.gain.setValueAtTime(0.16, t);
    gain.gain.setValueAtTime(0.16, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
}

function telegraphBackspace() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    for (var i = 0; i < 2; i++) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 500;
        var offset = i * 0.06;
        gain.gain.setValueAtTime(0.001, t + offset);
        gain.gain.setValueAtTime(0.12, t + offset + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + 0.04);
    }
}

function telegraphComplete() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var pattern = [0.05, 0.05, 0.05, 0.15, 0.05];
    var offset = 0;
    pattern.forEach(function(dur) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 750;
        gain.gain.setValueAtTime(0.001, t + offset);
        gain.gain.setValueAtTime(0.18, t + offset + 0.005);
        gain.gain.setValueAtTime(0.18, t + offset + dur);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + dur + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + dur + 0.02);
        offset += dur + 0.05;
    });
}

// =====================
// FOUNTAIN PEN SOUNDS
// =====================
function fountainKey() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.08);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500 + Math.random() * 800;
    filter.Q.value = 0.3;
    var gain = ctx.createGain();
    var vol = 0.025 + Math.random() * 0.015;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06 + Math.random() * 0.02);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.08);
}

function fountainSpace() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.12);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 0.2;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.02, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.12);
}

function fountainBackspace() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.06);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2500;
    filter.Q.value = 0.3;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.06);
}

function fountainComplete() {
    var ctx = getAudioContext();
    var t = ctx.currentTime;

    var noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.6);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, t);
    filter.frequency.exponentialRampToValueAtTime(5000, t + 0.2);
    filter.frequency.exponentialRampToValueAtTime(1500, t + 0.5);
    filter.Q.value = 0.3;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + 0.6);
}

// =====================
// SOUND DISPATCHER
// =====================
function playSound(type) {
    if (!soundEnabled) return;
    try {
        if (currentTheme === 'typewriter') {
            if (type === 'key') typewriterKey();
            else if (type === 'space') typewriterSpace();
            else if (type === 'backspace') typewriterBackspace();
            else if (type === 'complete') typewriterCarriageReturn();
        } else if (currentTheme === 'telegraph') {
            if (type === 'key') telegraphKey();
            else if (type === 'space') telegraphSpace();
            else if (type === 'backspace') telegraphBackspace();
            else if (type === 'complete') telegraphComplete();
        } else if (currentTheme === 'fountain') {
            if (type === 'key') fountainKey();
            else if (type === 'space') fountainSpace();
            else if (type === 'backspace') fountainBackspace();
            else if (type === 'complete') fountainComplete();
        }
    } catch(e) {
        // Silently fail if audio context has issues
    }
}
