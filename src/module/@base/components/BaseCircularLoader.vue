<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: Boolean,
  size: Number,
})

const slotWrapper = ref(null)
const progressLoaderWrapper = ref(null)
</script>

<template>
  <div
    v-show="loading"
    class="flex items-center justify-center"
    ref="progressLoaderWrapper"
    :style="{
      height: slotWrapper?.clientHeight + 'px',
      width: slotWrapper?.clientWidth + 'px',
    }"
  >
    <v-progress-circular indeterminate color="primary" :size="size" />
  </div>
  <div v-show="!loading" ref="slotWrapper">
    <slot></slot>
  </div>
</template>

<style scoped></style>
