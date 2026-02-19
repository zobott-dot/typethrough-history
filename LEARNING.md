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
| `ls -la` | List with details and hidden files | Shows permissions, sizes, dates |
| `cd` | **C**hange **d**irectory — move into a folder | `cd Projects` |
| `cd ~` | Go back to your home directory | `/Users/davidzobott` |
| `cd ..` | Go up one level (parent directory) | From `/Projects/typethrough-history` to `/Projects` |
| `mkdir` | **M**a**k**e **dir**ectory — create a new folder | `mkdir Projects` |
| `mkdir -p` | Make directory (and parents if needed) | `mkdir -p js/utils` |
| `mv` | **M**o**v**e a file (or rename it) | `mv ~/Downloads/file.html ./` |
| `clear` | Clear the terminal screen | Reduces clutter |
| `echo` | Output text (often redirected to a file) | `echo "hello" > file.txt` |
| `find` | Search for files by name across directories | `find ~/Downloads -name "*.js"` |
| `wc -l` | Count lines in a file | `wc -l index.html` |

### Things I've noticed
- The terminal prompt shows your current location (e.g., `typethrough-history %`)
- The window title bar also updates to show where you are
- `~` is shorthand for your home directory (`/Users/davidzobott`)
- Pressing Tab auto-completes file and folder names (try it!)
- When a file or folder name has spaces or special characters, wrap the path in quotes: `"files (1)"`
- `>` redirects output into a file (creates or overwrites): `echo "text" > file.txt`
- The `-la` flag on `ls` shows hidden files (ones starting with `.`) and detailed info

---

## Part 2: Git — Version Control

Git is a system that tracks changes to your files over time. Every time you "commit," you're saving a snapshot of your project at that moment. You can always go back to any previous snapshot.

### The Mental Model

Think of Git like a timeline of your project. Each commit is a point on that timeline with a label (your commit message) and a unique fingerprint (the hash, like `b70ced9`).

**Local vs. Remote:**
- **Local** = the copy on your Mac (where you do the work)
- **Remote** = the copy on GitHub (called `origin`)
- They don't sync automatically — YOU control when to push changes up
- GitHub doesn't reach down to your Mac — your Mac pushes up to GitHub

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
| `git log --oneline` | Compact one-line-per-commit history |
| `git log --oneline -5` | Show only the last 5 commits |
| `git diff` | See exactly what changed in your files (before staging) |
| `git remote -v` | Show the remote URL (where push/pull goes) |

### What `git status` tells you
- **Red "Untracked files"** — Git sees new files but isn't managing them yet
- **Red "Modified"** — A tracked file has changed but isn't staged
- **Green "Changes to be committed"** — Staged and ready for the next commit
- **"Nothing to commit, working tree clean"** — Everything is in sync

### What `git log --oneline` tells you
The most recent commit shows extra info in parentheses:
- **HEAD -> main** (blue) — "You are here" — your current position on the main branch
- **origin/main** — Where GitHub's copy is pointing
- **origin/HEAD** (red) — GitHub's default branch pointer
- When all three point at the same commit, local and remote are perfectly in sync

### Git Configuration (one-time setup)

```
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global --list          # See all your settings
git config --global user.name       # Check a specific setting
```

Git doesn't confirm when you set config values — it just silently accepts them. Use the check commands to verify.

### .gitignore

A file called `.gitignore` tells Git which files to permanently ignore. Created with:
```
echo ".DS_Store" > .gitignore
```
- `.DS_Store` is a macOS system file (Finder preferences) — never belongs in a repo
- Once listed in `.gitignore`, the file disappears from `git status` permanently
- `.gitignore` itself gets committed to the repo so the rules apply everywhere

---

## Part 3: GitHub

GitHub is a website that hosts Git repositories online. It's where your code lives publicly (or privately) and where others can see, use, or contribute to your work.

### Key Concepts

- **Repository (repo):** A project folder tracked by Git. Contains your code, history, and configuration.
- **README.md:** The front page of your repo. Written in Markdown. GitHub renders it automatically.
- **Commit history:** Every snapshot you've pushed. Visible on GitHub with messages, dates, and hashes.
- **GitHub Pages:** Free hosting that turns your repo into a live website. Deploys automatically from your chosen branch.

### How the connection works
- `git clone` downloads the repo AND sets up the remote connection
- The connection is stored inside the project's hidden `.git` folder
- You can move the project folder anywhere on your Mac — the connection travels with it
- `git remote -v` shows the URL Git uses for push/pull
- GitHub doesn't reach into your computer — you always initiate with `git push`
- GitHub accepts pushes based on your credentials (stored in Mac Keychain)

### Why NOT to put repos on iCloud
- iCloud syncs files in the background and can offload files to the cloud
- Git needs all its files present and intact at all times
- If iCloud offloads the hidden `.git` folder, it can corrupt the repository
- GitHub IS your backup — if your Mac dies, just `git clone` on a new machine

### GitHub display names on commits
- If the email in a commit matches a GitHub account, GitHub shows the GitHub username
- If it doesn't match, GitHub shows the name from the commit itself
- This is why early commits might show different names — it depends on when you configured your email

### How I set up a new project (the workflow I used)

