## Plan: Custom Swap Form Build

Create a bespoke React swap form (no component libraries) with real-time pricing, validation, same-currency prevention, and placeholder icons for missing token SVGs, fully restyled to override current global defaults.

### Steps

1. Define token/price utilities and placeholder icon fallback in [src/App.tsx](src/App.tsx) (fetch prices, derive token list, compute rates, handle missing SVGs).
2. Build controlled form state in [src/App.tsx](src/App.tsx) for amount input, from/to token selects, swap toggle, same-currency guard, validation, and mock async submit with loading/success states.
3. Implement token dropdown UI with search/filter, icon rendering (remote SVG with onError → placeholder), and disable same-token selection in [src/App.tsx](src/App.tsx).
4. Add real-time conversion logic: update receive amount on send input or token change, show rate and fiat hints, handle unavailable-price tokens by omitting them in [src/App.tsx](src/App.tsx).
5. Style the experience in [src/App.css](src/App.css) and [src/index.css](src/index.css): custom layout, glassy card, gradients, responsive grid, focus/error states, button animations, and loading/empty states that override default dark/light theme.
6. Include graceful error/loading UI for price fetch and submit actions (skeletons/spinners, retry) within [src/App.tsx](src/App.tsx).

### Further Considerations

1. Validation: enforce positive amounts and min/max? Recommendation: reject ≤0, cap to reasonable max (e.g., 1,000,000).
2. Network behavior: cache prices per session? Recommendation: fetch on mount, allow manual refresh button if fetch fails.
