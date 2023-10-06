<template>
  <!-- Info -->
  <div
    class="ai-training-info-container"
    :style="{
      'background-color':
        (breakTime && !loading) || pauseTime ? 'rgba(0, 0, 0, 0.4)' : '',
    }"
  >
    <!-- 웜업 -->
    <div class="ai-training-info background" v-if="exerciseType !== 'EXERCISE'">
      <span class="info">{{ exerciseName }}</span>
    </div>
    <!-- 운동 시작 -->
    <div
      class="ai-training-info background"
      v-if="exerciseType === 'EXERCISE' && !breakTime"
    >
      <span class="info">운동 시작!</span>
    </div>

    <!-- completed, good, bad   -->
    <div class="ai-training-info" v-if="notification">
      <span class="info">{{ notification }}</span>
    </div>
    <!-- 휴식 시간   -->
    <div class="ai-training-info break" v-if="breakTime && !loading">
      <span class="break-time pause">휴식 시간</span>
    </div>
    <!-- 일시 정지   -->
    <div class="ai-training-info" v-if="pauseTime">
      <span class="pause">일시 정지</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  exerciseName: String,
  exerciseType: String,
  loading: Boolean,
  breakTime: Boolean,
  pauseTime: Boolean,
  notification: String,
  videoUrl: String,
})
</script>
<style scoped>
.break {
  background-color: rgb(128, 128, 128, 0.2);
}

.pause {
  background-color: rgb(128, 128, 128, 0.2);
}

.background {
  background-color: rgba(0, 0, 0, 0.6);
}

.info {
  color: transparent;
  font-size: 70px;
  font-weight: 1000;
  text-align: center;
  background: linear-gradient(
    111deg,
    rgb(133, 0, 38) 30%,
    rgb(249, 76, 16) 70%,
    rgb(248, 222, 34) 80%
  );
  -webkit-background-clip: text;
  background-clip: text;
}

.ai-training-info-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.pause {
  color: transparent;
  font-size: 70px;
  font-weight: 1000;
  text-align: center;
  background: white;
  -webkit-background-clip: text;
  background-clip: text;
}

.break-time {
  color: transparent;
  font-size: 70px;
  font-weight: 1000;
  text-align: center;
  background: rgb(0, 231, 123);
  -webkit-background-clip: text;
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
  border-radius: 50px;
}
</style>
