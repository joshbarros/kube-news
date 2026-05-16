import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should render properly on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check navbar is visible and responsive
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();

    // Check hero section is readable
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Check content is not clipped
    const content = page.locator('main').first();
    const box = await content.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });

  test('should render properly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Check all sections are visible
    const sections = page.locator('section, article');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);

    // Verify responsive spacing
    const mainContent = page.locator('main').first();
    const box = await mainContent.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(768);
  });

  test('should render properly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Check full width layout
    const mainContent = page.locator('main').first();
    const box = await mainContent.boundingBox();
    expect(box?.width).toBeGreaterThan(768);

    // Check multi-column layouts are visible
    const grids = page.locator('[class*="grid"], [class*="flex"]');
    expect(await grids.count()).toBeGreaterThan(0);
  });

  test('should handle Learn page on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/learn');

    // Check content is readable
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();

    // Check cards stack vertically (single column)
    const cards = page.locator('[class*="card"], article');
    if ((await cards.count()) > 0) {
      const firstCard = cards.nth(0);
      const secondCard = cards.nth(1);

      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();

      if (firstBox && secondBox) {
        // On mobile, cards should be stacked (different Y positions)
        expect(firstBox.y).toBeLessThan(secondBox.y);
      }
    }
  });

  test('should have accessible touch targets on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check buttons are large enough (minimum 44x44 recommended)
    const buttons = page.locator('button, a[role="button"]');

    for (let i = 0; i < Math.min(await buttons.count(), 5); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();

      if (box) {
        const minTouchSize = 44;
        expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(minTouchSize - 5); // Allow small margin
      }
    }
  });

  test('should maintain navbar visibility on scroll (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const navbar = page.locator('nav').first();
    const initialPosition = await navbar.boundingBox();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));

    const scrolledPosition = await navbar.boundingBox();

    // Navbar should be sticky (visible at similar position)
    if (initialPosition && scrolledPosition) {
      expect(Math.abs(initialPosition.y - scrolledPosition.y)).toBeLessThan(100);
    }
  });

  test('should handle orientation change', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const portraitHeading = page.locator('h1').first();
    await expect(portraitHeading).toBeVisible();

    // Change to landscape
    await page.setViewportSize({ width: 667, height: 375 });

    // Content should still be visible
    await expect(portraitHeading).toBeVisible();
  });

  test('should have readable text on all screen sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Check that text is not overflowing
      const textElements = page.locator('h1, h2, p');

      for (let i = 0; i < Math.min(await textElements.count(), 3); i++) {
        const element = textElements.nth(i);
        const box = await element.boundingBox();

        if (box) {
          // Text should fit within viewport
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    }
  });

  test('should optimize images for responsive layout', async ({ page }) => {
    const viewports = [
      { width: 375 }, // Mobile
      { width: 1920 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Check for responsive images (img tags with proper attributes)
      const images = page.locator('img');

      for (let i = 0; i < Math.min(await images.count(), 3); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');

        // All images should have alt text for accessibility
        expect(alt).toBeTruthy();
      }
    }
  });
});

// Test specific mobile device profiles
test.describe('Mobile Devices', () => {
  test('should work on iPhone 12', async ({ browser }) => {
    const context = await browser.createContext({
      ...devices['iPhone 12'],
    });

    const page = await context.newPage();
    await page.goto('http://localhost:3000/');

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    await context.close();
  });

  test('should work on Pixel 5', async ({ browser }) => {
    const context = await browser.createContext({
      ...devices['Pixel 5'],
    });

    const page = await context.newPage();
    await page.goto('http://localhost:3000/');

    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();

    await context.close();
  });
});
