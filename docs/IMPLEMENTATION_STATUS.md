# Implementation status

## Result

Issue #1's minimal playable engine increment is implemented: a validated workshop scene renders at logical 320×200, Ronan walks within its polygon, and Look displays localised hotspot text.

## Files created

- Project configuration: `package.json`, TypeScript, Vite, ESLint, Prettier and Playwright configuration.
- Runtime: engine clock/event bus/game coordinator, renderer/scaler, pointer input, navigation geometry/A*, actor movement, scene loader/hotspot type, verb panel and localisation.
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

## Deviations

- None. All requested minimum modules are present. The hotspot module is a type boundary while validation remains centralised in `SceneLoader`.

## Known issues

- The single workshop walkbox does not yet need region transitions or path smoothing.
- Verb button labels are static accessibility controls; interaction responses and game-world text are localised.
- Placeholder scenery has no authored sprite or occlusion layers.

## Exact recommended next task

Add validated multi-walkbox scene metadata, path smoothing and a toggleable debug overlay that draws walkboxes, hotspots, actor baseline and current path. Extend unit and Playwright coverage for transitions between adjacent walkboxes. Do not begin inventory, dialogue, save/load, audio or puzzle P01.
