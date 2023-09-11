<template>
  <div v-if="!compact" class="flex">
    <div class="text-center">
      <v-rating
        v-model="starValue"
        :empty-icon="EmptyStarSvg"
        :half-icon="HalfStarSvg"
        :full-icon="FullStarSvg"
        half-increments
        :size="iconSizeOf(iconSize)"
        hover
        :readonly="props.readonly"
        density="compact"
        @update:model-value="
          newValue => {
            starValue = newValue
          }
        "
      >
      </v-rating>
    </div>
  </div>
  <div v-if="compact" class="flex">
    <v-rating
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
<script setup>
import { EmptyStarSvg, FullStarSvg, HalfStarSvg } from '@/module/@base/svg'
import { ref, computed } from 'vue'

const props = defineProps({
  compact: Boolean,
  rating: Number,
  reviewCount: Number,
  iconSize: String,
  fontSize: String,
  readonly: Boolean,
  onUpdate: Function,
})

let fontSize = props.fontSize ? props.fontSize : 'text-lg'

const emit = defineEmits(['update:rating'])
const internalRating = ref(props.rating)
const starValue = computed({
  get: () => internalRating.value,
  set: newValue => {
    internalRating.value = newValue
    emit('update:rating', newValue)
  },
})
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
