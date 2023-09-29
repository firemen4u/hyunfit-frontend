<script setup>
import { ref } from 'vue'

const animation = ref(false)
</script>

<template>
  <div
    @mouseenter="animation = true"
    @mouseleave="animation = false"
    class="cursor-pointer flex flex-col h-full w-full p-10 justify-start overflow-hidden"
  >
    <div class="main-card-subtitle mb-3 font-black">개인 설정</div>

    <div class="text-3xl font-bold text-white">오직 나를 위한</div>

    <div class="text-3xl font-bold text-white">맞춤형 추천 받아보기</div>

    <div class="flex justify-center rounded-sm">
      <img
        v-show="animation"
        class="w-[240px] h-[180px] object-cover"
        src="https://fs.hyunfit.life/api/hyunfit/file/survey-animation.gif"
        alt=""
      />
      <img
        v-show="!animation"
        class="w-[240px] h-[180px] object-cover"
        src="https://fs.hyunfit.life/api/hyunfit/file/survey-animation-default.png"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.main-card-subtitle {
  color: #ced1d9;
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/survey-message-icon.png');
  background-size: 20px;
  text-indent: 26px;
}
</style>
