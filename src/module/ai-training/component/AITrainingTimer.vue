<template>
  <div
    class="time-container absolute flex flex-col items-center justify-center top-4 right-4 bg-[#4e4e4f] w-48 h-48 rounded-full"
  >
    <p class="reps-title text-2xl font-bold text-white mb-4">Sec</p>
    <span class="resps-count text-7xl font-bold text-white mb-4">
      {{ Math.floor(props.timerLimit) }}</span
    >
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  timerLimit: Number,
})

const remainingTime = ref(props.timerLimit) // props를 로컬 데이터로 복사

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
<style scoped></style>
