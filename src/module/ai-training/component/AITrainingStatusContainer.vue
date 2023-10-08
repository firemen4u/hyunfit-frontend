<template>
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
          v-for="index in 3"
          :key="index"
          :class="['setStyle', { green: index <= props.setCount }]"
        >
          <!-- 초록색 동그라미를 설정 -->
        </div>
      </div>
    </div>
    <div
      class="reps-count-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-3/5 rounded-md"
    >
      <span class="reps-title text-lg font-bold">Reps</span>
      <p class="reps-count text-6xl font-bold text-[#00E77B]">
        {{ props.setScoreCount }}
      </p>
      <div class="reps-remain ml-20 font-extrabold">
        /{{ props.exercise.exerciseCount }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  exercise: Object,
  setScoreCount: Number,
  setCount: Number,
  windowSize: String,
})
</script>
<style scoped>
.setStyle {
  width: 24px;
  height: 24px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 50%;
  background-color: rgb(184, 184, 184);
}

.setStyle.green {
  background-color: rgb(0, 231, 123);
  border-color: rgb(0, 231, 123);
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
</style>
