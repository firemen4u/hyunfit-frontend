<script setup>
import MainPlayButton from '@/module/main/components/MainPlayButton.vue'
import { computed, ref, watch } from 'vue'
import ExcUtils from '@/module/bo/exc/services/excUtils'
import MainApi from '@/module/main/services/mainApi'
import { FILE_SERVER_HYUNFIT_URL } from '@/config'
import router, { pathNames } from '@/router'
const props = defineProps({
  rcm: Array,
  userdata: Object,
})
const loading = ref(true)

const videoLoading = ref(true)

const routine = ref(null)
const levels = ['초급', '초~중급', '중급', '중~고급', '고급']
const targets = [
  '상체 근력 및 유산소 운동',
  '하체 근력 및 유산소 운동',
  '상/하체 근력 및 유산소 운동',
  '서킷트레이닝(전체 유산소 운동)',
]

const videoSrc = ref(null)
const routineVideoElem = ref(null)
function randomInt() {
  return Math.floor(Math.random() * 3)
}

const videoTimeout = ref(null)

function totalMinutes(exercises) {
  return Math.round(
    exercises.reduce((acc, curr) => {
      return acc + (curr.excSetCount * curr.excTimePerSetInSec) / 60
    }, 0)
  )
}
async function setRtnData(rcm) {
  let rtnSeq = rcm[randomInt()].rtn_seq
  let rtn = await MainApi.getOneRoutine(rtnSeq)
  rtn.rtnDurationInMin = totalMinutes(rtn.exercises)
  rtn.rtnTarget = targets[rtn.rtnTarget - 1]
  rtn.rtnExperienceLevel = levels[rtn.rtnExperienceLevel - 1]
  videoSrc.value = `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${rtn.exercises[0].excSeq}.mp4`
  routine.value = rtn
  setTimeout(() => {
    loading.value = false
  }, 3000)
}

const rcmWatcher = watch(
  () => props.rcm,
  async (newValue, oldValue) => {
    if (!newValue) return
    await setRtnData(newValue)

    rcmWatcher()
  }
)

function playVideo() {
  routineVideoElem.value.play()
}
function pauseVideo() {
  clearTimeout(videoTimeout.value)
  routineVideoElem.value.currentTime = 0
  routineVideoElem.value.pause()
}

async function gotoAiTraining(routine) {
  await router.push(
    pathNames.aiTrainingPage.with(undefined, { rtnSeq: routine.rtnSeq })
  )
}
</script>

<template>
  <div class="flex h-full w-full justify-between items-center relative">
    <div
      v-if="loading || videoLoading"
      class="absolute bg-[#0d1851] w-full flex justify-center items-center h-full z-[3]"
    >
      <img
        src="https://fs.hyunfit.life/api/hyunfit/file/rcm-loader.gif"
        class="h-52 rounded-xl"
        alt=""
      />
    </div>
    <div class="flex p-10 justify-between items-center">
      <div class="">
        <div class="main-card-subtitle mb-3 font-black">오늘의 추천</div>
        <div class="mr-5">
          <div class="text-3xl font-bold text-white">
            {{ userdata?.mbrName }}님에게
          </div>
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
              <p>{{ routine?.rtnTarget }}</p>
              <p>{{ routine?.rtnDurationInMin }}분</p>
              <p>{{ routine?.rtnExperienceLevel }}</p>
            </div>
          </div>

          <MainPlayButton @click="gotoAiTraining(routine)" />
        </div>
      </div>
      <div
        class="brightness-[85%] transition-all hover:rounded-xl hover:brightness-100"
        style="contain: paint"
        @mouseenter="playVideo"
        @mouseleave="pauseVideo"
      >
        <video
          ref="routineVideoElem"
          v-if="videoSrc"
          class="h-[170px]"
          loop
          preload="auto"
          muted
          :src="videoSrc"
          @canplaythrough="videoLoading = false"
        />
      </div>
    </div>
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
