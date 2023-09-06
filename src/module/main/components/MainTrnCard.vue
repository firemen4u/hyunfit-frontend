<template>
  <BaseCardTemplate>
    <div class="flex justify-between">
      <div>
        <img
          :src="src"
          class="rounded-full"
          style="height: 70px; width: 70px"
        />
      </div>
      <div>
        <div class="flex">
          <StarSvg size="20" class="self-center"></StarSvg>
          <div class="rating-value-wrapper font-extrabold text-lg self-center">
            4.9
          </div>
          <div class="text-gray-400 font-thin text-xxs self-end ml-1 mb-1">
            (10)
          </div>
        </div>
      </div>
    </div>
    <div class="p-2">
      <div class="text-md font-black">에이블짐 장준하 팀장</div>
      <div class="text-sm font-medium">퍼스널트레이닝(PT)</div>
      <div class="text-xs font-medium mt-5 text-gray-600">경력 7년</div>
    </div>
  </BaseCardTemplate>
</template>

<script setup>
import BaseCardTemplate from '@/module/@base/views/BaseCardTemplate.vue'
import StarSvg from '@/module/@base/svg/StarSvg.vue'
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
