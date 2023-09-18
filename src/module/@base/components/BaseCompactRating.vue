<script setup>
import { FullStarSvg } from '@/module/@base/svg'
import { ref } from 'vue'
const props = defineProps({
  rating: Number,
  reviewCount: Number,
  iconSize: String,
  fontSize: String,
})
const ratingValue = ref(props.rating)
function iconSizeOf(size) {
  let vSize = ''
  if (size === 'xs') {
    vSize = 'x-small'
  } else if (size === 'sm') {
    vSize = 'small'
  } else if (size === 'lg') {
    vSize = 'large'
  } else if (size === 'xl') {
    vSize = 'x-large'
  }
  return vSize
}
function fontSizeOf(size) {
  return 'text-' + size
}
</script>

<template>
  <div class="flex">
    <v-rating
      v-model="ratingValue"
      model-value="1"
      :full-icon="FullStarSvg"
      length="1"
      readonly
      :size="iconSizeOf(iconSize)"
      density="compact"
    >
    </v-rating>
    <div
      class="rating-value-wrapper font-extrabold self-center ml-0.5"
      :class="fontSizeOf(fontSize)"
    >
      {{ rating }}
    </div>
    <div class="text-gray-400 font-thin text-xxs self-end ml-0.5 mb-1">
      ({{ reviewCount }})
    </div>
  </div>
</template>

<style scoped></style>
