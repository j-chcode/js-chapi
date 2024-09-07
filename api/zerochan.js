const puppeteer = require('puppeteer');

const zerochan = async () => {
  const url = 'https://www.zerochan.net/Horo';
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  const imageUrls = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .map(img => img.src)
      .filter(src => src.includes('static.zerochan.net') && src.includes('full'));
  });

  await browser.close();

  return { data: imageUrls };
};

module.exports = zerochan;
