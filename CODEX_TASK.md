# CODEX INITIAL TASK — MINIMAL PLAYABLE ENGINE INCREMENT

Before writing code:

1. Read `README.md`, `AGENTS.md` and `DESIGN_SPEC.md`.
2. Summarise the approved architecture in no more than 20 lines.
3. Note any ambiguity or contradiction.
4. Produce a short implementation plan.
5. Do not implement the entire game or vertical slice in one pass.

## Goal

Create the repository foundation and the smallest playable engine increment.

At completion, a user must be able to:

- run `npm install`;
- run `npm run dev`;
- see a logical 320×200 canvas scaled with nearest-neighbour rendering;
- load one placeholder workshop scene from validated JSON;
- click a walkable point;
- watch a placeholder Ronan actor move to it;
- inspect one hotspot with the Look verb;
- run unit tests and a basic browser smoke test.

## Approved stack

- TypeScript.
- Vite.
- Canvas 2D.
- Zod.
- Vitest.
- Playwright.
- ESLint.
- Prettier.

Do not introduce a game framework.

## Minimum modules

```text
src/main.ts
src/engine/Game.ts
src/engine/Clock.ts
src/engine/EventBus.ts
src/rendering/Renderer.ts
src/rendering/PixelScaler.ts
src/input/PointerInput.ts
src/navigation/Walkbox.ts
src/navigation/AStar.ts
src/navigation/ActorMovement.ts
src/scenes/SceneLoader.ts
src/scenes/Hotspot.ts
src/ui/VerbPanel.ts
src/localization/I18n.ts
public/game-data/scenes/workshop.json
public/game-data/localization/en-IE.json
tests/unit/
tests/e2e/
```

Names may be adjusted only when the reason is documented.

## Functional requirements

### Canvas

- Internal size exactly 320×200.
- Integer scaling and letterboxing.
- `imageSmoothingEnabled = false`.
- Correct pointer-coordinate conversion after resizing.

### Scene

- Loaded from JSON and validated with Zod.
- Contains an original placeholder background.
- Contains at least one walkbox.
- Contains a gutter hotspot and a workbench hotspot.

### Actor

- Original geometric pixel placeholder.
- Deterministic logical movement speed.
- Stops at target.
- Cannot walk outside the allowed polygon.
- Movement is frame-rate independent.

### Interaction

- Walk and Look are functional.
- Looking at a hotspot displays localised text.
- User-visible text is not hardcoded in engine modules.

## Tests

Unit tests must cover:

- coordinate conversion;
- point-inside-polygon;
- nearest valid point;
- initial navigation or A* behaviour;
- scene-schema validation;
- localisation lookup.

E2E must verify:

- application loads;
- canvas is visible;
- scene data loads;
- Look interaction updates the text display.

## Visual limits

Use only original geometric pixel placeholders. Do not download or generate assets copied from commercial games.

## Documentation

Update `README.md` with prerequisites, commands, architecture summary, limitations and next milestone.

Create `docs/IMPLEMENTATION_STATUS.md` listing files created, tests added, deviations, known issues and the exact recommended next task.

## Stop condition

Stop when this smallest playable increment builds and all tests pass.

Do not proceed to inventory, full dialogue trees, saves, audio or puzzle P01 unless requested in a later task.

## Final report

Report:

1. architecture implemented;
2. files changed;
3. commands run;
4. test results;
5. visual verification;
6. known limitations;
7. recommended next task.
