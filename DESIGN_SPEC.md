# DESIGN SPECIFICATION

## Project

**RUSH: Tide of the Black Gull** is an original pixel-art point-and-click adventure set in Rush, County Dublin. It uses the general interaction conventions of early-1990s graphic adventures but must not copy protected characters, stories, artwork, interfaces, dialogue, music, code or puzzles.

## Premise

After a storm exposes a bronze device near South Beach, local sign installer Ronan Byrne discovers a forgotten coastal signalling system linking Rush Harbour, Kenure, Drumanagh and Lambay. The legendary pirate Cormac “Black Gull” Ó Ríada did not hide a conventional treasure. He helped operate a clandestine maritime network that transported people, testimony and evidence. The true treasure is the Ledger of the Tides: a fragmented archive capable of changing the accepted history of the Fingal coast.

The main historical twist is that Black Gull was a rotating title. Cartographer Sorcha Ní Bhraonáin designed the routes and signal code but disappeared from later accounts.

## Tone

- Mystery, historical adventure and comedy.
- Affectionate humour about weather, bureaucracy, gulls, tourism and conflicting local theories.
- No graphic violence or horror.
- Supernatural incidents always retain a plausible alternative explanation.
- Rush residents are competent, varied people rather than stereotypes.

## Main cast

### Ronan Byrne

Protagonist. A practical sign installer who interprets archaeology as a sequence of materials, fixings and alignment problems. Dry, observant and reluctant to take responsibility until others mishandle the evidence.

### Nessa Keane

Café owner and photographer. Excellent memory, strong local network and quick dialogue. Helps document evidence.

### Dr Maeve Kavanagh

Archaeologist. Separates evidence from legend, enforces responsible treatment of heritage and enables authorised access.

### Padraig “Paddy GPS” Doyle

Retired fisherman whose directions rely on buildings that no longer exist. Provides tides, folklore and several theories, one of which is unexpectedly partly correct.

### Declan “Deck” Moran

Salvage diver initially working for Evelyn Vale. Can be persuaded to prioritise preservation.

### Evelyn Vale

Developer who wants to finance, brand and control access to the discovery. Her arguments about safety and funding are partly valid, but she seeks commercial exclusivity.

### Professor Alistair Vane

Media historian who presents hypotheses too confidently and wants publication priority.

## Five-act structure

### Act I — What the Storm Brought

Ronan retrieves his van key from a gull, reaches South Beach, removes a damaged sign and discovers the Black Gull medallion. Maeve, Nessa and Paddy each identify a different aspect. The medallion projects a three-light pattern. A distant light answers from Drumanagh.

### Act II — The Three Lights of Kenure

The player reconstructs alignments using the surviving Kenure portico, historical images, church records and authorised research at Drumanagh. The map is revealed to be a layered route rather than treasure coordinates.

### Act III — The Book That Should Not Exist

Fragments of the ledger are traced through Rush, Loughshinny, Rogerstown and Skerries. The supposed crew list is revealed to be a list of passengers and protected identities. Maeve organises an authorised research visit to Lambay.

### Act IV — The Island That Looks Back

On Lambay, the team solves architectural, optical and tidal puzzles without damaging protected sites. A cave contains the remains of The Quiet Wake and a preserved archive. Evelyn steals a misleading index.

### Act V — The Last Low Tide

During a storm, characters coordinate signals from Kenure, Drumanagh and Rush Harbour. Ronan opens the final archive beneath a fictional composite coastal structure. The player chooses a preservation and access model for the discovery.

## World and key scenes

Planned locations include:

- Byrne Signs workshop.
- Rush Main Street.
- The Bent Spoon café.
- Local archive.
- Rush Harbour by day and night.
- South Beach after the storm.
- Kenure portico and park.
- A reconstructed mental view of Kenure House.
- St Maur’s/Kenure heritage setting.
- Drumanagh controlled research area.
- Drumanagh Martello Tower exterior.
- Loughshinny Harbour.
- Rogerstown observation points.
- Skerries Harbour.
- Lambay expedition areas.
- The Quiet Wake cave.
- Final fictional archive chamber.

Private and archaeologically sensitive places must never be represented as freely accessible. Dangerous or destructive puzzle locations must be fictional composites.

## Core gameplay

- Third-person point-and-click.
- Logical resolution 320×200.
- Integer nearest-neighbour scaling with letterboxing.
- Walkboxes and deterministic pathfinding.
- Depth sorting by baseline and foreground occlusion layers.
- Nine verbs: Walk, Look, Talk, Use, Pick Up, Open, Close, Give, Push/Pull.
- Inventory with item-to-item and item-to-scene interactions.
- Dialogue trees with conditions, effects, trust and remembered topics.
- Journal containing objectives, discoveries, symbols and fictional tide information.
- Manual save, autosave and schema migrations.
- No deaths, irreversible item loss or unwinnable states.

