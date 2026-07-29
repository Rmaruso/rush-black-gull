import { z } from 'zod';

const pointSchema = z.object({ x: z.number(), y: z.number() });
const polygonSchema = z.array(pointSchema).min(3);
const idSchema = z.string().regex(/^[a-z0-9_]+$/);
const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const rectangleCommandSchema = z.object({
  type: z.literal('rect'),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
  color: colorSchema,
});
const polygonCommandSchema = z.object({
  type: z.literal('polygon'),
  points: polygonSchema,
  color: colorSchema,
});

export const sceneSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: idSchema,
    background: z.object({
      kind: z.literal('procedural'),
      clearColor: colorSchema,
      commands: z.array(
        z.discriminatedUnion('type', [
          rectangleCommandSchema,
          polygonCommandSchema,
        ]),
      ),
    }),
    actorStart: pointSchema,
    actor: z.object({
      spriteSheetId: idSchema,
      animationId: idSchema,
    }),
    spriteSheets: z
      .array(
        z.object({
          id: idSchema,
          frameWidth: z.number().int().positive(),
          frameHeight: z.number().int().positive(),
          palette: z.array(colorSchema).min(1).max(256),
          frames: z
            .array(
              z.object({
                id: idSchema,
                parts: z.array(
                  z.object({
                    x: z.number(),
                    y: z.number(),
                    width: z.number().positive(),
                    height: z.number().positive(),
                    paletteIndex: z.number().int().nonnegative(),
                  }),
                ),
              }),
            )
            .min(1),
          animations: z
            .array(
              z.object({
                id: idSchema,
                frameIds: z.array(idSchema).min(1),
                frameDurationMs: z.number().positive(),
                loop: z.boolean(),
              }),
            )
            .min(1),
        }),
      )
      .min(1),
    walkboxes: z
      .array(
        z.object({
          id: idSchema,
          polygon: polygonSchema,
          neighbours: z.array(z.string()),
        }),
      )
      .min(1),
    hotspots: z
      .array(
        z.object({
          id: idSchema,
          nameKey: z.string(),
          lookKey: z.string(),
          polygon: polygonSchema,
        }),
      )
      .min(2),
    scaleZones: z.array(
      z
        .object({
          id: idSchema,
          polygon: polygonSchema,
          yNear: z.number(),
          yFar: z.number(),
          scaleNear: z.number().positive(),
          scaleFar: z.number().positive(),
        })
        .refine((zone) => zone.yFar > zone.yNear, {
          message: 'yFar must be greater than yNear.',
          path: ['yFar'],
        }),
    ),
  })
  .strict()
  .superRefine((scene, context) => {
    const sheet = scene.spriteSheets.find(
      (candidate) => candidate.id === scene.actor.spriteSheetId,
    );
    if (!sheet) {
      context.addIssue({
        code: 'custom',
        path: ['actor', 'spriteSheetId'],
        message: `Unknown sprite sheet "${scene.actor.spriteSheetId}".`,
      });
      return;
    }
    if (
      !sheet.animations.some(
        (animation) => animation.id === scene.actor.animationId,
      )
    ) {
      context.addIssue({
        code: 'custom',
        path: ['actor', 'animationId'],
        message: `Unknown animation "${scene.actor.animationId}".`,
      });
    }
    scene.spriteSheets.forEach((spriteSheet, sheetIndex) => {
      const frameIds = new Set(spriteSheet.frames.map((frame) => frame.id));
      spriteSheet.frames.forEach((frame, frameIndex) => {
        frame.parts.forEach((part, partIndex) => {
          if (part.paletteIndex >= spriteSheet.palette.length) {
            context.addIssue({
              code: 'custom',
              path: [
                'spriteSheets',
                sheetIndex,
                'frames',
                frameIndex,
                'parts',
                partIndex,
                'paletteIndex',
              ],
              message: `Palette index ${part.paletteIndex} is out of range.`,
            });
          }
        });
      });
      spriteSheet.animations.forEach((animation, animationIndex) => {
        animation.frameIds.forEach((frameId, frameIdIndex) => {
          if (!frameIds.has(frameId)) {
            context.addIssue({
              code: 'custom',
              path: [
                'spriteSheets',
                sheetIndex,
                'animations',
                animationIndex,
                'frameIds',
                frameIdIndex,
              ],
              message: `Unknown frame "${frameId}".`,
            });
          }
        });
      });
    });
  });

export type Scene = z.infer<typeof sceneSchema>;

export async function loadScene(url: string): Promise<Scene> {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Could not load scene (${response.status} ${response.statusText}).`,
    );
  return sceneSchema.parse(await response.json());
}
