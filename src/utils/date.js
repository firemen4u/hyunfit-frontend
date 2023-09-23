// 2023년 1월 1일 오전 09:00
const timestampToFullDate = dateString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}

const formatDateWithOptions = (dateString, options) => {
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}

export default {
  timestampToFullDate,
  formatDateWithOptions,
}
