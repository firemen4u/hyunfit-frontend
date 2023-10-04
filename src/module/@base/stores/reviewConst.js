import { FILE_SERVER_HYUNFIT_URL } from '@/config'
const requests = [
  '운동이 처음이에요',
  '살을 빼고 싶어요',
  '허리가 자주 아파요',
  '부상 이력이 있어요',
  '식단 조언도 함께 받고 싶어요',
]
const reviews = [
  {
    category: '',
    content: '침착하게 알려주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-0.png`,
  },
  {
    category: '',
    content: '친절하게 상담해주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-1.png`,
  },
  {
    category: '',
    content: '비용이 합리적이에요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-2.png`,
  },
  {
    category: '',
    content: '디테일하게 가르쳐주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-3.png`,
  },
  {
    category: '',
    content: '기초를 차근차근 잘 알려주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-4.png`,
  },
  {
    category: '',
    content: '포인트를 정확히 짚어 가르쳐주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-5.png`,
  },
  {
    category: '',
    content: '이해하기 쉽게 설명해주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-6.png`,
  },
  {
    category: '',
    content: '눈높이에 맞춰 가르쳐주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-7.png`,
  },
  {
    category: '',
    content: '차분하고 편안한 분위기로 알려주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-8.png`,
  },
  {
    category: '',
    content: '커리큘럼이 체계적이에요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-9.png`,
  },
  {
    category: '',
    content: '맞춤형으로 진행해주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-10.png`,
  },
  {
    category: '',
    content: '열정적으로 가르쳐주세요',
    icon: `${FILE_SERVER_HYUNFIT_URL}/review-icon-11.png`,
  },
]
function parse(stickers) {
  if (!stickers) return []
  return stickers.split(',').map(str => parseInt(str.trim(), 10))
}

function getIcon(i) {
  console.log(i)
  return reviews[i].icon
}
function getContent(i) {
  console.log(i)
  return reviews[i].content
}
function getCategory(i) {
  return reviews[i].category
}
export default { reviews, requests, getIcon, getCategory, getContent, parse }

// 친절하게 상담해주세요
// 비용이 합리적이에요
// 디테일한 부분까지 상세히 알려주세요
// 기초부터 차근차근 가르쳐주세요
// 포인트를 정확히 짚어 가르쳐주세요
// 이해하기 쉽게 설명해주세요
// 눈높이에 맞춰 친절하게 가르쳐주세요
// 차분하고 편안한 분위기로 알려주세요
// 커리큘럼이 체계적이에요
// 맞춤형으로 진행해주세요
// 경험이 많고 설명을 자세하게 해주세요
// 열정적으로 디테일한 부분까지 알려주세요
