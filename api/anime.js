const anime = async (type, tag, amount) => {
  const axios = require('axios');
  
  try {
    let imageUrl = [];
    let len = 0;
    let aMMo = amount;
    if(!amount) aMMo = 1;
    
    for(let i = 0; i < aMMo; i++) {
      const response = await axios.get(`https://api.waifu.pics/${type}/${tag}`)
      imageUrl[len] = response.data.url; len++
    }

    return {
      status: 200,
      imageUrl
    }
  }
  catch (error) {
    return {
      status: 400,
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
      string: error.message
    }
  }
}

module.exports = anime;
