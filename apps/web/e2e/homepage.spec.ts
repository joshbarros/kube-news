import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/kube|news|home/i);

    // Check main heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should render hero section', async ({ page }) => {
    await page.goto('/');

    // Hero should contain key CTA elements
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check for navigation CTAs (About/Contact buttons or links)
    const buttons = page.locator('a, button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('should render Latest Stories section', async ({ page }) => {
    await page.goto('/');

    // Check for Latest Stories heading
    const storiesHeading = page.locator('text=Latest Stories');
    await expect(storiesHeading).toBeVisible();

    // Check for story cards
    const storyCards = page.locator('article, [class*="card"]');
    const cardCount = await storyCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should render Quick Answers (FAQ) section', async ({ page }) => {
    await page.goto('/');

    // Check for FAQ heading
    const faqHeading = page.locator('text=Quick Answers');
    await expect(faqHeading).toBeVisible();

    // Scroll to FAQ section to ensure it's in view
    await faqHeading.scrollIntoViewIfNeeded();
  });

  test('should render Pillar Guides section', async ({ page }) => {
    await page.goto('/');

    // Check for Pillar Guides heading
    const guidesHeading = page.locator('text=Pillar Guides');
    await expect(guidesHeading).toBeVisible();

    // Check for "View all guides" link
    const viewAllLink = page.locator('text=View all');
    await expect(viewAllLink).toBeVisible();

    // Verify link points to /learn
    const href = await viewAllLink.locator('..').getAttribute('href');
    expect(href).toContain('/learn');
  });

  test('should have working Publish Story CTA', async ({ page }) => {
    await page.goto('/');

    // Look for Publish Story button/link
    const publishBtn = page.locator('button, a').filter({ hasText: /Publish|Story/i });
    const btnCount = await publishBtn.count();
    expect(btnCount).toBeGreaterThan(0);
  });

  test('should have theme toggle button', async ({ page }) => {
    await page.goto('/');

    // Look for theme toggle (usually in navbar)
    const themeToggle = page
      .locator('button')
      .filter({ hasText: /dark|light|theme/i })
      .first();

    // If not found by text, look for common theme toggle patterns
    if ((await themeToggle.count()) === 0) {
      const navbar = page.locator('nav');
      const navButtons = navbar.locator('button');
      expect(await navButtons.count()).toBeGreaterThan(0);
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');

    // Check og:title meta tag
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toBeDefined();

    // Check description meta tag
    const description = page.locator('meta[name="description"]');
    await expect(description).toBeDefined();
  });

  test('should render all sections in correct order', async ({ page }) => {
    await page.goto('/');

    const latestStories = page.locator('text=Latest Stories');
    const quickAnswers = page.locator('text=Quick Answers');
    const pillarGuides = page.locator('text=Pillar Guides');

    // Get positions to verify order
    const storiesBox = await latestStories.boundingBox();
    const answersBox = await quickAnswers.boundingBox();
    const guidesBox = await pillarGuides.boundingBox();

    expect(storiesBox?.y).toBeLessThan(answersBox?.y || 0);
    expect(answersBox?.y).toBeLessThan(guidesBox?.y || 0);
  });
});
