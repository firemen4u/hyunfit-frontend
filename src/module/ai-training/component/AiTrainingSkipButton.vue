<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <div class="fixed z-[999] bottom-0 right-0">
    <v-btn @click="emit('click')">
      <div class="skip-text font-extrabold">Skip 다음</div>
    </v-btn>
  </div>
</template>

<style scoped></style>