## Puzzle rules

Every critical puzzle must have:

- a visible objective;
- at least two clues;
- feedback for partial attempts;
- a logical solution established by observation, dialogue or prior rules;
- recovery from mistakes;
- automated or documented tests.

Avoid pixel hunting, arbitrary random sequences, real-time failure states and damage to heritage.

## Vertical slice: P01–P08

### P01 — Retrieve the van key

A gull has left the spare key in a gutter. Stabilise a folding ladder with a rubber chock, then use a telescopic pole.

### P02 — Start the van

The battery is low. Disconnect a power-hungry workshop machine, connect the charger and restore power.

### P03 — Remove the South Beach sign

Create an improvised driver bit using a promotional token and file, then remove the damaged sign and expose the medallion.

### P04 — Document the medallion safely

Maeve prevents destructive cleaning. Use a soft brush, air and raking light photography.

### P05 — Identify the symbol

Gather evidence from Nessa, Maeve and Paddy. The journal forms a new hypothesis only after all three knowledge flags exist.

### P06 — Repair the harbour signal lamp

Combine an insulated cable, connector and battery.

### P07 — Project the three points

Mount the medallion before the lamp and align it over a harbour map.

### P08 — Answer the signal

Repeat the 2-1-3 sequence encoded by the medallion’s rivets. A light answers from Drumanagh, ending the slice.

## Technical architecture

Approved stack:

- TypeScript.
- Vite.
- Canvas 2D.
- Web Audio API.
- Zod.
- Vitest.
- Playwright.
- ESLint and Prettier.

Do not use a game framework for the first implementation.

Recommended modules:

```text
src/
  engine/Game.ts
  engine/Clock.ts
  engine/EventBus.ts
  engine/StateStore.ts
  rendering/Renderer.ts
  rendering/PixelScaler.ts
  input/PointerInput.ts
  input/ActionComposer.ts
  navigation/Walkbox.ts
  navigation/AStar.ts
  navigation/ActorMovement.ts
  scenes/SceneLoader.ts
  scenes/InteractionResolver.ts
  dialogue/DialogueRunner.ts
  inventory/Inventory.ts
  audio/AudioManager.ts
  save/SaveManager.ts
  ui/VerbPanel.ts
  ui/InventoryPanel.ts
  localization/I18n.ts
  debug/DebugOverlay.ts
```

## Data-driven content

Scenes, items and dialogue are loaded from validated data. Data files may define conditions and registered effects but must not contain executable JavaScript.

Condition examples:

- flag;
- variable;
- hasItem;
- itemState;
- sceneState;
- trust;
- knowledge;
- tide;
- all/any/not.

Effect examples:

- setFlag;
- addItem;
- transformItem;
- startDialogue;
- moveActor;
- transitionScene;
- addJournalEntry;
- playSound.

## Rendering

- Internal canvas exactly 320×200.
- `imageSmoothingEnabled = false`.
- Scale to the largest integer factor fitting the viewport.
- Convert pointer coordinates into logical coordinates.
- Maintain a fixed or accumulated deterministic update step.
- Game logic must not depend on display frame rate.

## Navigation

Walk areas are polygons with adjacency and depth-scale metadata. Navigation should:

1. project invalid clicks to the nearest walkable point;
2. identify start and destination regions;
3. run A* over the region graph;
4. generate and smooth the path;
5. move the actor deterministically;
6. execute the interaction on arrival.

## Accessibility

- Keyboard and pointer operation.
- Adjustable text speed.
- Pixel font plus readable alternative.
- Optional hotspot highlighting.
- Separate audio buses.
- Reduced flashing.
- Progressive hints.

## Art direction

- Original pixel art, not a visual clone.
- Limited original palette of up to 256 colours.
- Recognisable cold coastal light, wide sand, stone piers, wind and the Lambay silhouette.
- Placeholder art must consist of original geometric pixel shapes.
- AI imagery may be used only as internal concept reference and must be reviewed/redrawn before publication.

## Audio direction

Irish coastal folk instrumentation with fiddle, whistle, concertina, restrained bodhrán and low-fidelity textures. The Black Gull motif is three pulses followed by a descending note. Do not imitate copyrighted melodies.

## Historical fact and fiction

Documented inspirations include maritime trade, piracy and smuggling around Fingal, Lambay’s maritime history, Drumanagh’s Roman-period contacts and the demolition of Kenure House. The pirate characters, signalling system, ship, ledger, tunnels, caves and final archive are fictional.

## Production order

1. Repository and CI.
2. Minimal engine increment.
3. Vertical slice.
4. Data validators and debugging tools.
5. Complete Act I.
6. Acts II and III.
7. Lambay and finale.
8. QA, accessibility, historical review and asset licensing review.

Codex must implement only the current milestone and stop at its acceptance criteria.
