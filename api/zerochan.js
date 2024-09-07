const zerochan = async () => {
  const url = 'https://www.zerochan.net';
  
  async function fetchImages() {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      let imageUrls = [];

      $('img').each((index, element) => {
        const imgUrl = $(element).attr('src');
        if (imgUrl) {
          imageUrls.push(imgUrl);
        }
      });
      
    return imageUrls;
    } catch (error) {
      console.error('Hata:', error);
    }
  }

  const data = await fetchImages();
  return {
    data
  }
}

module.exports = zerochan;
