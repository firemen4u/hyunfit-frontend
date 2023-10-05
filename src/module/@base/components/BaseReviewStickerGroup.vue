<script setup>
import ReviewConst from '@/module/@base/stores/reviewConst'

const props = defineProps({
  stickers: String,
})

import { BaseLabel } from '@/module/@base/components'
import { computed, ref } from 'vue'

const currentSize = ref(3)
const size = ref(ReviewConst.parse(props.stickers).length)

const stickerSlice = computed(() => {
  let s = ReviewConst.parse(props.stickers)
  return s.slice(0, currentSize.value)
})
</script>

<template>
  <div class="review-label-container flex flex-wrap gap-y-2">
    <BaseLabel v-for="sticker in stickerSlice" :key="sticker" class="mr-1">
      <div class="flex justify-center items-center px-1 py-0.5">
        <img class="h-4 w-4 mr-1" :src="ReviewConst.getIcon(sticker)" alt="" />
        <div>{{ ReviewConst.getContent(sticker) }}</div>
      </div>
    </BaseLabel>
    <BaseLabel
      @click="currentSize = size"
      v-if="currentSize < size"
      class="mr-1 cursor-default"
    >
      +{{ size - currentSize }}
    </BaseLabel>
  </div>
</template>

<style scoped></style>
