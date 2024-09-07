const anime = async (type, tag) => {
  const axios = require('axios');
  
	try {

    const response = await axios.get(`https://api.waifu.pics/${type}/${tag}`);
    const imageUrl = response.data.url;

    return {
      status: 200,
      imageUrl
    }

  } catch (error) {

    return {
      status: 400,
      error: "Bir hata oluştu. Lütfen tekrar deneyin."
      string: error.message
    }

  }
}

module.exports = anime;
