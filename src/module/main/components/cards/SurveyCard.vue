<script setup>
import { ref } from 'vue'

const animation = ref(false)
</script>

<template>
  <div
    @mouseenter="animation = true"
    @mouseleave="animation = false"
    class="flex flex-col h-full w-full p-10 justify-start overflow-hidden"
  >
    <div class="main-card-subtitle mb-3 font-black">맞춤형</div>

    <div class="text-3xl font-bold text-white">알려줘요</div>

    <div class="text-3xl font-bold text-white">너굴맨</div>

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
