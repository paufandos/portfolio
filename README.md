# paufandos.github.io

Pau Fandos's personal website: a static page in Spanish (`/`) and English (`/en/`), with plain HTML and CSS and no build step.

- `index.html` and `en/index.html`: the two language versions; keep them in sync.
- `assets/`: stylesheet, a small script (cursor spotlight and active section in the side navigation), favicon and images.
- `Portfolio/`: redirects the old `paufandos.github.io/Portfolio/` URL to the home page.
- `.github/workflows/pages.yml`: deploys to GitHub Pages on every push to `main`.

Preview locally with `python3 -m http.server` and open `http://localhost:8000`.
