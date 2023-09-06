<template>
  <!-- <div class="base-card-container my-4 p-4 shadow-lg rounded-lg" :class="color">
    <slot></slot>
  </div> -->
  <div class="rounded-lg overflow-hidden shadow-md my-3" :class="color">
    <img v-if="coverSrc" class="w-full h-24 object-cover" :src="coverSrc" />
    <div class="px-2 pb-2" :class="coverSrc ? 'pt-1' : 'pt-2'">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  color: String,
  coverSrc: String,
})
</script>
<style scoped>
.base-card-container {
  height: 22vh;
  width: 22vh;
  max-height: 400px;
  max-width: 400px;
}
</style>
