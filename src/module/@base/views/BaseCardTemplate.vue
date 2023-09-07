<template>
  <!-- <div class="base-card-container my-4 p-4 shadow-lg rounded-lg" :class="color">
    <slot></slot>
  </div> -->
  <div class="rounded-lg overflow-hidden shadow-md my-3" :class="color">
    <img
      v-if="coverSrc"
      class="w-full object-cover"
      :src="coverSrc"
      :class="height"
    />
    <div class="px-2 pb-2" :class="coverSrc ? 'pt-1' : 'pt-2'">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  color: String,
  coverSrc: String,
  size: String,
})

let height
if (props.size === 'lg') {
  height = 'h-40'
} else if (props.size === 'md') {
  height = 'h-32'
} else {
  height = 'h-24'
}
</script>
<style scoped></style>
