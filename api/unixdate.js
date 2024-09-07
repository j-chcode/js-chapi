const unixdate = (request) => {
  
  if (!request) {
    return {
      status: 400,
      error: "timestamp Parametresi eksik"
    }
  }

  const timestamp = parseInt(request)
  if (isNaN(timestamp)) {
    return {
      status: 400,
      error: "Geçerli bir timestamp değeri girin."
    }
  }

  const date = new Date(timestamp * 1000);
  const dateString = date.toISOString().replace('T', '+').split('.')[0];

  return {
    status: 200,
    result: dateString
  }
}

module.exports = unixdate;