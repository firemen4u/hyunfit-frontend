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
    <div class="main-card-subtitle mb-3 font-black">현핏 리포트</div>

    <div class="text-3xl font-bold text-black">이번 달 태운 칼로리가</div>

    <div class="text-3xl font-bold text-black">궁금하다면?</div>

    <div class="flex justify-center rounded-sm">
      <img
        v-show="animation"
        class="w-[200px] object-cover"
        src="https://fs.hyunfit.life/api/hyunfit/file/bar-chart-animated.gif"
        alt=""
      />
      <img
        v-show="!animation"
        class="w-[200px] object-cover"
        src="https://fs.hyunfit.life/api/hyunfit/file/bar-chart-default.png"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped>
.main-card-subtitle {
  color: #989eaf;
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/pie-graph-icon.png');
  background-size: 20px;
  text-indent: 28px;
}
</style>
