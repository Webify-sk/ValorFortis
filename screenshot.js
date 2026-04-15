const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    // Wait a bit for the video to play
    await page.waitForTimeout(2000);

    // Hide UI elements we don't want in the fallback background
    await page.evaluate(() => {
        const hideSelectors = ['header', '.hero-content', '.burger-menu'];
        hideSelectors.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.style.display = 'none';
        });
    });

    // Take the screenshot
    await page.screenshot({ path: 'hero-fallback.jpg', quality: 80, type: 'jpeg' });

    await browser.close();
})();
