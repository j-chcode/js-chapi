const calculate = (data) => {
  
  try {
    let calc = eval(data);
    const result = calc.toFixed(4);
    
    if(data == undefined) {
      return {
        status: 400,
        error: "Invalid post body"
      }
    }
    
    return {
      status: 200,
      result
    }
  }
  catch(err) {
    return {
      status: 400,
      error: err.message
    }
  }
  
}

module.exports = calculate;