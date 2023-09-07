<template>
  <div v-if="!compact" class="flex">
    <StarSvg
      v-for="i in 5"
      :key="i"
      :size="starSize"
      class="self-center"
    ></StarSvg>
  </div>
  <div v-if="compact" class="flex">
    <StarSvg :size="starSize" class="self-center"></StarSvg>
    <div class="rating-value-wrapper font-extrabold text-lg self-center ml-0.5">
      {{ rating }}
    </div>
    <div class="text-gray-400 font-thin text-xxs self-end ml-0.5 mb-1">
      ({{ reviewCount }})
    </div>
  </div>
</template>
<script setup>
import { StarSvg } from '@/module/@base/svg'
const props = defineProps({
  compact: Boolean,
  rating: Number,
  reviewCount: Number,
  size: Number,
})

let starSize = props.size ? props.size : 20
</script>
