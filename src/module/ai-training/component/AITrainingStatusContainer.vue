<template>
  <!-- 타이머 -->
  <div
    v-if="props.progressQueue?.timerVisible"
    class="time-container absolute flex flex-col items-center justify-center top-4 right-4 bg-[#4e4e4f] w-48 h-48 rounded-full"
  >
    <p class="reps-title text-2xl font-bold text-white mb-4">Sec</p>
    <span class="resps-count text-7xl font-bold text-white mb-4">
      {{ remainingTime }}</span
    >
  </div>
  <!-- RepsCount -->
  <div
    v-if="props.progressQueue?.countContainerVisible"
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
      <p class="resps-count text-6xl font-bold text-[#00E77B]">0</p>
      <div class="reps-remain ml-20 font-extrabold">
        /{{ props.progressQueue.excSetCount }}
      </div>
    </div>
  </div>
  <!-- Info -->
  <div class="ai-training-info">
    <span class="info"> </span>
  </div>
  <!-- BottomBar Container -->
  <div class="bottom-bar-container">
    <div class="empty-container item bg-transparent"></div>
    <div class="status-navigation-container item">
      <button class="buttons">
        <img src="/src/assets/images/volume-high.png" />
      </button>
      <button class="buttons">
        <img src="/src/assets/images/volume-high.png" />
      </button>
      <button class="buttons">
        <img src="/src/assets/images/volume-high.png" />
      </button>
      <button class="buttons">
        <img src="/src/assets/images/volume-high.png" />
      </button>
    </div>
    <button class="skip-button skip-item" @click="skipClick()">
      <div class="skip-text font-extrabold">Skip 다음</div>
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const setStatuses = ref(['past', 'future', 'future']) // 상태 값

const props = defineProps({
  progressQueue: Object,
})

const emit = defineEmits(['skip'])

// 필요한 거 맞고
let interval = ref(null)
function skipClick() {
  console.log('skipClick 제한 시간', props.progressQueue?.timerLimit)
  emit('skip')
}

const timeLeft = ref(-1)
function startCountdown() {
  interval.value = setInterval(() => {
    console.log('남은시간', timeLeft.value)
    timeLeft.value--
    if (timeLeft.value === 0) {
      console.log('인터벌 삭제')
      clearInterval(interval)
      skipClick() // 0초일 때 click 함수 실행
    }
  }, 1000)
}

onMounted(() => {
  timeLeft.value = props.progressQueue?.timerLimit
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
.info {
  color: transparent;
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(111deg, rgb(133, 0, 38) 8%, rgb(249, 76, 16) 93%);
  -webkit-background-clip: text; /* 텍스트에 그라데이션을 적용하기 위해 필요한 속성입니다. */
  background-clip: text;
}

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
