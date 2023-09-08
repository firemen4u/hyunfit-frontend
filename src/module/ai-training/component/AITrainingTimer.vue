<template>
  <div
    class="time-container absolute flex flex-col items-center justify-center top-4 right-4 bg-[#4e4e4f] w-48 h-48 rounded-full"
  >
    <p class="reps-title text-2xl font-bold text-white mb-4">Sec</p>
    <span class="resps-count text-7xl font-bold text-white mb-4">100</span>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
        <defs>
          <linearGradient id="Gradient" x1="0" x2="100%" y1="0" y2="100%">
            <stop stop-color="#00c6ff" offset="0%"></stop>
            <stop stop-color="#9933ff" offset="100%"></stop>
          </linearGradient>
        </defs>
        <circle class="circle"></circle>
      </svg> -->
  </div>
</template>
<script setup></script>
<style scoped>
.circle {
  cx: 120;
  cy: 120;
  r: 100;
  stroke-dasharray: 628.319, 628.319;
  stroke-dashoffset: 628.319;
}
</style>
