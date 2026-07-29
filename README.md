# RUSH: LA MAREA DE LA GAVIOTA NEGRA

Paquete de preproducción para una aventura gráfica point-and-click original ambientada en Rush, County Dublin.

## Propósito

Este repositorio contiene el diseño del proyecto: concepto, historia, personajes, estructura narrativa, escenas, puzzles, sistema de diálogos, dirección artística, diseño del motor y plan de producción.

Está preparado para que Codex implemente primero un vertical slice pequeño y verificable.

## Principios

- Aventura original; no copia personajes, guion, arte ni código de Monkey Island.
- Sensación de aventura gráfica de principios de los 90.
- Pixel art a resolución lógica 320×200.
- Interfaz de verbos inspirada en el género SCUMM, creada desde cero.
- Humor irlandés, misterio costero y folklore sin terror gráfico.
- Rush y Fingal reconocibles, reinterpretados para la ficción.
- Hechos históricos e invenciones narrativas separados en `docs/10_HISTORICAL_RESEARCH.md`.

## Título

**RUSH: La marea de la Gaviota Negra**  
Título internacional: **RUSH: Tide of the Black Gull**

## Logline

Tras una tormenta que deja al descubierto un mecanismo de bronce en South Beach, un rotulista de Rush descubre que un supuesto pirata del siglo XVII no escondió oro, sino una prueba capaz de reescribir la historia marítima de Fingal. Para encontrarla deberá descifrar señales entre Kenure, Drumanagh y Lambay antes de que tres rivales conviertan el misterio en propiedad privada.

## Alcance previsto

- 5 actos.
- 40 escenas principales y 9 variantes.
- 54 puzzles de ruta crítica.
- 15 puzzles opcionales.
- 28 personajes con diálogo relevante.
- 8–12 horas para una primera partida.
- Inglés inicial, arquitectura preparada para español e irlandés.
- Windows, macOS y navegador.

## Vertical slice inicial

1. Taller del protagonista.
2. Main Street.
3. Rush Harbour.
4. South Beach después de la tormenta.
5. Primer puzzle de inventario.
6. Primer árbol de diálogo.
7. Descubrimiento del medallón de la Gaviota Negra.
8. Guardado y carga.

## Orden de lectura

1. `docs/01_GDD.md`
2. `docs/02_STORY_BIBLE.md`
3. `docs/03_CHARACTERS_AND_DIALOGUE.md`
4. `docs/04_WORLD_SCENES.md`
5. `docs/05_PUZZLES.md`
6. `docs/06_TECHNICAL_ARCHITECTURE.md`
7. `docs/07_DATA_SCHEMAS.md`
8. `docs/08_ART_AUDIO_GUIDE.md`
9. `docs/09_PRODUCTION_ROADMAP.md`
10. `docs/10_HISTORICAL_RESEARCH.md`
11. `AGENTS.md`
12. `CODEX_TASK.md`

## Reglas legales y creativas

No utilizar personajes, nombres, chistes, diálogos, música, código ni recursos extraídos de franquicias comerciales. Sí utilizar convenciones generales del género point-and-click mediante una implementación y contenido originales.

## Inicio con Codex

Codex debe leer `AGENTS.md` y ejecutar las instrucciones de `CODEX_TASK.md`. La primera entrega es únicamente la base del motor y una escena mínima jugable; no el juego completo.

## Minimal playable engine

### Prerequisites

- Node.js 20.19+ or 22.12+.
- npm.
- A Playwright Chromium installation (`npx playwright install chromium`).

### Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run format:check
npm run test
npm run test:e2e
```

### Architecture

The first increment is a strict TypeScript/Vite application using Canvas 2D without a game framework. A deterministic clock updates a geometric Ronan placeholder independently of display frame rate. The renderer keeps a 320×200 internal buffer and uses integer nearest-neighbour scaling with letterboxing. Pointer input is translated to logical coordinates. Zod validates the workshop scene JSON; a separate `en-IE` JSON file supplies all interaction text. Polygon utilities constrain walking, and a small region-graph A* module establishes the multi-walkbox navigation boundary.

### Manual verification

1. Run `npm run dev` and open the printed local URL.
2. Resize the browser and confirm the image remains sharp, centred, and integer-scaled.
3. Click the workshop floor and confirm Ronan walks to the selected valid point and stops.
4. Select **Look**, then click the gutter and workbench; confirm localised descriptions appear.
5. Confirm clicking outside the floor projects Ronan to its nearest edge when **Walk** is selected.

### Current limitations and next milestone

Only the workshop, geometric placeholders, a single walkbox, and the Walk and Look verbs exist. There is no inventory, dialogue, save/load, audio, complete puzzle, or vertical-slice content. The recommended next task is to strengthen the data validators and debug overlay, then add multi-walkbox navigation without starting P01.

## Built-in art and scene workflow

No Aseprite or Tiled knowledge is required for the current vertical-slice work. The workshop background, Ronan placeholder, sprite frames, animation metadata and scale zones are original geometric data validated from JSON.

Run `npm run dev`, then open:

- `http://127.0.0.1:4173/` for the game.
- `http://127.0.0.1:4173/?editor=1` for the browser polygon editor.

The editor draws walkboxes, hotspots and scale zones directly over the logical 320×200 scene and exports a JSON fragment suitable for merging into scene data. It uses native Canvas, Blob and download APIs, so no extra editor dependency is needed. See [`docs/PROGRAMMATIC_ART_WORKFLOW.md`](docs/PROGRAMMATIC_ART_WORKFLOW.md) for the complete placeholder and final-art replacement guide.
