<script setup>
import ReviewConst from '@/module/@base/stores/reviewConst'

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
import reviewConst from '@/module/@base/stores/reviewConst'
</script>

<template>
  <div class="review-label-container flex flex-wrap gap-y-2">
    <BaseLabel
      v-for="sticker in ReviewConst.parse(stickers)"
      :key="sticker"
      class="mr-1"
    >
      <div class="flex justify-center items-center px-1 py-0.5">
        <img class="h-4 w-4 mr-1" :src="ReviewConst.getIcon(sticker)" alt="" />
        <div>{{ ReviewConst.getContent(sticker) }}</div>
      </div>
    </BaseLabel>
  </div>
</template>

<style scoped></style>
