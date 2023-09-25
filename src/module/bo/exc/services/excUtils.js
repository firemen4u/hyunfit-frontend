const excAreaMapping = {
  1: '광배근',
  2: '기립근',
  3: '대퇴사두',
  4: '대흉근',
  5: '둔근',
  6: '삼두',
  7: '승모근',
  8: '이두근',
  9: '전면어깨',
  10: '측면어깨',
  11: '코어',
  12: '햄스트링',
  13: '후면어깨',
}

const mapExcAreaType = type => {
  return excAreaMapping[type] || '-'
}
const excTypeMapping = {
  1: '상체',
  2: '하체',
  3: '전신',
  4: '유산소',
}

const mapExcType = type => {
  return excTypeMapping[type] || '-'
}

const excDifficultyMapping = {
  1: '초급',
  2: '초중급',
  3: '중급',
  4: '중상급',
  5: '상급',
}

const mapDifficultyType = type => {
  return excDifficultyMapping[type] || '-'
}

export default {
  mapExcAreaType,
  excAreaMapping,
  mapExcType,
  mapDifficultyType,
}
