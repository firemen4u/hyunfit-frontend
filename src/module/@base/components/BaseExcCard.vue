<template>
  <div class="exc-card flex flex-col shadow-md rounded-lg bg-white">
    <div class="flex justify-center">
      <img
        class="exc-img"
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdAJq71%2FbtsteQJsEa7%2FntSCTKbwomKjVIpQusuLwk%2Fimg.jpg"
      />
    </div>
    <div class="exc-name mt-2 font-bold text-lg">{{ exercise.excName }}</div>
    <div class="exc-content flex flex-wrap">{{ exercise.excContent }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  exercise: Object,
})
</script>

<style scoped>
.exc-card {
  width: 300px;
  height: 280px;
  padding: 20px;
  margin: 5px;
}
.exc-img {
  max-width: 80%;
}
.exc-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* .exc-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
} */
</style>
