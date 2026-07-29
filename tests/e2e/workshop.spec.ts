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
