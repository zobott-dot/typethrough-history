# TypeThrough History

**A typing tutor for the curious mind.**

Type your way through the defining moments of the early 20th century — from the Wright Brothers at Kitty Hawk to the dawn of the atomic age. Each passage teaches as you type, turning history into muscle memory.

🎹 **[Play it now →](https://zobott-dot.github.io/typethrough-history/)**

---

## What It Is

TypeThrough History is a browser-based typing tutor wrapped in a game. It combines typing practice with 102 original passages about the events, people, and ideas that shaped the world between 1900 and 1945.

It's built for people who want to improve their typing but find traditional typing tutors tedious. Instead of drilling "the quick brown fox" or random letter sequences, you're learning something real while your fingers learn the keyboard.

The app features a vintage aesthetic inspired by early 20th century newspapers and typewriters, complete with authentic typewriter sound effects — the mechanical clatter of keys, the bell at the end of a line, and the satisfying whoosh of a carriage return.

---

## Features

### The Game Loop
- **Scoring system** — Every passage awards points based on WPM and accuracy, with multipliers rewarding precision (100% accuracy = 2x multiplier)
- **Campaign mode** — Progress through eras in order, earning passages by meeting an 85% accuracy threshold
- **Free Play mode** — Random passages at your own pace, no requirements
- **Era completion tracking** — Track your progress toward completing each historical era

### The Journey
- **Visual progress map** — See your entire journey from 1900 to 1945 as a map of passage dots that fill in as you earn them
- **Milestones** — Achievement badges for reaching goals: First Steps, Finding a Rhythm, A Quarter Century, Half the Century, and Century Mastered
- **Era completion markers** — Each era shows its completion status with a running count

### Typing Intelligence
- **Per-character error tracking** — The app records which specific characters give you trouble, building a profile across sessions
- **Trouble spots display** — Your weakest characters shown visually on the My Progress page with miss percentages
- **Weakness-aware passage selection** — In Free Play, passages that exercise your weak characters come up more often
- **Adaptive difficulty** — As your WPM rises, the app favors more challenging passages
- **Difficulty badges** — Each passage shows an Easy, Moderate, or Challenging rating based on punctuation density, number frequency, word length, and special characters

### Focus Mode
- **Distraction-free typing** — When you start typing, everything except the passage text and progress bar fades away, letting you concentrate on the words
- **Auto-scroll** — For longer passages, the current line automatically stays in view
- **Flow mode** — An optional mode that disables backspace entirely, forcing you to push through mistakes and build muscle memory
- **Correction mode** — The default mode with backspace enabled for fixing errors as you go

### Typing Tips
- **Hand placement guide** — A color-coded keyboard diagram showing home row position and finger assignments
- **Technique guidance** — Tips on anchoring with F/J bumps, not looking down, accuracy-first practice, and choosing between Flow and Correction modes

### Sound & Atmosphere
- **Typewriter audio** — Three authentic sounds: key press, carriage return, and margin bell
- **Line-aware playback** — The bell rings as you approach the end of a line, and the carriage return plays when you wrap to the next line
- **Toggle control** — Sound on/off with one click

---

## The Passages

102 passages across nine categories:

**Campaign Eras** (68 passages, played in historical sequence):

| Era | Passages | Years |
|-----|----------|-------|
| The New Century | 13 | 1900–1913 |
| The Great War | 12 | 1914–1918 |
| The Roaring Twenties | 13 | 1919–1929 |
| The Great Depression | 13 | 1929–1939 |
| The World at War Again | 17 | 1939–1945 |

**Special Categories** (34 passages, available in Free Play):

| Category | Passages | Description |
|----------|----------|-------------|
| By the Numbers | 14 | Statistics and data — heavy on numbers and punctuation |
| Quick Study | 8 | Shorter passages for fast practice |
| Words of the Era | 7 | Period vocabulary and language |
| Deep Dive | 5 | Longer, more complex passages |

Each passage includes a historical footnote that appears on the completion screen — a reward for finishing that adds depth and context to what you just typed.

---

## Technical Details

TypeThrough History is a static site built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies. It runs entirely in the browser and stores all progress in localStorage.

### Project Structure

```
typethrough-history/
├── index.html              # Single-page app shell (311 lines)
├── css/
│   └── styles.css          # All styling including animations (1,460 lines)
├── js/
│   ├── passages.js         # 102 historical passages with footnotes (668 lines)
│   ├── sounds.js           # Typewriter audio engine (151 lines)
│   └── app.js              # Game engine, scoring, navigation, intelligence (1,248 lines)
├── audio/
│   ├── typewriter-key.mp3
│   ├── typewriter-bell.mp3
│   └── typewriter-return.mp3
├── LEARNING.md
└── README.md
```

### How It Works

**Typing engine** — A hidden text input captures keystrokes. Each character is compared against the expected character in the passage, with normalization for smart quotes, em dashes, and accented characters. Characters are marked correct (green) or incorrect (red) in real time.

**Scoring** — Points = WPM × accuracy multiplier × 10. Multipliers range from 2.0x (100% accuracy) down to 0.5x (below 85%). A passage is "earned" for campaign progress only if accuracy meets the 85% threshold.

**Passage selection** — Campaign mode serves passages in index order within the selected era. Free Play uses a weighted random selection that factors in passage freshness (avoiding recent repeats), character weakness scores, and adaptive difficulty scaling based on rolling average WPM.

**Difficulty calculation** — Each passage receives a composite score (0–100) based on number density, punctuation density, special character density, average word length, and passage length. Scores map to Easy (0–19), Moderate (20–39), and Challenging (40+).

**Character intelligence** — Every keystroke records the expected character and whether it was missed. Aggregated error rates are stored across sessions. Characters with fewer than 5 attempts are excluded from analysis. The trouble spots display shows characters with >5% error rates, and weakness-aware passage selection weights passages containing those characters more heavily.

**Focus mode** — CSS transitions controlled by a `.focus-active` class added to the typing screen on the first keystroke. Non-essential UI elements fade to near-invisible; the passage text and progress bar remain. Everything restores on completion.

**Sound engine** — Audio is implemented with the Web Audio API using pre-decoded buffers for minimal latency. The engine is line-aware: it tracks character positions relative to line wraps in the rendered text, triggering the margin bell when approaching a line break and the carriage return sound when wrapping to the next line.

### localStorage Keys

| Key | Purpose |
|-----|---------|
| `typethrough-recent-passages` | Freshness tracking for passage selection |
| `typethrough-session-stats` | History of completed passages with WPM, accuracy, score |
| `typethrough-campaign-progress` | Per-era list of earned passage titles |
| `typethrough-total-score` | Cumulative point total |
| `typethrough-game-mode` | Campaign or Free Play preference |
| `typethrough-typing-mode` | Correction or Flow preference |
| `typethrough-char-stats` | Per-character error and attempt counts |

### Browser Support

Tested in modern versions of Chrome, Firefox, Safari, and Edge. Requires JavaScript enabled. Audio requires user interaction to initialize (browser autoplay policy).

---

## Development Story

This project was built through collaborative "vibe coding" — an iterative process of experimentation, feedback, and refinement using AI assistance. It evolved through four distinct phases:

1. **The Game Loop** — Transformed a simple typing test into a game with scoring, campaign progression, accuracy thresholds, and era completion tracking
2. **The Journey** — Added a visual progress map, milestone achievements, and a sense of traveling through history
3. **Typing Intelligence** — Built per-character error tracking, weakness-aware passage selection, difficulty ratings, and adaptive challenge scaling
4. **Focus Mode** — Refined the typing experience with distraction-free UI, auto-scroll, flow/correction mode toggle, and a typing tips guide

Each phase was informed by a three-persona evaluation: a typing instructor (technique and pedagogy), a UX designer (information hierarchy and flow), and a game designer (loops, stakes, and progression).

---

## Running Locally

Clone the repo and open `index.html` in a browser. That's it — no install, no build step.

```bash
git clone https://github.com/zobott-dot/typethrough-history.git
cd typethrough-history
open index.html
```

Or serve it locally:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## License

This project is a personal learning and creative endeavor. The historical content in the passages is original writing based on public domain historical facts. The typewriter audio samples are original recordings.

---

*Built with curiosity, patience, and a love of history.*