1. Create a new repo on GitHub (with README)
2. Clone it to my Mac: `git clone <url>`
3. `cd` into the project folder
4. Create/edit files
5. `git add` → `git commit` → `git push`
6. Enable GitHub Pages in Settings → Pages → Source: main

### GitHub Pages
- Free hosting service built into GitHub
- Serves your repo as a website at `username.github.io/repo-name`
- Auto-deploys every time you push to the configured branch
- Requires **public** repos on the free tier
- To add the URL to your repo page: click the gear icon next to "About" → paste URL in "Website" field
- Orange dot in Deployments = currently building; Green = live
- **Cmd+Shift+R** forces your browser to load the fresh version (bypasses cache)

### GitHub is free because...
- Owned by Microsoft (bought for $7.5B in 2018)
- Free tier is generous for individuals: unlimited public repos, unlimited commits
- They monetize through paid tiers for businesses and teams
- Limits exist but are very high (1 GB per repo, 1 GB for Pages sites)
- Private repos are also free, but GitHub Pages requires public repos (or a $4/month Pro plan)

### Personal website on GitHub
- Create a repo named `username.github.io` — it becomes your personal homepage
- You can point custom domain names at GitHub Pages through DNS settings
- GitHub provides free HTTPS for custom domains

### My project structure
```
~/Projects/
  └── typethrough-history/
        ├── .gitignore       (tells Git what to ignore)
        ├── index.html       (page structure — the skeleton)
        ├── css/
        │   └── styles.css   (all visual design)
        ├── js/
        │   ├── passages.js  (content data — easy to add passages)
        │   ├── sounds.js    (sound engine — tweak independently)
        │   └── app.js       (typing engine, stats, navigation)
        ├── LEARNING.md      (this file)
        └── README.md        (project description)
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
| **HEAD** | Git's pointer for "you are here" — your current position |
| **Markdown (.md)** | A simple text formatting language used for README files, docs, etc. |
| **GitHub Pages** | Free hosting service that serves your repo as a website |
| **index.html** | The default file a web server looks for and serves |
| **.gitignore** | A file that tells Git which files to permanently skip |
| **.DS_Store** | A macOS system file — always ignore in Git |
| **Separation of concerns** | Organizing code so each file has one clear job |
| **Web Audio API** | Browser technology for generating sounds programmatically |
| **Cache** | Browser's saved copy of a page — Cmd+Shift+R forces a fresh load |
| **DNS** | Domain Name System — translates domain names to server addresses |

---

## Part 5: Project Workflow Patterns

### Iterating on an app
1. Make a change (code, content, design)
2. Test it locally or in preview
3. `git add .` → `git commit -m "description"` → `git push`
4. Hard refresh the live site (Cmd+Shift+R)
5. Repeat

### Restructuring a project
- When a single file gets too large, split it into logical pieces
- Each file should have one clear job (styles, content, logic, sounds)
- Do the restructure in a single commit with a clear message
- The app should work identically before and after — only the organization changes
- This makes future changes easier and less risky

### Debugging file locations
- `ls` to see what's in the current directory
- `find` to search for files by name across folders
- `ls -la` to see hidden files and details
- Files downloaded from the browser might land in subfolders or have modified names
- Always verify with `ls` before trying to `mv`

### Batching commands
- You can paste multiple commands at once — the terminal runs them in sequence
- For routine push cycles, batching is fine
- When doing something new or uncertain, run commands one at a time to check output

---

## Part 6: Troubleshooting & Tips

### If you get lost in the terminal
- `pwd` to see where you are
- `cd ~` to go home
- `cd ~/Projects/typethrough-history` to jump straight to the project

### If you're not sure what Git is doing
- `git status` — always start here
- `git log --oneline` — see a compact history of commits
- `git remote -v` — verify where your repo is connected

### If the live site doesn't update
- **Cmd+Shift+R** to hard refresh (bypass browser cache)
- Check GitHub repo page — is the deployment dot orange (building) or green (live)?
- Give it 1-2 minutes for GitHub Pages to rebuild

### If file moves fail
- Check the actual filenames with `ls ~/Downloads/`
- Use `find` to search recursively: `find ~/Downloads -name "*.js"`
- Quote paths with spaces: `"files (1)"`
- Browser may rename downloads (e.g., `index (1).html` if the name already exists)

### Good habits I'm building
- Run `git status` before and after every operation
- Write clear commit messages that describe WHAT changed
- Commit often — small, focused snapshots are better than huge ones
- Push after committing so GitHub stays current
- Hard refresh when checking the live site
- Use `.gitignore` to keep system files out of the repo

---

## Changelog

| Date | What I learned |
|------|---------------|
| Feb 17, 2025 | Terminal basics (pwd, ls, cd, mkdir, mv), Git clone/add/commit/push, GitHub Pages deployment, created LEARNING.md |
| Feb 18, 2025 | git remote -v, git log --oneline, understanding HEAD and origin pointers, .gitignore, git add ., echo and output redirection, find command, quoting paths with spaces, restructuring a project into separate files, debugging file locations, GitHub display names on commits, how the Git-GitHub connection works, GitHub Pages and custom domains, cache busting with Cmd+Shift+R |

---

*"The journey of a thousand miles begins with a single commit."*
