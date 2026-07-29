import { expect, test } from '@playwright/test';

test('loads the workshop and looks at a hotspot', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('canvas')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute(
    'data-scene-loaded',
    'workshop',
  );
  await page.getByRole('button', { name: 'Look' }).click();

  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Canvas has no visible bounds.');
  await page.mouse.click(box.x + box.width * 0.84, box.y + box.height * 0.25);

  await expect(page.getByTestId('message')).toContainText('high gutter');
});

test('draws and exports a walkbox in the built-in editor', async ({ page }) => {
  await page.goto('/?editor=1');
  const canvas = page.getByRole('img', {
    name: 'Workshop scene polygon editor',
  });
  await expect(canvas).toBeVisible();
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Editor canvas has no visible bounds.');

  for (const [x, y] of [
    [0.2, 0.7],
    [0.8, 0.7],
    [0.7, 0.9],
  ]) {
    await page.mouse.click(box.x + box.width * x, box.y + box.height * y);
  }
  await page.getByRole('button', { name: 'Finish polygon' }).click();

  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON' }).click();
  await download;
  await expect(page.getByTestId('editor-output')).toHaveValue(
    /"id": "walkbox_01"/,
  );
});
