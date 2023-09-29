<script setup>
import { ref } from 'vue'

const animation = ref(false)
</script>

<template>
  <div
    @mouseenter="animation = true"
    @mouseleave="animation = false"
    class="flex cursor-pointer flex-col h-full w-full p-10 justify-start overflow-hidden"
  >
    <div class="main-card-subtitle mb-3 font-black">트레이닝 프로그램</div>

    <div class="text-3xl font-bold text-white">핏한 나를 만나는</div>

    <div class="text-3xl font-bold text-white">가장 빠른 길</div>

    <div class="flex justify-center rounded-sm">
      <img
        v-show="animation"
        class="w-[270px] h-[150px] object-cover"
        src="https://fs.hyunfit.life/api/hyunfit/file/pushup-loader.gif"
        alt=""
      />
      <img
        v-show="!animation"
        class="w-[270px] h-[150px] object-cover"
        src="https://fs.hyunfit.life/api/hyunfit/file/pushup-loader-default.png"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.main-card-subtitle {
  color: #ced1d9;
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/dumbbell-large-minimalistic.png');
  background-size: 20px;
  text-indent: 26px;
}
</style>
