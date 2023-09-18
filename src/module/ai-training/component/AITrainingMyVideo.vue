<template>
  <div
    class="my-video bg-orange-200"
    :class="props.progressQueue?.myVideoWidth === 'FULL' ? 'w-full' : 'w-1/2'"
  ></div>
</template>
<script setup>
const props = defineProps({
  progressQueue: Object,
})
</script>
<style scoped></style>
