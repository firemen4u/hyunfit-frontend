<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <div class="mb-10">
    <div class="title text-3xl font-black">
      {{ title }}
    </div>
    <div class="subtitle text-gray-500 text-sm mt-2">
      {{ subtitle }}
    </div>
  </div>
</template>

<style scoped></style>
