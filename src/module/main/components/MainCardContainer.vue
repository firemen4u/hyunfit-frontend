<script setup>
const props = defineProps({
  size: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="h-[356px] rounded-xl flex justify-center items-center overflow-hidden"

    :style="{ backgroundColor: props.color }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  backdrop-filter: blur(10px);
}
</style>
