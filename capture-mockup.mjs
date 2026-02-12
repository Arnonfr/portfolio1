import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3002/mockup-arabic-syntax.html', { waitUntil: 'networkidle0', timeout: 15000 });
await page.waitForSelector('.screen-main img', { timeout: 5000 });
await new Promise(r => setTimeout(r, 1500)); // let images fully render
await page.screenshot({ path: 'public/images/arabic-syntax-mockup.png', fullPage: false });
console.log('Screenshot saved to public/images/arabic-syntax-mockup.png');
await browser.close();
