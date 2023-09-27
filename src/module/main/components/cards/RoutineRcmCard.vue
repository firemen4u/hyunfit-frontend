<script setup>
import MainPlayButton from '@/module/main/components/MainPlayButton.vue'
</script>

<template>
  <div class="flex h-full w-full justify-between items-center p-10">
    <div>
      <div class="main-card-subtitle mb-3 font-black">오늘의 추천</div>
      <div class="mr-5">
        <div class="text-3xl font-bold text-white">승렬님에게</div>
        <div class="text-3xl font-bold text-white mt-1">
          딱 맞는 운동을 모아왔어요
        </div>
        <div class="flex my-5">
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

        <MainPlayButton />
      </div>
    </div>
    <video
      class="h-[170px]"
      autoplay
      loop
      src="https://fs.hyunfit.life/api/hyunfit/file/preview_video_171.mp4"
    ></video>
  </div>
</template>

<style scoped>
.main-card-subtitle {
  color: #aab3bd;
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/a.ctr.icon-light.png');
  background-size: 20px;
  text-indent: 28px;
}
</style>
