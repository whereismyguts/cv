# CV - GitHub Pages

A clean, responsive CV website hosted on GitHub Pages.

## Quick Start

1. **Edit your info** in `data.json`
2. **Push to GitHub**
3. **Enable GitHub Pages** in repo settings
4. **Visit your CV** at `https://yourusername.github.io/cv`

## Local Development

```bash
# Start local server
make dev
# or
python -m http.server 8000
```

Visit: http://localhost:8000

## Optional: Auto-update Projects

```bash
# Updates projects.md with your latest GitHub repos
make build
```

## Files You Should Edit

- `data.json` - Your CV content (education, jobs, skills)
- `simple_generate.py` - Change GitHub username
- `styles.css` - Customize colors/fonts if needed

## Features

- 📱 Mobile responsive design
- 🌙 Dark mode support
- ⚡ Fast loading static site
- 🔗 Social media integration
- 📄 PDF resume download

## GitHub Pages Setup

1. Go to your repo **Settings** → **Pages**
2. Source: **Deploy from a branch**  
3. Branch: **main**
4. Folder: **/ (root)**
5. Save

Done! Your CV is now live.
