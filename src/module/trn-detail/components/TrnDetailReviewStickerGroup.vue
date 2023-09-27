<script setup>
const props = defineProps({
  stickers: String,
})

import { BaseLabel } from '@/module/@base/components'
import {
  DumbbellSvg,
  FullStarSvg,
  HalfStarSvg,
  HeartSvg,
} from '@/module/@base/svg'

function getIconType(sticker) {
  switch (sticker) {
    case 1:
      return FullStarSvg
    case 2:
      return HalfStarSvg
    case 3:
      return DumbbellSvg
    case 4:
      return HeartSvg
    case 5:
      return HeartSvg
    case 6:
      return HeartSvg
    case 7:
      return HeartSvg
    case 8:
      return HeartSvg
    case 9:
      return HeartSvg
    case 10:
      return HeartSvg
    case 11:
      return HeartSvg
    case 12:
      return HeartSvg
  }
}
function getStickerContent(sticker) {
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
  switch (sticker) {
    case 1:
      return '친절해요'
    case 2:
      return '비용이 합리적이에요'
    case 3:
      return '디테일하게 가르쳐주세요'
    case 4:
      return '기초를 배우고 싶어요'
    case 5:
      return '중요한 포인트만 배우고 싶어요'
    case 6:
      return '이해하기 쉽게 설명해주세요'
    case 7:
      return '눈높이에 맞춰 가르쳐주세요'
    case 8:
      return '편안한 분위기가 좋아요'
    case 9:
      return '체계적인 커리큘럼이 좋아요'
    case 10:
      return '맞춤형으로 진행해주세요'
    case 11:
      return '자세한 설명이 필요해요'
    case 12:
      return '열정적으로 가르쳐주세요'
  }
}
function parseStickers(stickers) {
  return stickers.split(',').map(str => parseInt(str.trim(), 10))
}
</script>

<template>
  <div class="review-label-container flex flex-wrap gap-y-2">
    <BaseLabel
      v-for="(sticker, i) in parseStickers(stickers)"
      :key="i"
      class="mr-1"
    >
      <div class="flex items-center px-1 py-0.5">
        <component
          :is="getIconType(sticker)"
          :size="14"
          class="mr-1"
        ></component>
        <div>{{ getStickerContent(sticker) }}</div>
      </div>
    </BaseLabel>
  </div>
</template>

<style scoped></style>
