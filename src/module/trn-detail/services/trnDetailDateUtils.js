function toDateFromDateAndTimeStr(dateObj, timeStr) {
  let parsedTime = timeStr.split(':')
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    parseInt(parsedTime[0]),
    parseInt(parsedTime[1]),
    0
  )
}
function formattedDatetime(datetime) {
  if (datetime == null) return null
  return (
    datetime.toLocaleDateString('ko', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    }) + ' 예약하기'
  )
}
function toRequestDateTime(date) {
  if (date == null) return null
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Add 1 to month because it's zero-based
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
function toReservedDaysSearchDTO(date) {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 0)
  const startDate = new Date(startOfMonth.getTime() - 14 * 24 * 60 * 60 * 1000)
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const endDate = new Date(endOfMonth.getTime() + 14 * 24 * 60 * 60 * 1000)
  return toSearchDTO(startDate, endDate)
}
function toTimeslotSearchDTO(date) {
  const startDate = new Date(date)
  const endDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 999)
  return toSearchDTO(startDate, endDate)
}

function toSearchDTO(startDate, endDate) {
  return {
    startDate: toRequestDateTime(startDate),
    endDate: toRequestDateTime(endDate),
  }
}
function padDateString(dateString) {
  const parts = dateString.split('-')
  if (parts.length !== 3) {
    return 'Invalid date format'
  }
  const year = parts[0]
  const month = parts[1]
  const day = parts[2]

  const paddedMonth = month.padStart(2, '0')
  const paddedDay = day.padStart(2, '0')

  return `${year}-${paddedMonth}-${paddedDay}`
}

export default {
  formattedDatetime,
  padDateString,
  toDateFromDateAndTimeStr,
  toReservedDaysSearchDTO,
  toTimeslotSearchDTO,
  toSearchDTO,
}
