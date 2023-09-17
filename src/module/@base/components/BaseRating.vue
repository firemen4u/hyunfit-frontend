<template>
  <v-rating
    v-if="!compact"
    class="text-center"
    :empty-icon="EmptyStarSvg"
    :half-icon="HalfStarSvg"
    :full-icon="FullStarSvg"
    half-increments
    :size="iconSizeOf(iconSize)"
    hover
    :readonly="props.readonly"
    density="compact"
  >
  </v-rating>
</template>
<script setup>
import { EmptyStarSvg, FullStarSvg, HalfStarSvg } from '@/module/@base/svg'

const props = defineProps({
  compact: Boolean,
  iconSize: String,
  fontSize: String,
  readonly: Boolean,
})

let fontSize = props.fontSize ? props.fontSize : 'text-lg'
//
// const emit = defineEmits(['update:rating'])
// const internalRating = ref(props.rating)
// const starValue = computed({
//   get: () => internalRating.value,
//   set: newValue => {
//     internalRating.value = newValue
//     emit('update:rating', newValue)
//   },
// })
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
<style>
.v-rating__wrapper {
  margin-right: 3px;
}
</style>
