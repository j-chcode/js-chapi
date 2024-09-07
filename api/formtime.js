const formtime = (start, end) => {
  const startTimestamp = start;
  const endTimestamp = end;

  if (!startTimestamp || !endTimestamp) {
    return {
      status: 400,
      error: "Lütfen başlangıç ve bitiş timestamp değerlerini girin."
    }
  }

  const startDate = new Date(startTimestamp * 1000);
  const endDate = new Date(endTimestamp * 1000);
  const timeDifference = endDate - startDate;

  if (timeDifference < 0) {
    return {
      status: 400,
      error: "Bitiş zamanı başlangıç zamanından önce olamaz."
    }
  }
  
  // Toplam saniyeyi hesapla
  const totalSeconds = Math.floor(timeDifference / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // Sonucu formatla
  const formattedResult = `${hours}H ${minutes}M ${seconds}S`;

  return { 
    status: 200,
    result: formattedResult
  }
}

module.exports = formtime;
