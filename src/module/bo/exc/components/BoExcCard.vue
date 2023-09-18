<template>
  <div
    class="exc-card flex flex-col shadow-md rounded-lg hover:translate-y-[-10px] hover:bg-gray-100"
    @click="handleClick"
  >
    <div>
      <img
        class="exc-img"
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdAJq71%2FbtsteQJsEa7%2FntSCTKbwomKjVIpQusuLwk%2Fimg.jpg"
      />
    </div>
    <div class="exc-name">운동 이름 : {{ exercise.excName }}</div>
    <div class="exc-content">운동 설명 : {{ exercise.excContent }}</div>
    <div>{{ exercise.excSeq }}</div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const props = defineProps({
  exercise: Object, // 운동 정보를 props로 받습니다.
})

const emit = defineEmits([])

const handleClick = () => {
  emit('openModal', props.exercise)
}
</script>

<style scoped>
/* 스타일을 원하는 대로 수정하세요. */
.exc-card {
  width: 200px;
  padding: 20px;
  margin: 5px;
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
