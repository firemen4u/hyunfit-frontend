<script setup>
import { FullStarSvg } from '@/module/@base/svg'
const props = defineProps({
  rating: Number,
  reviewCount: Number,
  iconSize: Number,
  fontSize: String,
  countSize: {
    type: Number,
    default: 12,
  },
})

function fontSizeOf(size) {
  return 'text-' + size
}
function getCountSize() {
  return { 'font-size': `${props.countSize}px` }
}
</script>

<template>
  <div class="flex items-center">
    <FullStarSvg :size="iconSize" class="mr-0.5" />
    <div class="flex items-baseline mt-0.5">
      <span class="block font-extrabold ml-0.5" :class="fontSizeOf(fontSize)">
        {{ rating?.toFixed(1) }}
      </span>
      <div
        v-if="reviewCount"
        class="ml-0.5 text-gray-500"
        :style="getCountSize()"
      >
        ({{ reviewCount }})
      </div>
    </div>
  </div>
</template>

<style scoped></style>
