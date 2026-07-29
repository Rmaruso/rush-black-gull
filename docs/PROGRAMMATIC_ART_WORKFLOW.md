# Programmatic art and scene workflow

This workflow replaces Aseprite and Tiled for the early vertical slice. It uses only repository-owned JSON, TypeScript and browser Canvas APIs. No commercial-game resources or traced layouts are permitted.

## Open the tools

```bash
npm install
npm run dev
```

- Game: `http://127.0.0.1:4173/`
- Scene polygon editor: `http://127.0.0.1:4173/?editor=1`

The editor displays the same procedural 320×200 workshop used by the game. Select **Walkbox**, **Hotspot** or **Scale zone**, click at least three points, then finish the polygon. Enter finishes, Escape cancels the active polygon and Command/Control+Z undoes. **Export JSON** downloads a merge-ready scene fragment and shows it in the preview box.

## Scene JSON

`public/game-data/scenes/workshop.json` is validated by Zod before the game starts.

- `background.commands` contains original rectangles and polygons in logical pixels.
- `spriteSheets` contains palette-limited placeholder frames built from geometric parts.
- `animations` names frame sequences, frame duration and looping.
- `walkboxes` defines navigable polygons and adjacency.
- `hotspots` defines interaction polygons and localisation keys.
- `scaleZones` defines polygons plus near/far baseline and actor scale values.

All IDs use stable `snake_case`. Colours use six-digit hexadecimal values. Coordinates always refer to the logical 320×200 canvas, never the scaled browser size.

## Creating original placeholders

1. Sketch the scene with `rect` and `polygon` commands.
2. Keep a small, named palette and reuse colours.
3. Build character frames from small geometric `parts` anchored to the actor baseline.
4. Add frames to an animation in playback order.
5. Draw interaction geometry in the browser editor and merge the exported arrays into the scene.
6. Run build, unit tests and Playwright before committing.

The current workshop and Ronan are deliberately abstract and original. They establish composition and interaction only; they are not intended to imitate a commercial adventure game.

## Replacing placeholders with final art

Keep the scene IDs, logical dimensions, actor baseline, hotspot IDs and walkbox geometry stable while art is reviewed.

1. Create final original art at 320×200 or at exact logical-pixel sprite dimensions.
2. Record the author, licence and source file in an asset manifest before committing it.
3. Use lossless PNG with transparency for sprites; never resample inside the game.
4. Preserve frame IDs and animation IDs so gameplay data does not change with the art.
5. Add an image-backed renderer adapter in a later task while retaining the current procedural renderer as a fallback.
6. Compare final art against the debug geometry and adjust polygons only when interaction readability requires it.
7. Verify nearest-neighbour rendering at several integer scales and test keyboard and pointer paths.

Do not import generated imagery directly as shipping art. Any concept reference must be reviewed and redrawn as an original, licensed project asset.
