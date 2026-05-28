const puppeteer = require('puppeteer/dist/cjs/puppeteer/puppeteer.js');

describe('Credit Card Validator E2E', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should show success message for valid card', async () => {
    await page.type('#card-input', '49927398716');
    await page.click('#submit-btn');

    const successMessage = await page.waitForSelector('#result-message.success');
    expect(successMessage).toBeTruthy();
  });

  test('should show error message for invalid card', async () => {
    await page.click('#card-input', { clickCount: 3 });
    await page.type('#card-input', '49927398717');
    await page.click('#submit-btn');

    const errorMessage = await page.waitForSelector('#result-message.error');
    expect(errorMessage).toBeTruthy();
  });
});