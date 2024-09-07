const retime = (data) => {
	const targetTime = data;

  if (!targetTime) {
    return { 
	  status: 400,
	  error: "Lütfen bir saat formatı girin. Örnek: '23:00'"
	}
  }

  const now = new Date();
  const [hours, minutes] = targetTime.split(':');
  const targetDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (targetDateTime < now) {
    targetDateTime.setDate(targetDateTime.getDate() + 1);
  }

  const timeDifference = targetDateTime - now;
  const remainingSeconds = Math.floor(timeDifference / 1000);

  return {
	status: 200,
    result: remainingSeconds 
  }
}

module.exports = retime;
