<!-- <template lang="">
  <div class="w-1/5 flex flex-col bg-white">
    <div>
      <img class="exc-img" src="/src/assets/images/exercise-thumbnail.png" />
    </div>
    <div>운동 이름 : exc_name</div>
    <div>운동 설명 어쩌구 저쩌구 솰라솰라 : exc_content</div>
  </div>
</template>
<script setup></script>
<style lang=""></style> -->
<!-- <template>
  <div class="w-1/5 flex flex-col bg-white">
    <div>
      <img class="exc-img" src="exercise.exc_thumnailImg" />
    </div>
    <div>운동 이름 : {{ exercise.exc_name }}</div>
    <div>운동 설명 어쩌구 저쩌구 솰라솰라 : {{ exercise.exc_content }}</div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

// 상위 컴포넌트에서 전달한 운동 정보를 props로 받음
const props = defineProps({
  exercise: Object,
})
</script>

<style scoped>
/* 스타일링 코드 */
</style> -->
<template>
  <div class="w-full flex flex-col bg-white">
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
.exc-img {
  max-width: 100%;
}
.exc-content {
  text-overflow: ellipsis;
}
</style>
