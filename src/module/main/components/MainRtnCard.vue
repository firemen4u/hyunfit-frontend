<template>
  <BaseCardTemplate :cover-src="src">
    <div class="content-wrapper p-1">
      <div class="flex items-center">
        <div class="text-lg font-black self-center">하체 근력 강화 루틴</div>
        <BaseLabel class="ml-1">22분</BaseLabel>
      </div>

      <div class="flex items-center my-1 mt-3">
        <span
          class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-600 px-2 py-1 mr-1"
        >
          <HeartSvg :size="16"></HeartSvg>
          <div class="text-xs ml-0.5">470 Kcal</div>
        </span>
        <span
          class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
        >
          <RewardSvg :size="16"></RewardSvg>

          <div class="text-xs ml-0.5">경험치 150</div>
        </span>
      </div>
    </div>
  </BaseCardTemplate>
</template>
<script setup>
import BaseCardTemplate from '@/module/@base/components/BaseCardTemplate.vue'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
import HeartSvg from '@/module/@base/svg/HeartSvg.vue'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
import TrophySvg from '@/module/@base/svg/TrophySvg.vue'

defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>
<style></style>
