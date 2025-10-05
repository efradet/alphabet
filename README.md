# Alphabet Game (React + Vite + TypeScript + Redux + Tailwind)

Un petit jeu éducatif : l'application énonce une lettre, l'enfant sélectionne la bonne.
- Bonne réponse → vert, +1 point, lettre retirée.
- Mauvaise réponse → la bonne lettre clignote en orange.
- Après 3 erreurs sur une même lettre → la lettre devient orange (ignorée).

## Installation
```bash
npm install
npm run dev
```

> Prérequis : Node 18+

## Tech
- Vite + React + TypeScript
- Redux Toolkit + React-Redux
- Tailwind CSS
- Web Speech API (voix FR si disponible)

## Structure
```text
src/
  components/        # UI découpée
  constants/         # Alphabet + noms français
  redux/             # store + slice + thunks
  utils/             # utilitaires (speech)
```