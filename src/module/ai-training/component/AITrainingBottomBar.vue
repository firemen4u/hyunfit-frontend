<template>
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
      <Transition :duration="1000">
        <div
          class="progress-bar-wrapper"
          :style="{ width: (timeLeft / props.timerLimit) * 100 + '%' }"
        >
          <div class="progress-bar"></div>
        </div>
      </Transition>
      <div class="skip-text font-extrabold">Skip 다음</div>
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['skip'])
const props = defineProps({
  timerLimit: Number,
})

let interval = ref(null)
function skipClick() {
  console.log('skipClick 제한 시간', props.timerLimit)
  emit('skip')
}

const timeLeft = ref(0)
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
  timeLeft.value = props.timerLimit
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
