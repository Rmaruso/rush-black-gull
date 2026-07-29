# Implementation status

## Result

Issue #1's minimal playable engine increment is implemented: a validated workshop scene renders at logical 320×200, Ronan walks within its polygon, and Look displays localised hotspot text.

The next vertical-slice tooling increment adds validated procedural background commands, palette-based geometric sprite frames, animation metadata, actor scale zones and an in-browser polygon editor. This replaces the need for Aseprite or Tiled during placeholder production.

## Files created

- Project configuration: `package.json`, TypeScript, Vite, ESLint, Prettier and Playwright configuration.
- Runtime: engine clock/event bus/game coordinator, renderer/scaler, pointer input, navigation geometry/A*, actor movement, scene loader/hotspot type, verb panel and localisation.
- Tooling: procedural art renderer, scene editor model, browser editor UI and programmatic art workflow guide.
- Data: `workshop.json` and `en-IE.json`.
- Tests: unit coverage for scaling, polygon geometry, A*, actor movement, scene validation and localisation; Playwright workshop smoke coverage.

## Tests added

- Integer layout and pointer-coordinate conversion.
- Point-in-polygon and nearest valid point.
- Deterministic shortest region route.
- Frame-rate-independent movement and exact stopping.
- Valid and invalid scene schema cases.
- Localisation lookup and missing-key behaviour.
- Browser load, scene readiness, canvas visibility and gutter Look interaction.
- Procedural scale interpolation, extended scene references and editor export logic.
- Browser polygon creation and JSON download.

## Deviations

- None. All requested minimum modules are present. The hotspot module is a type boundary while validation remains centralised in `SceneLoader`.

## Known issues

- The single workshop walkbox does not yet need region transitions or path smoothing.
- Editor controls, verb labels, interaction responses and game-world text are localised.
- Final PNG loading and foreground occlusion layers remain future work; current art is intentionally procedural.

## Exact recommended next task

Add image-backed final-art loading with an asset licence manifest and keep the procedural renderer as a fallback. Add foreground occlusion layers and validate them in the browser editor. Do not begin inventory, dialogue, save/load, audio or puzzle P01.
