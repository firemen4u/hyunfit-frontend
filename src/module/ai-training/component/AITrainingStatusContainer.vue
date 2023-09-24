<template>
  <!-- RepsCount -->
  <div
    :class="windowSize"
    class="training-status-container flex flex-col absolute items-center justify-center p-2 w-40 h-60 top-4 left-4 rounded-lg"
  >
    <div
      class="set-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-2/5 mb-2 p-2 rounded-md"
    >
      <p class="set-title text-lg font-bold">SET</p>

      <div class="set-count flex flex-row p-2">
        <div
          v-for="(setStatus, index) in setStatuses"
          :key="index"
          :data-sets-status="setStatus"
          class="status setStyle"
        ></div>
      </div>
    </div>
    <div
      class="reps-count-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-3/5 rounded-md"
    >
      <span class="reps-title text-lg font-bold">Reps</span>
      <p class="resps-count text-6xl font-bold text-[#00E77B]">
        {{ props.exerciseCount }}
      </p>
      <div class="reps-remain ml-20 font-extrabold">
        /{{ props.progressQueue?.responseData.excRepCountPerSet }}
      </div>
    </div>
  </div>

  <!-- BottomBar Container -->
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  progressQueue: Object,
  exerciseCount: Number,
  windowSize: String,
})

let totalCalorie = 0

const setStatuses = ref(['past', 'future', 'future']) // 상태 값
const timeLeft = ref(props.progressQueue?.timerLimit)
let interval = ref(null)
let showInfo = ref(true)

function calcCalorie() {
  totalCalorie *= props.progressQueue.excCaloriesPerRep
}

function startCountdown() {
  interval.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value === 0) {
      clearInterval(interval)
      skipClick() // 0초일 때 click 함수 실행
    }
  }, 1000)
}

onMounted(() => {
  setTimeout(() => {
    showInfo.value = false // 5초 후에 div를 숨깁니다.
  }, 2000)
  if (timeLeft.value < 0) return
  startCountdown()
})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>
<style scoped>
/* Status Container */
.setStyle[data-sets-status='past'] {
  background-color: rgb(0, 231, 123);
  border-color: rgb(0, 231, 123);
}
.setStyle[data-sets-status='future'] {
  background-color: rgb(184, 184, 184);
}
.setStyle[data-sets-status='future'] {
  background-color: rgb(184, 184, 184);
}
.setStyle {
  width: 24px;
  height: 24px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 50%;
  background-color: rgb(184, 184, 184);
}

/* Info css */

/* bottomBar CSS */
.status-navigation-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bottom-bar-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: transparent; /* 투명도 있는 흰색 배경 */
  width: 90vw;
  height: 100px;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
}
.buttons {
  margin: 10px;
  width: 20px;
  height: 20px;
}
.item {
  width: 200px;
  height: 50px;
  background-color: rgb(33, 33, 33, 0.3);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.skip-item {
  width: 200px;
  height: 50px;
  background-color: rgb(33, 33, 33, 0.3);
  margin: 10px;
  border-radius: 10px;
}

.skip-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  border-radius: 10px;
  background-color: rgba(41, 41, 41, 0.8);
  backdrop-filter: blur(5px);
  font-size: 20px;
  color: rgb(169, 169, 169);
  line-height: 70px;
  cursor: pointer;
}
.skip-text {
  color: white;
}

.progress-bar-wrapper {
  position: absolute;
  width: 0%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
  border-radius: 10%;
}
</style>
