<template>
  <div class="bottom-bar-container">
    <div class="empty-container item bg-transparent"></div>
    <div class="status-navigation-container item">
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
    </div>
    <button class="skip-button skip-item">
      <div class="progress-bar"></div>
      <span class="skip-text font-extrabold">Skip</span>
      다음
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
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
  height: 70px;
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

.progress-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  z-index: -1;
  border-radius: 10px;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-duration: 10s;
  animation-name: progress;
}

@keyframes progress {
  0% {
    width: 0%; /* 시작 상태에서 너비를 0%로 유지 */
  }
  100% {
    width: 100%; /* 100%로 진행하여 전체 프로그레스 바 채우기 */
  }
}
</style>
