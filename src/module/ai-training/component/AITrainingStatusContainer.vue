<template>
  <div
    class="training-status-container flex flex-col absolute items-center justify-center p-2 w-40 h-60 top-4 left-4 rounded-lg"
  >
    <div
      class="set-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-2/5 mb-2 rounded-md"
    >
      <p class="set-title text-lg font-bold">SET</p>
      <div class="set-count">O O O</div>
    </div>
    <div
      class="reps-count-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-3/5 rounded-md"
    >
      <span class="reps-title text-lg font-bold">Reps</span>
      <p class="resps-count text-6xl font-bold text-[#00E77B]">0</p>
      <div class="reps-remain ml-20 font-bold">/16</div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
</style>
