<template>
  <div class="banner">
    <div class="img-cover"></div>
    <img
      src="https://www.borntough.com/cdn/shop/articles/Best_Calisthenic_Workout_for_Beginners.jpg?v=1636398453"
      alt="Banner Image"
    />
    <!-- 텍스트를 배너 위에 추가 -->
    <BaseContainer></BaseContainer>
    <div class="banner-text mt-10 ml-10">
      <div class="text-3xl font-medium">강력한 코어를 위한</div>
      <div class="text-4xl font-medium">오늘의 10분 운동 루틴</div>
      <p>운동 구성</p>
      <p>소요 시간</p>
      <p>운동 난이도</p>
    </div>
  </div>
</template>

<script setup>
import BaseContainer from '/src/module/@base/views/BaseContainer.vue'
</script>

<style scoped>
.img-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 색상 및 투명도 조절 */
}
.banner {
  position: relative;
  height: 400px;
  overflow: hidden; /* 배너 내용을 넘치지 않도록 설정 */
}

/* 배너 이미지 스타일 지정 */
.banner img {
  width: 100%;
  height: auto;
  object-fit: cover; /* 이미지가 화면에 맞게 조절되도록 설정 */
}

/* 배너 텍스트 스타일 지정 */
.banner-text {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px; /* 텍스트와 배너 경계 사이의 여백 설정 */
  color: #ffffff; /* 텍스트 색상 설정 */
}
</style>
