<script setup>
import { FullStarSvg } from '@/module/@base/svg'
const props = defineProps({
  rating: Number,
  reviewCount: Number,
  iconSize: Number,
  fontSize: String,
})

function fontSizeOf(size) {
  return 'text-' + size
}
</script>

<template>
  <div class="flex items-center">
    <FullStarSvg :size="iconSize" class="mr-0.5" />
    <div class="flex items-baseline mt-0.5">
      <span class="block font-extrabold ml-0.5" :class="fontSizeOf(fontSize)">
        {{ rating }}
      </span>
      <div class="text-gray-400 font-thin text-xxs">({{ reviewCount }})</div>
    </div>
  </div>
</template>

<style scoped></style>
