<template>
  <div class="ai-training-container flex">
    <!-- AITrainingMyVideo컴포넌트 -->
    <div class="my-video w-1/2 bg-orange-200"></div>

    <!-- AITrainingTeachingViedo 컴포넌트 -->
    <div class="teaching-video w-1/2"></div>

    <!-- AITrainingStatusContainer 컴포넌트 -->
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

    <!-- AITrainingTimer 컴포넌트 -->
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

    <!-- AITrainingBottomBar 컴포넌트 -->
    <div class="ai-training-info">
      <span class="info"> 전체가 다 나오는지 확인해주세요!</span>
    </div>
    <div class="navigation-container">
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
      <button class="skip-button item skip">
        <p class="font-extrabold">Skip</p>
      </button>
    </div>
  </div>
</template>
<script setup></script>

<style scoped>
.ai-training-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: azure;
}
.circle {
  cx: 120;
  cy: 120;
  r: 100;
  stroke-dasharray: 628.319, 628.319;
  stroke-dashoffset: 628.319;
}
.navigation-container {
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

.ai-training-info {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
}
.info {
  color: transparent;
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(111deg, rgb(133, 0, 38) 8%, rgb(249, 76, 16) 93%);
  -webkit-background-clip: text; /* 텍스트에 그라데이션을 적용하기 위해 필요한 속성입니다. */
  background-clip: text;
}

.status-navigation-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
.skip {
  padding-right: 100px;
}
</style>
