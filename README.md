# Lofoten 2026 — The Paddy Expedition

Final English roadbook for Olivier, Sorya, Paddington and Gaston: 25 August–11 September 2026, with the final fuel fill recorded on 12 September.

Live site: https://opedoussaut.github.io/lofoten-2026-roadbook/

## Published experience

- Introduction and crew, with the complete approved cartoon illustration displayed at the top, unobstructed on desktop and mobile.
- Plan vs Reality: the saved A/B road-only itineraries compared with all 18 actual days.
- Daily Stories: the complete English journal, individual day links, expand-all and printing.
- Gaston: recorded identity and pickup mileage, model-reference specifications, mechanical incidents, initial-condition summary and handover epilogue.
- Budget: the live expense ledger with English details, categories and reconciliation notes. The Reservations tab is retired.

## Active files

- `index.html`, `roadbook-final.css`, `roadbook-final.js`: static application, with no build step.
- `journal-en.json`: full English stories. Original French accounts remain in `journal-current.json` and `journal-day13.json`–`journal-day18.json`.
- `route-plans-en.json`: English presentation of the saved plans in `roadbook-plan.js`. Planned kilometres and hours are retained as estimates. Actual daily driving distances are not invented.
- `expenses-current.json`: authoritative expense amounts. `expense-labels-en.json` translates each exact source row without changing its financial value.
- `assets/crew-hero.jpg`: approved illustrated crew in a standard RGB JPEG, preloaded for compatibility across browsers. Original personal photographs are not needed by the application.
- `sw.js`, `manifest.webmanifest`: versioned offline cache and English application metadata.

GitHub Pages publishes `main` from the repository root. Existing historical modules and French source data are retained for traceability; they are not loaded by the final application.

## Data boundaries

The trip total is 8,500 km, corrected by Olivier on 12 September. The return odometer of about 59,113 km is an inference from the recorded 50,613 km pickup value, not a measured handover reading. The application uses one trip-distance constant for its figures. Vehicle dimensions and capacities are stored model/category references. Final handover completion and repair outcomes are not assumed.

Budget dates may be posting dates. Refunds stay netted once; declined payments and the refundable deposit are excluded. Remaining reconciliation questions are visible in the Budget tab. If the expense source changes, add matching English labels for the new rows.

## Validation

Check JavaScript syntax, JSON validity, the 18-day chronology, original-plan totals, exact expense-translation matches and referenced local assets before publication. After publication, check the GitHub Pages deployment status and the live entry point.
