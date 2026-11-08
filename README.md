# portfolio

Pau Fandos's personal website, published at [paufandos.com](https://paufandos.com): one static page in Spanish (`/`) and English (`/en/`), plain HTML and CSS with a few lines of JavaScript, no build step.

- `index.html` and `en/index.html`: the two language versions; keep them in sync.
- `assets/`: stylesheet, the badge tilt script, the self-hosted Archivo font (SIL OFL, `assets/fonts/OFL.txt`), favicon and images.
- `assets/cv/`: downloadable CV PDFs in Spanish and English, without phone number or email address; each page links to its matching language.
- `Portfolio/`: redirects the old `/Portfolio/` path to the home page.
- `CNAME`, `robots.txt` and `sitemap.xml`: custom domain and search engine files.
- `404.html`: page for missing paths.
- `DESIGN.md`: the visual system.
- `tests/`: Playwright end-to-end, accessibility (axe) and visual tests on desktop, laptop, iPad, iPhone 15, iPhone SE and Pixel 7.
- `tests/banner.mjs`: renders the LinkedIn and X banners from `tests/banner.html` (`node tests/banner.mjs <out-dir>`).
- `.github/workflows/pages.yml`: runs the end-to-end tests and deploys to GitHub Pages on every push to `main`.

```sh
npm install
npm run serve          # http://127.0.0.1:4173
npm test               # all tests
npm run test:e2e       # end-to-end and accessibility only
npm run test:update    # refresh visual baselines after an intended design change
```
