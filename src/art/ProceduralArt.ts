import type { Scene } from '../scenes/SceneLoader';

export function drawProceduralBackground(
  context: CanvasRenderingContext2D,
  background: Scene['background'],
): void {
  context.fillStyle = background.clearColor;
  context.fillRect(0, 0, 320, 200);

  background.commands.forEach((command) => {
    context.fillStyle = command.color;
    if (command.type === 'rect') {
      context.fillRect(command.x, command.y, command.width, command.height);
      return;
    }
    context.beginPath();
    command.points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.closePath();
    context.fill();
  });
}

export function actorScaleAt(scene: Scene, x: number, y: number): number {
  const zone = scene.scaleZones.find((candidate) => {
    let inside = false;
    for (
      let i = 0, j = candidate.polygon.length - 1;
      i < candidate.polygon.length;
      j = i++
    ) {
      const a = candidate.polygon[i];
      const b = candidate.polygon[j];
      if (
        a.y > y !== b.y > y &&
        x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x
      ) {
        inside = !inside;
      }
    }
    return inside;
  });
  if (!zone) return 1;
  const t = Math.max(
    0,
    Math.min(1, (y - zone.yNear) / (zone.yFar - zone.yNear)),
  );
  return zone.scaleNear + (zone.scaleFar - zone.scaleNear) * t;
}

export function drawSpriteFrame(
  context: CanvasRenderingContext2D,
  sheet: Scene['spriteSheets'][number],
  frameId: string,
  x: number,
  baseline: number,
  scale: number,
): void {
  const frame = sheet.frames.find((candidate) => candidate.id === frameId);
  if (!frame)
    throw new Error(`Sprite frame "${frameId}" is missing from "${sheet.id}".`);

  frame.parts.forEach((part) => {
    context.fillStyle = sheet.palette[part.paletteIndex];
    context.fillRect(
      Math.round(x + part.x * scale),
      Math.round(baseline + part.y * scale),
      Math.max(1, Math.round(part.width * scale)),
      Math.max(1, Math.round(part.height * scale)),
    );
  });
}
