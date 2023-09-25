<template>
  <div
    class="exc-card flex flex-col shadow-md rounded-lg hover:translate-y-[-10px] hover:bg-gray-100"
    @click="handleClick"
  >
    <div class="exc-img">
      <video loop muted autoplay>
        <source :src="videoSrc" />
      </video>
    </div>
    <div class="exc-name">이름 : {{ exercise.excName }}</div>
    <div class="exc-content">설명 : {{ exercise.excContent }}</div>
  </div>
</template>

<script setup>
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed } from 'vue'
const props = defineProps({
  exercise: Object,
})

const emit = defineEmits([])

const handleClick = () => {
  emit('openModal', props.exercise)
}

// 계산된 속성을 사용하여 비디오 URL을 생성
const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)
</script>

<style scoped>
.exc-card {
  width: 250px;
  height: 220px;
  padding: 20px;
  margin: 5px;
}
.exc-img {
  width: 100%;
  /* max-width: 100%; */
}
.exc-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.exc-content {
  overflow-wrap: break-word;
  white-space: nowrap; /* 한 줄로 텍스트를 유지 */
  overflow: hidden; /* 범위를 넘어가는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 범위를 넘어가는 텍스트를 "..."으로 표시 */
}
</style>
