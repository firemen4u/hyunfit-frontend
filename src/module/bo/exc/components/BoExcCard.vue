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
  </div>
</template>

<script setup>
const props = defineProps({
  exercise: Object, 
})

const emit = defineEmits([])

const handleClick = () => {
  emit('openModal', props.exercise)
}
</script>

<style scoped>
.exc-card {
  width: 200px;
  padding: 20px;
  margin: 5px;
}
.exc-img {
  max-width: 100%;
}
.exc-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.exc-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
