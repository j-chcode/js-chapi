const formtime = (start, end) => {
  const startTimestamp = start;
  const endTimestamp = end;

  if (!startTimestamp || !endTimestamp) {
    return {
      status: 400,
      error: "Lütfen başlangıç ve bitiş timestamp değerlerini girin."
    };
  }

  const startDate = new Date(startTimestamp * 1000);
  const endDate = new Date(endTimestamp * 1000);
  const timeDifference = endDate - startDate;

  if (timeDifference < 0) {
    return {
      status: 400,
      error: "Bitiş zamanı başlangıç zamanından önce olamaz."
    };
  }

  // Toplam saniyeyi hesapla
  const totalSeconds = Math.floor(timeDifference / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // Sonucu formatla
  let formattedResult = '';

  if (days >= 1) {
    formattedResult += `${days}D `;
  }

  if (hours >= 1) {
    formattedResult += `${hours}H `;
  }

  if (minutes >= 1) {
    formattedResult += `${minutes}M `;
  }

  if (seconds >= 1 || (days === 0 && hours === 0 && minutes === 0)) {
    formattedResult += `${seconds}S`;
  }

  return {
    status: 200,
    result: formattedResult.trim()  // Fazladan boşlukları sil
  };
};

module.exports = formtime;
