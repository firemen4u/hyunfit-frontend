<template>
  <div
    class="time-container absolute flex flex-col items-center justify-center top-4 right-4 bg-[#4e4e4f] w-48 h-48 rounded-full"
  >
    <p class="reps-title text-2xl font-bold text-white mb-4">Sec</p>
    <span class="resps-count text-7xl font-bold text-white mb-4">{{
      remainingTime
    }}</span>
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
<script setup>
import { ref, onMounted } from 'vue'

const initialTime = 100
const remainingTime = ref(initialTime)

const startTimer = () => {
  const timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value-- // 시간을 1초씩 감소
    } else {
      clearInterval(timerInterval) // 시간이 0이 되면 타이머 중지
    }
  }, 1000) // 1초마다 업데이트
}

onMounted(() => {
  startTimer() // 컴포넌트가 마운트되면 타이머 시작
})
</script>
<style scoped>
.circle {
  cx: 120;
  cy: 120;
  r: 100;
  stroke-dasharray: 628.319, 628.319;
  stroke-dashoffset: 628.319;
}
</style>
