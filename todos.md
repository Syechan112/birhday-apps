# Todos — Birthday Gacha

## Setup
- [x] **React + Vite**: Scaffold project, remove default files, add scripts
- [x] **Tailwind CSS 4**: `npm i tailwindcss @tailwindcss/vite`, add to `vite.config.js`, `@import "tailwindcss"` in `src/index.css`
- [x] **Anime.js v4**: `npm i animejs`, read docs (createScope + React useEffect pattern, animate(), stagger(), spring, easings)
- [x] **Other deps**: `lucide-react`, `canvas-confetti`, `html-to-image`
- [x] **Public assets**: placeholder folders `/images`, `/audio`, `favicon.svg`

## Data & Utils
- [x] `src/data/birthdayConfig.js` — gifts, messages, certificate config
- [x] `src/utils/calculateAge.js` — accurate years, totalDays, daysSinceLastBirthday
- [x] `src/utils/downloadCertificate.js` — html-to-image PNG export
- [x] `src/hooks/useAge.js`
- [x] `src/hooks/useTypewriter.js`
- [x] `src/hooks/useMusic.js` — autoplay-on-interaction, error handling

## Components
- [x] `common/Button.jsx` — variants: primary, secondary, outline
- [x] `common/ProgressIndicator.jsx` — progress bar + count
- [x] `common/PageTransition.jsx` — animejs enter animation
- [x] `birthday/BirthdayForm.jsx` — name + date input, validation
- [x] `birthday/AgeCounter.jsx` — count-up via animejs innerHTML
- [x] `birthday/GachaGift.jsx` — shake → reveal, photo + message
- [x] `birthday/BirthdayLetter.jsx` — typewriter effect + skip
- [x] `birthday/Certificate.jsx` — html-to-image download, responsive
- [x] `birthday/CelebrationActions.jsx` — confetti spam + virtual hug
- [x] `App.jsx` — page state machine, music integration

## TODO (polish)
- [ ] `public/` placeholder images + audio file
- [ ] `index.html` meta + favicon + fonts (serif for certificate)
- [x] Build test: `npm run build` — passed
- [ ] Dev test: `npm run dev` — full journey
- [ ] Mobile overflow check, prefers-reduced-motion guard
- [ ] Photo fallback (picsum) on image error
