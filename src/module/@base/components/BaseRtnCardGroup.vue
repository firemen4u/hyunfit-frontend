<script setup>
import HeartSvg from '@/module/@base/svg/HeartSvg.vue'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
import { FILE_SERVER_HYUNFIT_URL } from '@/config'

const props = defineProps({
  routines: Array,
})

function srcUrlOf(rtnSeq) {
  return `${FILE_SERVER_HYUNFIT_URL}/routine_thumbnail_${rtnSeq}.jpg`
}
</script>
<template>
  <div
    class="rtn-card-group-container px-5 grid grid-cols-4 gap-0 justify-items-center"
  >
    <div
      v-for="data in routines"
      :key="data.rtnSeq"
      class="rtn-card rounded-lg overflow-hidden shadow-md my-3"
    >
      <img
        class="cover-image w-full object-cover"
        :src="srcUrlOf(data.rtnSeq)"
        alt="이미지"
      />
      <div class="px-4 pb-2 pt-2">
        <div class="content-wrapper p-1">
          <div class="flex items-start">
            <div class="text-base rtn-card-title font-black self-center">
              {{ data.rtnName }}
            </div>
            <BaseLabel class="ml-1 mt-0.5 px-2 py-1"
              >{{ data.rtnDurationInMin }}분</BaseLabel
            >
          </div>

          <div class="flex items-center my-1 mt-2">
            <div
              class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-600 px-2 py-1 mr-1"
            >
              <HeartSvg :size="16"></HeartSvg>
              <div class="text-xs ml-0.5">{{ data.rtnCaloriesBurnt }} Kcal</div>
            </div>
            <div
              class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
            >
              <RewardSvg :size="16"></RewardSvg>

              <div class="text-xs ml-0.5">포인트 {{ data.rtnRewardPoint }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rtn-card {
  width: 250px;
  height: 240px;
}
.cover-image {
  height: 130px;
}
.rtn-card-title {
  max-width: 165px;
}
</style>
