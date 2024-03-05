const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--disable-setuid-sandbox', '--no-sandbox'] });
  const page = await browser.newPage();

  // Przechwytywanie komunikatów konsoli
  page.on('console', consoleMessage => {
    if (consoleMessage.text() === 'Dane zostały zapisane.') {
      page.evaluate(() => window.chartRendered = true);
    }
  });

  // Funkcja do wykonania iteracji dla danego przycisku i URL
  async function performClicks(url, buttonId) {
    for (let i = 0; i < 100; i++) {
      await page.goto(url, { waitUntil: 'networkidle0', cache: 'no-cache' });

      if (typeof page.clearBrowserCache === 'function') {
        await page.clearBrowserCache();
      }

      await page.evaluate(() => window.chartRendered = false);
      await page.click(buttonId);

      await page.waitForFunction(() => window.chartRendered);
      console.log(`Iteracja ${i + 1} dla ${url} i przycisku ${buttonId} zakończona.`);
      await page.waitForTimeout(1000);
    }
  }

  // Lista URL
  const urls = [
    'http://localhost/magisterka/chart.js/chart-js2.html',
    'http://localhost/magisterka/chart.js/warstwowy/chart-js2.html',
    'http://localhost/magisterka/chart.js/punktowy/chart-js2.html',
    'http://localhost/magisterka/chart.js/babelkowy/chart-js2.html',
  ];

  // Lista przycisków
  const buttons = ['#btn10', '#btn10', '#btn1000', '#btn10000', '#btn100000'];
  

  // Wykonanie iteracji dla każdego URL i każdego przycisku
  for (const url of urls) {
    for (const button of buttons) {
      await performClicks(url, button);
    }
  }

  await browser.close();
})();