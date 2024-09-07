const axios = require('axios');
const cheerio = require('cheerio');

const zerochan = async () => {
  const url = 'https://www.zerochan.net/Horo';

  async function fetchImages() {
    try {
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(data);
      let imageUrls = [];

      $('img').each((index, element) => {
        const imgUrl = $(element).attr('src');
        if (imgUrl && imgUrl.includes('static.zerochan.net') && imgUrl.includes('full')) {
          imageUrls.push(imgUrl);
        }
      });

      return imageUrls;
    } catch (error) {
      console.error('Hata:', error);
      return [];
    }
  }

  const data = await fetchImages();
  return { data };
}

module.exports = zerochan;
