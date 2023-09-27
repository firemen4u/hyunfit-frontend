<script setup>
import TrainerInfiniteScroll from '@/module/main/components/cards/TraninerInfiniteScroll.vue'
</script>

<template>
  <div class="overflow-hidden h-full w-full flex flex-col justify-start">
    <div class="flex flex-col p-10">
      <div class="main-card-subtitle mb-3 font-black">화상 트레이닝</div>

      <div class="text-3xl font-bold text-white">찾았다</div>

      <div class="text-3xl font-bold text-white">나의 1타 트레이너</div>
    </div>
    <div class="flex justify-center mt-5">
      <TrainerInfiniteScroll />
    </div>
  </div>
</template>

<style scoped>
.main-card-subtitle {
  color: #ced1d9;
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/online-meeting-icon.png');
  background-size: 20px;
  text-indent: 28px;
}
</style>
