function filterNameOf(code) {
  switch (code) {
    case 200:
      return '퍼스널 트레이닝(PT)'
    case 201:
      return '필라테스'
    case 202:
      return '요가'
    case 300:
      return '성별: 남자'
    case 301:
      return '성별: 여자'
    case 302:
      return '성별: 상관없음'
  }
}

function filterCodeToGenderNum(code) {
  switch (code) {
    case 300:
      return 0
    case 301:
      return 1
    case 302:
      return null
  }
}

export default {
  filterNameOf,
  filterCodeToGenderNum,
}
