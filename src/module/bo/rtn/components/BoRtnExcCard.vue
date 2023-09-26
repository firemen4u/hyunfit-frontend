<template>
  <div
    class="card flex flex-col pb-3 rounded-lg overflow-hidden shadow-md cursor-pointer"
    @click="handleClickCard"
  >
    <div>
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
    <div class="mt-2 px-2">
      <div class="flex">
        <div class="exc-name font-bold">{{ exercise.excName }}</div>
        <base-label class="ml-2"
          >{{
            Math.round(
              (exercise.excSetCount * exercise.excTimePerSetInSec) / 60
            )
          }}분</base-label
        >
      </div>
      <div class="text-center mt-3 flex justify-end">
        <v-btn
          rounded="xl"
          size="small"
          @click="handleClickAdd"
          :ripple="false"
        >
          <div class="flex items-center">
            <PlusSvg size="15" />
            <div>추가</div>
          </div>
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
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import PlusSvg from '@/module/@base/svg/PlusSvg.vue'

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
  width: 210px;
}
.preview-video-wrapper {
  width: 210px;
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
