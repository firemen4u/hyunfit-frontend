const TrnDetailDateUtils = {
  toDateFromDateAndTimeStr: (dateObj, timeStr) => {
    let parsedTime = timeStr.split(':')
    const combinedDatetime = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      dateObj.getDate(),
      parseInt(parsedTime[0]),
      parseInt(parsedTime[1]),
      0
    )
    return combinedDatetime
  },
  formattedDatetime: datetime => {
    if (datetime == null) return null
    return (
      datetime.toLocaleDateString('ko', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
      }) + ' 예약하기'
    )
  },
}

export default TrnDetailDateUtils
