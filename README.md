# Simple Calculator

Task: Level 0 — Simple Calculator (vanilla JS, no frameworks). Webpack build must output `index.html` and optimized `bundle.js`. Implement arithmetic (+, −, ×, ÷), percent, sign change, decimal separator; no `eval`, no `Math` for основной логики вычислений (используется только для округления результата).

How to run the app (dev):

1. Install dependencies
    - `npm i`
2. Start dev server
    - `npm run start`

Production build:

1. `npm run build`
2. Serve `dist/` directory using any static server, e.g.
    - `npx --yes serve dist`

What’s implemented:

- Webpack config (`config/webpack.config.js`) with HTML template and CSS loaders
- ESLint + Prettier configured, Husky + lint-staged pre-commit
- UI with light/dark themes (toggle saved to `localStorage`)
- Calculator features: digits, operators (+, −, ×, ÷), percent, sign change, decimal, AC, equals
- Errors: division by zero shows a readable message
- Rounding: results are rounded to 4 decimal places

Folder structure (key):

- `src/index.html` — markup
- `src/js/index.js` — logic and event handling
- `src/js/styles.css` — styles and themes
- `dist/` — production output
