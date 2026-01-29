
# Currency Swap App – React + TypeScript + Vite

This project is a custom-built currency swap application using React, TypeScript, and Vite. It features real-time pricing, robust validation, custom UI components, and a modern, responsive design. No component libraries are used; all UI is bespoke and fully restyled.

## Features

- **Real-time token prices** with manual refresh and error handling
- **Swap form** with validation, same-currency prevention, and animated feedback
- **Custom hooks** for prices, swap state, calculations, and submission
- **Reusable components**: SwapPanel, TokenSelect, AmountInput, UsdHint, Alert, Toast, etc.
- **Graceful loading and error states** (spinners, skeletons, retry)
- **Responsive, glassy UI** with custom CSS (see `App.css`, `index.css`)
- **TypeScript strict mode** and modern ESLint configuration

## Directory Structure

```
src/problem2/
├── DESIGN_AUDIT.md           # Design and refactoring notes
├── README.md                 # This file
├── package.json              # Project dependencies and scripts
├── tsconfig*.json            # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── public/                   # Static assets (e.g., vite.svg)
├── keep/                     # (Legacy/demo) HTML, CSS, JS
├── planCurrencySwapForm.prompt.md # Build plan and requirements
└── src/
    ├── App.tsx               # Main app component
    ├── App.css               # App-level styles
    ├── index.css             # Global styles
    ├── main.tsx              # App entry point
    ├── types.ts              # TypeScript types
    ├── assets/               # Static assets (SVGs, etc.)
    ├── components/
    │   ├── Alert.tsx, .css
    │   ├── AmountInput.tsx, .css
    │   ├── MetadataItem.tsx, .css
    │   ├── SwapHeader.tsx, .css
    │   ├── SwapMetadata.tsx, .css
    │   ├── SwapPanel.tsx, .css
    │   ├── Toast.tsx, .css
    │   ├── TokenIcon.tsx, .css
    │   ├── TokenSelect.tsx, .css
    │   └── UsdHint.tsx, .css
    ├── hooks/
    │   ├── usePrices.ts
    │   ├── useSwapCalculations.ts
    │   ├── useSwapState.ts
    │   └── useSwapSubmission.ts
    └── utils/
        ├── format.ts
        ├── tokenUtils.ts
        └── validation.ts
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Lint the code:**
   ```sh
   npm run lint
   ```

## ESLint & TypeScript

- ESLint is configured for both JS and TS, with recommended and React rules. See `eslint.config.js` for details.
- TypeScript is set to strict mode. See `tsconfig.app.json` and `tsconfig.json`.

## Design & Architecture

- See `DESIGN_AUDIT.md` for a summary of SOLID principles, separation of concerns, and custom hooks/components.
- See `planCurrencySwapForm.prompt.md` for the original build plan and requirements.

## License

MIT (or as specified in the project root)
