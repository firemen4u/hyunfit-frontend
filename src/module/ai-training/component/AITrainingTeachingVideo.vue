<template>
  <div
    class="teaching-video bg-white"
    :class="props.teachingVideoStatus.value === 1 ? 'w-full' : 'w-1/2'"
  >
    <video
      src="https://alycecloud-website.s3.ap-northeast-2.amazonaws.com/video/warming_up.mp4"
      preload="auto"
      playsinline=""
      webkit-playsinline=""
      x5-playsinline=""
      style="width: 100%; height: 100%; object-fit: cover; border-radius: 0%"
      autoplay="true"
    ></video>
  </div>
</template>
<script setup>
const props = defineProps({
  teachingVideoStatus: Number,
})

console.log(props.teachingVideoStatus.value)
</script>
<style scoped></style>
