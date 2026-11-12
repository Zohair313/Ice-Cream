# Ice Cream & Milkshakes Cafe

React + TypeScript + Vite + Tailwind site for **Ice Cream & Milkshakes Cafe**, 177 Jinnah Road, D Block, Vehari.

Live domain: **https://zahid.greyfabric.store/**

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production site is generated in `dist/`.

## Upload to zahid.greyfabric.store

1. Run `npm run build` (or use the ready `dist.zip` in the project root).
2. Open your hosting panel → File Manager for the domain.
3. Delete the default `index.html` in the site root (`public_html` / `htdocs` / `www`).
4. Upload the **contents** of `dist.zip` into the site root, so it looks like:

```
index.html
favicon.svg
robots.txt
sitemap.xml
assets/index-*.js
assets/index-*.css
images/*.png
```

5. Open https://zahid.greyfabric.store/ and hard-refresh (`Ctrl + F5`).

The build uses `/` as the base path and absolute asset URLs, so it works directly on the domain root. Canonical URL, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml` are already set to `https://zahid.greyfabric.store/`. If the domain ever changes, update `index.html`, `public/robots.txt` and `public/sitemap.xml`.
