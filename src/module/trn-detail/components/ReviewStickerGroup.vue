<script setup>
defineProps({
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
      return '열정적이에요'
    case 3:
      return '재미있어요'
    case 4:
      return '설명을 잘 해줘요'
  }
}
function parseStickers(stickers) {
  return stickers.split(',').map(str => parseInt(str.trim(), 10))
}
</script>

<template>
  <div class="review-label-container flex">
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
