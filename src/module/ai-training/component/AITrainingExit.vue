<script setup>

import router, {pathNames} from "@/router";

const goToMainPage = () => {
  router.push(pathNames.mainPage)
}

const goToReportPage = () => {
  router.push(pathNames.reportPage)
}


</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center"
       style="background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg'); background-size: cover; background-position: center;">
    <div class="w-500 h-500 flex flex-col justify-center items-center mb-44">
      <div class="icon">
        <img
            class="w-[130px] h-[150px] object-fit"
            src="https://fs.hyunfit.life/api/hyunfit/file/medal-unscreen.gif"
            alt=""
        /></div>
      <div class="exit-title text-5xl font-black text-[#0d1851] mt-10 mb-10">
        오늘의 운동이 모두 끝났어요!
      </div>
      <div class="exit-content text-l font-bold mb-10 tracking-wider leading-relaxed">
        시작은 어렵지만, 시간은 빠르게 지나갔죠?<br>
        15분만에 맺힌 이마위의 땀과 뿌듯함의 순삭!<br>
        우리, 내일도 놓치지 말아요
      </div>
      <div class="buttons-container flex flex-row justify-between" style="gap: 10px;">
        <v-btn height="50" width="180" color="#021f3d" rounded @click="goToMainPage()"
               style="font-weight: bold; font-size: 14px;">
          홈으로 가기
        </v-btn>
        <v-btn height="50" width="180" rounded @click="goToReportPage()" style="font-weight: bold; font-size: 14px;">
          결과 자세히 보기
        </v-btn>
      </div>
      <div class="workout-finish-banner-outer" style="position: absolute; bottom: 0; width: 100%;">
        <div class="workout-finish-banner-loop">
          <div class="workout-finish-banner-content">
            우리는 여러번 넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까! 우리는 여러번 넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까! 우리는 여러번
            넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까! 우리는 여러번 넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까!
          </div>
          <div class="workout-finish-banner-content">
            우리는 여러번 넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까! 우리는 여러번 넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까! 우리는 여러번
            넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까! 우리는 여러번 넘어지고, 종종 실패하고, 자주 심각하지만, 오늘보다 내일 더 강할거니까!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.workout-finish-banner-loop {
  display: inline-block;
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0px;
  line-height: 80px;
  animation-name: exit;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  white-space: nowrap;
}

.workout-finish-banner-outer {
  position: sticky;
  bottom: 0px;
  height: 80px;
  width: 100%;
  background: linear-gradient(126.12deg, rgb(0, 198, 255) 0%, rgb(153, 51, 255) 100%);
  overflow: hidden
}

@keyframes exit {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-50%);
  }
}

</style>