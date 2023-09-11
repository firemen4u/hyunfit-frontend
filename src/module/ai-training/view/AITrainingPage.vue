<template>
  <div class="ai-training-container flex">
    <AITrainingMyVideo
      v-if="data.myVideoStatus.value !== 3"
      :myVideoStatus="data.myVideoStatus"
    ></AITrainingMyVideo>
    <AITrainingTeachingVideo
      v-if="data.teachingVideoStatus.value !== 3"
      :teachingVideoStatus="data.teachingVideoStatus"
    ></AITrainingTeachingVideo>
    <AITrainingStatusContainer></AITrainingStatusContainer>
    <AITrainingTimer></AITrainingTimer>
    <div class="ai-training-info">
      <span class="info"> 전체가 다 나오는지 확인해주세요!</span>
    </div>
    <AITrainingBottomBar></AITrainingBottomBar>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {
  AITrainingStatusContainer,
  AITrainingTimer,
  AITrainingMyVideo,
  AITrainingBottomBar,
  AITrainingTeachingVideo,
} from '/src/module/ai-training/component'

// 1일 때는 전체화면, 2일 때는 화면 1/2, 3일 떄는 컴포넌트 사용하지 않기
// store에 상태 값을 넣어둬서 계속 이 부분을 관리해줘야 함

const data = {
  myVideoStatus: ref(1),
  teachingVideoStatus: ref(3),
}
console.log(data.myVideoStatus.value)
console.log(data.teachingVideoStatus.value)
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
