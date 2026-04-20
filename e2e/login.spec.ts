import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:4200/login');

  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', '1234');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/posts/);
});