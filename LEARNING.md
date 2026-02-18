# TypeThrough History — Learning Field Guide

*A personal reference built while learning to ship software.*  
*Started: February 2025*

---

## How This Document Works

This is a living document. Each time I learn something new while building this app, I add it here — in my own words, for my future self. It lives in the same repository as the app itself, which means it's version-controlled and always accessible on GitHub.

---

## Part 1: The Terminal

The terminal (also called the command line, shell, or console) is a text-based way to talk to your computer. On Mac, the default shell is **zsh** (Z shell). Instead of clicking folders and files in Finder, you type commands.

### Why use it?
Because many developer tools — especially Git — work through the terminal. It's also faster for many tasks once you know the commands, and it gives you access to things Finder can't do.

### Core Commands

| Command | What it does | Example |
|---------|-------------|---------|
| `pwd` | **P**rint **w**orking **d**irectory — shows where you are | `/Users/davidzobott/Projects` |
| `ls` | **L**i**s**t — shows what's in the current directory | `README.md  index.html` |
| `cd` | **C**hange **d**irectory — move into a folder | `cd Projects` |
| `cd ~` | Go back to your home directory | `/Users/davidzobott` |
| `cd ..` | Go up one level (parent directory) | From `/Projects/typethrough-history` to `/Projects` |
| `mkdir` | **M**a**k**e **dir**ectory — create a new folder | `mkdir Projects` |
| `mv` | **M**o**v**e a file (or rename it) | `mv ~/Downloads/file.html ./` |

### Things I've noticed
- The terminal prompt shows your current location (e.g., `typethrough-history %`)
- The window title bar also updates to show where you are
- `~` is shorthand for your home directory (`/Users/davidzobott`)
- Pressing Tab auto-completes file and folder names (try it!)

---

## Part 2: Git — Version Control

Git is a system that tracks changes to your files over time. Every time you "commit," you're saving a snapshot of your project at that moment. You can always go back to any previous snapshot.

### The Mental Model

Think of Git like a timeline of your project. Each commit is a point on that timeline with a label (your commit message) and a unique fingerprint (the hash, like `b70ced9`).

**Local vs. Remote:**
- **Local** = the copy on your Mac (where you do the work)
- **Remote** = the copy on GitHub (called `origin`)
- They don't sync automatically — YOU control when to push changes up

### The Sacred Cycle: Add → Commit → Push

This is the core workflow. I'll do this hundreds of times.

```
git add <filename>       # Stage: "include this in my next snapshot"
git commit -m "message"  # Commit: "take the snapshot and label it"
git push                 # Push: "send it to GitHub"
```

**The letter analogy:**
- `git add` = putting the letter in the envelope
- `git commit` = sealing it and writing a note on the outside
- `git push` = dropping it in the mailbox

### Essential Git Commands

| Command | What it does |
|---------|-------------|
| `git clone <url>` | Download a repo from GitHub to your Mac |
| `git status` | Show what's changed — **use this constantly** |
| `git add <file>` | Stage a file for the next commit |
| `git add .` | Stage ALL changed files (the `.` means "everything here") |
| `git commit -m "msg"` | Save a snapshot with a description |
| `git push` | Send your commits to GitHub |
| `git log` | See the history of all commits |
| `git diff` | See exactly what changed in your files (before staging) |

### What `git status` tells you
- **Red "Untracked files"** — Git sees new files but isn't managing them yet
- **Red "Modified"** — A tracked file has changed but isn't staged
- **Green "Changes to be committed"** — Staged and ready for the next commit
- **"Nothing to commit, working tree clean"** — Everything is in sync

### Git Configuration (one-time setup)

```
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global --list          # See all your settings
git config --global user.name       # Check a specific setting
```

---

## Part 3: GitHub

GitHub is a website that hosts Git repositories online. It's where your code lives publicly (or privately) and where others can see, use, or contribute to your work.

### Key Concepts

- **Repository (repo):** A project folder tracked by Git. Contains your code, history, and configuration.
- **README.md:** The front page of your repo. Written in Markdown. GitHub renders it automatically.
- **Commit history:** Every snapshot you've pushed. Visible on GitHub with messages, dates, and hashes.
- **GitHub Pages:** Free hosting that turns your repo into a live website. Deploys automatically from your chosen branch.

### How I set up a new project (the workflow I used)

1. Create a new repo on GitHub (with README)
2. Clone it to my Mac: `git clone <url>`
3. `cd` into the project folder
4. Create/edit files
5. `git add` → `git commit` → `git push`
6. Enable GitHub Pages in Settings → Pages → Source: main

### My project structure
```
~/Projects/
  └── typethrough-history/
        ├── README.md        (project description)
        ├── index.html       (the app itself)
        └── LEARNING.md      (this file)
```

---

## Part 4: Concepts & Vocabulary

| Term | Meaning |
|------|---------|
| **Shell** | The program that interprets your terminal commands (zsh on Mac) |
| **Directory** | A folder |
| **Working directory** | The folder you're currently in |
| **Repository (repo)** | A project folder tracked by Git |
| **Clone** | Making a local copy of a remote repo |
| **Staging** | Marking files to be included in the next commit |
| **Commit** | A saved snapshot of your project at a point in time |
| **Commit message** | A short description of what changed in that commit |
| **Hash** | A unique ID for each commit (like `b70ced9`) |
| **Push** | Sending local commits to the remote (GitHub) |
| **Pull** | Downloading remote changes to your local copy |
| **Remote** | The GitHub copy of your repo (called `origin`) |
| **Branch** | A parallel timeline of your project (`main` is the default) |
| **main** | The primary branch — the "official" version |
| **origin** | Git's nickname for your GitHub remote |
| **Markdown (.md)** | A simple text formatting language used for README files, docs, etc. |
| **GitHub Pages** | Free hosting service that serves your repo as a website |
| **index.html** | The default file a web server looks for and serves |

---

## Part 5: Troubleshooting & Tips

### If you get lost in the terminal
- `pwd` to see where you are
- `cd ~` to go home
- `cd ~/Projects/typethrough-history` to jump straight to the project

### If you're not sure what Git is doing
- `git status` — always start here
- `git log --oneline` — see a compact history of commits

### Good habits I'm building
- Run `git status` before and after every operation
- Write clear commit messages that describe WHAT changed
- Commit often — small, focused snapshots are better than huge ones
- Push after committing so GitHub stays current

---

## Changelog

| Date | What I learned |
|------|---------------|
| Feb 17, 2025 | Terminal basics, Git clone/add/commit/push, GitHub Pages deployment |

---

*"The journey of a thousand miles begins with a single commit."*
