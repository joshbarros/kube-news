import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should render navbar with all links', async ({ page }) => {
    await page.goto('/');

    // Check navbar is visible
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    // Check all navigation links exist
    const homeLink = page.locator('a:has-text("Home")').first();
    const learnLink = page.locator('a:has-text("Learn")').first();
    const aboutLink = page.locator('a:has-text("About")').first();
    const contactLink = page.locator('a:has-text("Contact")').first();

    await expect(homeLink).toBeVisible();
    await expect(learnLink).toBeVisible();
    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test('should navigate to Learn page', async ({ page }) => {
    await page.goto('/');

    // Click Learn link
    const learnLink = page.locator('a:has-text("Learn")').first();
    await learnLink.click();

    // Verify we're on the learn page
    await expect(page).toHaveURL('/learn');
    await expect(page.locator('h1, h2').first()).toContainText(/pillar|guide/i);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');

    const aboutLink = page.locator('a:has-text("About")').first();
    await aboutLink.click();

    await expect(page).toHaveURL('/about');
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');

    const contactLink = page.locator('a:has-text("Contact")').first();
    await contactLink.click();

    await expect(page).toHaveURL('/contact');
  });

  test('should render footer with navigation links', async ({ page }) => {
    await page.goto('/');

    // Scroll to bottom to see footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer links
    const footerHomeLink = footer.locator('a:has-text("Home")').first();
    const footerLearnLink = footer.locator('a:has-text("Learn")').first();

    await expect(footerHomeLink).toBeVisible();
    await expect(footerLearnLink).toBeVisible();
  });

  test('should navigate back to home from Learn page', async ({ page }) => {
    await page.goto('/learn');

    // Click home link
    const homeLink = page
      .locator('a')
      .filter({ hasText: /^Home$/ })
      .first();
    await homeLink.click();

    await expect(page).toHaveURL('/');
  });
});
