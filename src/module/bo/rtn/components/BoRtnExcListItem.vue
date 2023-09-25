<template>
  <div
    class="flex px-3 py-2 items-center rounded-lg cursor-pointer transition-all hover:bg-gray-50 mt-2"
    :class="checked ? 'bg-gray-50' : ''"
    @click="e => handleClickAdd(e)"
  >
    <div class="w-[90%] flex items-center justify-start select-none">
      <!--      운동 이름-->
      <div class="mr-1">
        <v-checkbox
          hide-details
          color="primary"
          readonly
          density="compact"
          :model-value="checked > 0"
        />
      </div>
      <div class="font-semibold">{{ exercise.excName }}</div>
      <base-label class="ml-5">{{ timePerExc(exercise) }}분</base-label>
      <base-label class="ml-2">
        {{ ExcUtils.mapExcType(exercise.excType) }}
      </base-label>
      <base-label class="ml-2">
        {{ ExcUtils.mapDifficultyType(exercise.excDifficulty) }}
      </base-label>
      <base-label class="ml-2">{{ caloriePerExc(exercise) }}kcal</base-label>

      <div class="ml-10 flex items-center" v-if="checked">
        <CrossSvg :size="18" color="#374151" />
        <div class="text-gray-700 font-black">
          {{ checked }}
        </div>
      </div>
    </div>
    <v-btn
      class=""
      rounded="xl"
      size="small"
      variant="outlined"
      color="#374151"
      @click="e => handleClickCard(e)"
      :ripple="false"
    >
      <div class="flex items-center">
        <SearchSvg :size="13" class="mr-1" />
        <div class="text-gray-700">상세보기</div>
      </div>
    </v-btn>
  </div>
</template>

<script setup>
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import { computed, onMounted, ref } from 'vue'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import ExcUtils from '@/module/bo/exc/services/excUtils'
import SearchSvg from '@/module/@base/svg/SearchSvg.vue'
import CrossSvg from '@/module/@base/svg/CrossSvg.vue'

const props = defineProps({
  exercise: Object, // 운동 정보를 props로 받습니다.
  checked: Number,
})

const loading = ref(true)
const loadFailed = ref(false)

const videoSrc = computed(
  () =>
    `${FILE_SERVER_HYUNFIT_URL}/low_quality_preview_video_${props.exercise.excSeq}.mp4`
)

const emit = defineEmits(['click:card', 'click:add'])

function caloriePerExc(exercise) {
  return Math.round(
    exercise.excSetCount *
      exercise.excRepCountPerSet *
      exercise.excCaloriesPerRep
  )
}
function timePerExc(exercise) {
  return Math.round((exercise.excSetCount * exercise.excTimePerSetInSec) / 60)
}

const handleClickCard = e => {
  e.stopPropagation()
  emit('click:card', props.exercise)
}
const handleClickAdd = e => {
  emit('click:add', props.exercise)
}

onMounted(() => {
  setTimeout(() => {
    loadFailed.value = true
  }, 5000)
})
</script>

<style scoped>
.card {
  width: 100%;
  height: 50px;
}
.exc-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
