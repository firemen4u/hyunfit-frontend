<template>
  <div class="overlay">
    <div class="banner flex items-center">
      <img
        src="/src/assets/images/banner.png"
        alt="Banner Image"
        class="banner-img object-cover w-100"
      />
      <!-- 텍스트를 배너 위에 추가 -->
      <div
        class="banner-text flex justify-between w-100 h-100 items-center px-48"
      >
        <div>
          <div class="text-3xl font-medium text-white">강력한 코어를 위한</div>
          <div class="text-4xl font-medium text-white mt-1">
            오늘의 10분 운동 루틴
          </div>
          <div class="flex my-6">
            <div class="text-gray-200">
              <p>운동 구성</p>
              <p>소요 시간</p>
              <p>운동 난이도</p>
            </div>
            <div class="ml-8 text-white font-bold">
              <p>상체 근력 및 유산소</p>
              <p>16분</p>
              <p>중급</p>
            </div>
          </div>
          <MainPlayButton class="mt-2" />
        </div>
        <MainBannerExcContainer />
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseContainer from '/src/module/@base/views/BaseContainer.vue'
import MainPlayButton from './MainPlayButton.vue'
import MainBannerExcContainer from './MainBannerExcContainer.vue'
</script>

<style scoped>
.overlay {
  position: relative;
  width: 100%;
  height: 500px;
}
.overlay::before,
.overlay::after {
  position: absolute;
  z-index: 1;
  content: '';
  left: 0;
  width: 100%;
  height: 100px;
}
.overlay::before {
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
}

.overlay::after {
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
}
.banner {
  position: relative;
  width: 100%;
  height: 500px;
}

.banner .banner-img {
  filter: brightness(40%);
  height: 500px;
}

/* 배너 텍스트 스타일 지정 */
.banner-text {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
