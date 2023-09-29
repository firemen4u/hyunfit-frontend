<template>
  <div
    class="w-full shadow-2xl h-[400px] banner rounded-xl overflow-hidden p-10"
  >
    <div class="flex justify-evenly items-center">
      <!-- 텍스트를 배너 위에 추가 -->
      <div class="banner-text flex justify-between items-center">
        <div>
          <div class="text-3xl font-bold text-white">현핏이 사원님을 위해</div>
          <div class="text-3xl font-bold text-white mt-2">
            딱 맞는 트레이닝 프로그램을 가져와봤어요
          </div>
          <div class="flex my-10">
            <div class="text-gray-200 text-sm">
              <p>운동 구성</p>
              <p>소요 시간</p>
              <p>운동 난이도</p>
            </div>
            <div class="ml-8 text-white font-bold text-sm">
              <p>상체 근력 및 유산소</p>
              <p>16분</p>
              <p>중급</p>
            </div>
          </div>
          <MainPlayButton class="mt-2" />
        </div>
        <!--        <MainBannerExcContainer />-->
      </div>
      <div class="">
        <video
          autoplay
          controls
          loop
          class="h-[300px]"
          src="https://fs.hyunfit.life/api/hyunfit/file/preview_video_171.mp4"
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainPlayButton from './MainPlayButton.vue'
</script>

<style scoped>
.banner {
  /* background-color: #014350; */
  background-color: #01303a;
}
</style>
