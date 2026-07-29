import { z } from 'zod';

const pointSchema = z.object({ x: z.number(), y: z.number() });
const polygonSchema = z.array(pointSchema).min(3);

export const sceneSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.string().regex(/^[a-z0-9_]+$/),
  background: z.object({
    wall: z.string(),
    floor: z.string(),
  }),
  actorStart: pointSchema,
  walkboxes: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9_]+$/),
        polygon: polygonSchema,
        neighbours: z.array(z.string()),
      }),
    )
    .min(1),
  hotspots: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9_]+$/),
        nameKey: z.string(),
        lookKey: z.string(),
        polygon: polygonSchema,
      }),
    )
    .min(2),
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
