# RN0826 Website

RN0826 is a static frontend project built as a personal "quick pit-stop for a nerd" website. The current version focuses on a polished homepage experience with a branded header, segmented navigation, light/dark modes, paired landscape and portrait carousels, dynamic quote loading, search UI, and a login modal prototype.

## Current Features

- Light and dark visual modes with persistent theme preference.
- Dual carousel hero layout: landscape panel plus portrait companion panel.
- Data-driven quote system powered by `data/quotes.json`.
- Animated quote reveal/exit system in light mode.
- Portrait quotes randomly select either a companion or counterpoint statement.
- Search bar toggle with keyboard shortcut support.
- Login modal with guarded close behavior, password visibility toggle, password-strength hints, and toast warning.
- Separate `auth-register-dummy.html` prototype kept as a future auth/register experiment.

## Project Structure

```text
RN0826_WebSite/
|-- index.html
|-- auth-register-dummy.html
|-- data/
|   `-- quotes.json
|-- CSS/
|   |-- variables.css
|   |-- typography.css
|   |-- global.css
|   |-- layout.css
|   |-- utilities.css
|   |-- components/
|   `-- pages/
|-- JavaScript/
|   |-- navbar.js
|   |-- search.js
|   |-- themes.js
|   |-- carousel.js
|   |-- auth.js
|   `-- main.js
`-- assets/
    `-- images/
```

## Running Locally

This project does not require a build step. Because `carousel.js` fetches `data/quotes.json`, run it through a local server instead of opening `index.html` directly.

Example with BrowserSync:

```bash
browser-sync start --server --files "**/*.html, **/*.css, **/*.js, data/*.json"
```

Then open the local URL shown by BrowserSync.

## Notes

`auth-register-dummy.html` is intentionally kept as a standalone prototype. The main MVP login modal lives in `index.html`; the register prototype is preserved separately while the integration approach is being refined.

## Version 1 Scope

This version is intended as a stable MVP/homepage experience. Future versions may add full About/Contact pages, a merged register flow, richer quote pairing behavior, and stronger responsive layout polish.
