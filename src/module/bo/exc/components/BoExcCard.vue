<template>
  <div class="exc-card flex flex-col bg-white">
    <div>
      <img class="exc-img" src="/src/assets/images/exercise-thumbnail.png" />
    </div>
    <div class="exc-name">운동 이름 : {{ exercise.excName }}</div>
    <div class="exc-content">운동 설명 : {{ exercise.excContent }}</div>
    <div>{{ exercise.excSetCount }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  exercise: Object, // 운동 정보를 props로 받습니다.
})
</script>

<style scoped>
/* 스타일을 원하는 대로 수정하세요. */
.exc-card {
  width: 180px;
}
.exc-img {
  max-width: 100%;
}
.exc-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
