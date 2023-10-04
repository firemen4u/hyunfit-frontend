<script setup>
const props = defineProps({
  loading: Boolean,
  size: Number,
})
</script>

<template>
  <div v-show="loading" class="flex h-full w-full items-center justify-center">
    <v-progress-circular indeterminate color="primary" :size="size" />
  </div>
  <div v-show="!loading">
    <slot></slot>
  </div>
</template>

<style scoped></style>
