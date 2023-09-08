<template>
  <div class="ai-training-container flex">
    <AITrainingMyVideo></AITrainingMyVideo>
    <AITrainingTeachingVideo></AITrainingTeachingVideo>
    <AITrainingStatusContainer></AITrainingStatusContainer>
    <AITrainingTimer></AITrainingTimer>
    <div class="ai-training-info">
      <span class="info"> 전체가 다 나오는지 확인해주세요!</span>
    </div>
    <AITrainingBottomBar></AITrainingBottomBar>
  </div>
</template>
<script setup>
import {
  AITrainingStatusContainer,
  AITrainingTimer,
  AITrainingMyVideo,
  AITrainingBottomBar,
  AITrainingTeachingVideo,
} from '/src/module/ai-training/component'
</script>

<style scoped>
.ai-training-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: azure;
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
</style>
