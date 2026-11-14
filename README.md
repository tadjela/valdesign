# VAL'S DESIGN

React + Vite + React Router. Orders via WhatsApp. Hosted on Netlify.

## Run
    npm install
    npm run dev        # local
    npm run build      # outputs dist/

## Deploy (Netlify)
Build command `npm run build`, publish directory `dist` (already in netlify.toml).

## Images (all optional: colored VD tiles show until you add them)
- public/logo/vd-black.png, vd-white.png, public/favicon.png
- public/images/hero/hero.jpg (hero) and fresh.jpg (Fresh Drops)
- public/images/collections/tshirts.jpg, hoodies.jpg, caps.jpg, new.jpg
- Product photos: add the path (e.g. /images/hoodies/black-1.jpg) to "images" in src/data/products.json

## Catalog and prices
Everything lives in src/data/products.json (prices EGP/XOF are placeholders: replace them).

## Admin (Decap CMS) at /admin
Edit public/admin/config.yml (repo name). The GitHub backend needs an OAuth proxy
(set `base_url`), since Netlify Identity/Git Gateway is deprecated. Not usable until configured.
"# valdesign" 
