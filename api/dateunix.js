const dateunix = (request) => {
  function convertToTimestamp(dateString) {
    const [datePart, timePart] = dateString.split('-');
    const [day, month, year] = datePart.split('.');
    const [hours, minutes, seconds] = timePart.split(':');

    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
    return date.getTime() / 1000;
  }

  if (!request) {
        return { status: 500, error: 'Tarih belirtilmedi.' }
    }

    try {
        const timestamp = convertToTimestamp(request);
        return { timestamp }
    } catch (error) {
        return { status: 500, error: 'Tarihi dönüştürürken hata oluştu.' }
    }
}

module.exports = dateunix;
