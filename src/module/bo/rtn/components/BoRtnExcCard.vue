<template>
  <div
    class="card flex flex-col pb-3 rounded-lg overflow-hidden shadow-md hover:bg-gray-100"
  >
    <div @click="handleClickCard">
      <div class="preview-video-wrapper">
        <div
          v-if="loading"
          class="preview-video-wrapper bg-gray-50 card-video flex items-center justify-center"
        >
          <v-progress-circular
            v-if="!loadFailed"
            indeterminate
            color="primary"
            class="preview-video-wrapper"
            :size="20"
            :width="2"
          />
          <no-file-svg v-else size="40" color="#7A7A7A" />
        </div>

        <video
          v-show="!loading"
          @loadeddata="loading = false"
          loop
          muted
          autoplay
          class="preview-video-wrapper object-cover"
        >
          <source :src="videoSrc" />
        </video>
      </div>
    </div>
    <div class="pt-2 px-3">
      <div class="exc-name font-bold">{{ exercise.excName }}</div>
      <!--      <div class="exc-content">운동 설명 : {{ exercise.excContent }}</div>-->

      <div class="text-center mt-1 flex justify-end">
        <v-btn
          rounded="xl"
          class="register-btn"
          size="small"
          @click="handleClickAdd"
        >
          추가하기
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseCircularLoader from '@/module/@base/components/BaseCircularLoader.vue'
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed, onMounted, ref } from 'vue'
import NoFileSvg from '@/module/@base/svg/NoFileSvg.vue'

const props = defineProps({
  exercise: Object, // 운동 정보를 props로 받습니다.
})

const loading = ref(true)
const loadFailed = ref(false)

const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)

const emit = defineEmits(['click:card', 'click:add'])

const handleClickCard = () => {
  emit('click:card', props.exercise)
}
const handleClickAdd = () => {
  emit('click:add', props.exercise)
}

onMounted(() => {
  setTimeout(() => {
    loadFailed.value = true
  }, 5000)
})
</script>

<style scoped>
/* 스타일을 원하는 대로 수정하세요. */
.card {
  width: 220px;
}
.preview-video-wrapper {
  width: 220px;
  height: 100px;
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
