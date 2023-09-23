function formatDateYYYYMM(date) {
  return date.toISOString().slice(0, 7)
}
function adjustMonth(date, increment) {
  date.setMonth(date.getMonth() + increment)
  return new Date(date)
}

function timestampToFullDate(timestamp) {
  return new Date(parseInt(timestamp)).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default {
  adjustMonth,
  formatDateYYYYMM,
  timestampToFullDate,
}
