const splitter = (text, separator, index) => {
  const result = text.split(separator);
  const arrayCount = result.length;
  
  let choose = "";
  let statusCode = 200;
  let url = "";
  
  if(!result[index]) {
    choose = "Belirtilen index değerinde dizin yok.";
    statusCode = 400;
  } else {
    choose = result[index];
  }
  
  url = `https://apich.vercel.app/api/splitter?text=${text}&separator=${separator}&index=${index}`;

  return {
    status: statusCode,
    arrayCount,
    index,
    choose,
    url,
    result
	}
}

module.exports = splitter;
