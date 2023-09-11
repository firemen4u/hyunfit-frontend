<template>
  <div
    class="my-video bg-orange-200"
    :class="props.myVideoStatus.value === 1 ? 'w-full' : 'w-1/2'"
  ></div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  myVideoStatus: Number,
})

console.log(props.myVideoStatus.value)
</script>
<style scoped></style>
