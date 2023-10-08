<script setup>
const props = defineProps({
  userdata: Object,
})
</script>

<template>
  <v-dialog>
    <div class="flex justify-center">
      <div
        class="bg-white h-[60vh] w-[60vw] rounded-lg overflow-hidden px-10 py-4"
      >
        <div class="text-lg">
          <div>현핏과 더 정확한 자세로 운동하기 위한 안내 영상입니다.</div>
          <div>
            현핏이
            <span>{{ userdata.mbrName }}</span>
            님의 자세를 정확하게님의 자세를 정확하게 판단할 수 있도록, 본 안내
            영상의 내용을 참고해주세요.
          </div>
        </div>
        <video
          src="https://alycecloud-website.s3.ap-northeast-2.amazonaws.com/video/tutorial.mp4"
          preload="auto"
          playsinline=""
          webkit-playsinline=""
          x5-playsinline=""
          style="width: 100%; height: 100%"
        ></video>
      </div>
    </div>
  </v-dialog>
</template>

<style scoped></style>
