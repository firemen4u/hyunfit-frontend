<script setup>
import excUtils from '@/module/bo/exc/services/excUtils'
import LevelSvg from '@/module/@base/svg/LevelSvg.vue'
import TimerSvg from '@/module/@base/svg/TimerSvg.vue'
import HeartSvg from '@/module/@base/svg/HeartSvg.vue'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'

const props = defineProps({
  routine: Object,
})
</script>

<template>
  <div class="rtn-chips flex">
    <div
      class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
    >
      <img
        width="18"
        height="18"
        src="https://fs.hyunfit.life/api/hyunfit/file/exctype-chip-icon.png"
      />
      <div class="ml-0.5">
        <p>{{ excUtils.mapExcType(routine.rtnTarget) }}</p>
      </div>
    </div>
    <div
      class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
    >
      <LevelSvg :size="18"></LevelSvg>
      <div class="ml-0.5">
        <p>
          {{ excUtils.mapDifficultyType(routine.rtnExperienceLevel) }}
        </p>
      </div>
    </div>
    <div
      class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
    >
      <TimerSvg :size="18"></TimerSvg>
      <div class="ml-1">{{ routine.rtnDurationInMin }}분</div>
    </div>
    <div
      class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-600 px-2 py-1 mr-1"
    >
      <HeartSvg :size="18"></HeartSvg>
      <div class="ml-0.5">{{ routine.rtnCaloriesBurnt }} Kcal</div>
    </div>
    <div
      class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
    >
      <RewardSvg :size="18"></RewardSvg>

      <div class="ml-0.5">{{ routine.rtnRewardPoint }} 포인트</div>
    </div>
  </div>
</template>

<style scoped></style>
