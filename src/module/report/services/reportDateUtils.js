function formatDateYYYYMM(date) {
  return date.toISOString().slice(0, 7)
}
function adjustMonth(dateStr, increment) {
  const [year, month] = dateStr.split('-').map(Number)
  const date = new Date(year, month, 1)
  date.setMonth(date.getMonth() + increment)
  return date
}

export default {
  adjustMonth,
  formatDateYYYYMM,
}
