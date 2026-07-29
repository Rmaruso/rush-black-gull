# AGENTS.md

## Mission

Build an original, data-driven, browser-based point-and-click adventure titled **RUSH: Tide of the Black Gull**.

Read `README.md`, `DESIGN_SPEC.md` and `CODEX_TASK.md` before making architectural changes.

## Non-negotiable rules

1. Do not copy source code, assets, dialogue, puzzles, UI layouts, names, music or characters from Monkey Island or any other commercial game.
2. Genre conventions are allowed; implementation and content must be original.
3. Use TypeScript, Vite and Canvas 2D unless a task explicitly updates the approved architecture.
4. Keep the logical render resolution at 320×200 and scale only by integer factors.
5. Keep game content data-driven. Scene and dialogue JSON must not contain executable JavaScript.
6. Validate external data with Zod.
7. Add tests for critical logic and puzzle state transitions.
8. Do not add a dependency without explaining why native browser APIs or existing utilities are insufficient.
9. Do not add copyrighted placeholder art. Use original geometric pixel placeholders.
10. Do not depict private or archaeologically sensitive locations as freely accessible.
11. Preserve save compatibility through schema versions and migrations.
12. Never implement the full campaign in one task. Complete the current milestone and stop.

## Expected commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Code standards

- Strict TypeScript.
- Small modules with explicit interfaces.
- No `any` unless isolated and justified.
- No hidden global mutable state.
- Pure functions for conditions, effects and pathfinding where possible.
- Errors should be actionable.
- All IDs are stable snake_case strings.
- User-visible text must come from localization files.
- Comments explain decisions, not obvious syntax.

## Testing standards

Every change must:

- pass unit tests;
- pass data validation;
- add tests for new logic;
- include manual verification steps for visual changes.

## Vertical-slice boundaries

The first slice includes only:

- workshop;
- Main Street;
- café;
- South Beach;
- Rush Harbour day/night;
- Ronan, Nessa, Maeve and Paddy;
- puzzles P01–P08;
- save/load;
- basic journal;
- settings;
- debug overlay.

Do not implement Acts II–V until the vertical-slice acceptance criteria pass.

## Definition of done

A task is done only when:

- it builds;
- tests pass;
- behaviour matches the design specification;
- keyboard and pointer paths work;
- data has validation;
- documentation is current;
- no untracked or unlicensed generated assets are introduced.
