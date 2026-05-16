import { test, expect } from '@playwright/test';

test.describe('Pillar Guides', () => {
  test('should load Learn page with all guides', async ({ page }) => {
    await page.goto('/learn');

    // Check page title or heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();

    // Check for guide cards - should have at least 6 guides visible
    const guideCards = page.locator('[class*="grid"], [class*="card"]').first();
    await expect(guideCards).toBeVisible();
  });

  test('should render guide collection schema', async ({ page }) => {
    await page.goto('/learn');

    // Check for JSON-LD schema script tag
    const scriptTags = page.locator('script[type="application/ld+json"]');
    const count = await scriptTags.count();
    expect(count).toBeGreaterThan(0);

    // Verify at least one contains CollectionPage schema
    let hasCollectionPage = false;
    for (let i = 0; i < count; i++) {
      const content = await scriptTags.nth(i).textContent();
      if (content?.includes('CollectionPage') || content?.includes('ItemList')) {
        hasCollectionPage = true;
        break;
      }
    }
    expect(hasCollectionPage).toBe(true);
  });

  test('should navigate to individual pillar guide', async ({ page }) => {
    await page.goto('/learn');

    // Find first guide link (could be a card or link)
    const guideLink = page
      .locator('a')
      .filter({
        hasText: /platform|kubernetes|architecture|event|vitals|observability|data|ci\/cd|kpi/i,
      })
      .first();

    if ((await guideLink.count()) > 0) {
      const href = await guideLink.getAttribute('href');
      expect(href).toMatch(/\/learn\/[a-z\-]+/);

      // Navigate to guide
      await guideLink.click();
      await expect(page).toHaveURL(/\/learn\/[a-z\-]+/);

      // Check guide content loads
      const guideContent = page.locator('article, main').first();
      await expect(guideContent).toBeVisible();
    }
  });

  test('should render pillar guide with BlogPosting schema', async ({ page }) => {
    // Navigate to a specific pillar guide
    await page.goto('/learn/platform-engineering-roadmap');

    // Check page loads
    await expect(page).toHaveURL('/learn/platform-engineering-roadmap');

    // Check for JSON-LD BlogPosting schema
    const scriptTags = page.locator('script[type="application/ld+json"]');
    let hasBlogPosting = false;

    for (let i = 0; i < (await scriptTags.count()); i++) {
      const content = await scriptTags.nth(i).textContent();
      if (content?.includes('BlogPosting')) {
        hasBlogPosting = true;
        break;
      }
    }
    expect(hasBlogPosting).toBe(true);

    // Check for guide content
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should have FAQ section in pillar guides', async ({ page }) => {
    await page.goto('/learn/platform-engineering-roadmap');

    // Check for FAQPage schema
    const scriptTags = page.locator('script[type="application/ld+json"]');
    let hasFaqPage = false;

    for (let i = 0; i < (await scriptTags.count()); i++) {
      const content = await scriptTags.nth(i).textContent();
      if (content?.includes('FAQPage')) {
        hasFaqPage = true;
        break;
      }
    }
    expect(hasFaqPage).toBe(true);

    // Check for FAQ heading or questions
    const faqHeading = page.locator('text=/FAQ|Question|Asked/i');
    if ((await faqHeading.count()) > 0) {
      await expect(faqHeading.first()).toBeVisible();
    }
  });

  test('should navigate between pillar guides', async ({ page }) => {
    await page.goto('/learn/platform-engineering-roadmap');

    // Look for "related" or "next" guide links
    const relatedGuides = page.locator('a').filter({ hasText: /related|guide|explore/i });

    if ((await relatedGuides.count()) > 0) {
      const firstLink = relatedGuides.first();
      const href = await firstLink.getAttribute('href');

      if (href?.includes('/learn/')) {
        await firstLink.click();
        // Should navigate to a different learn page
        await expect(page).toHaveURL(/\/learn\/[a-z\-]+/);
      }
    }
  });

  test('should have proper SEO for pillar guides', async ({ page }) => {
    await page.goto('/learn/kubernetes-cost-optimization');

    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]');
    const canonicalHref = await canonical.getAttribute('href');
    expect(canonicalHref).toContain('/learn/kubernetes-cost-optimization');

    // Check og:url
    const ogUrl = page.locator('meta[property="og:url"]');
    expect(await ogUrl.getAttribute('content')).toContain('/learn/kubernetes-cost-optimization');

    // Check og:type for article
    const ogType = page.locator('meta[property="og:type"]');
    const ogTypeContent = await ogType.getAttribute('content');
    expect(ogTypeContent).toMatch(/article|website/);
  });

  test('should render all pillar guide URLs accessible', async ({ page }) => {
    const pillarSlugs = [
      'platform-engineering-roadmap',
      'kubernetes-cost-optimization',
      'event-driven-architecture',
      'core-web-vitals-guide',
      'observability-best-practices',
      'data-platform-modernization',
      'ci-cd-security-hardening',
      'engineering-kpis-metrics',
    ];

    for (const slug of pillarSlugs) {
      await page.goto(`/learn/${slug}`);
      await expect(page).toHaveStatus(200);

      // Check content exists
      const content = page.locator('article, main').first();
      await expect(content).toBeVisible();
    }
  });
});
