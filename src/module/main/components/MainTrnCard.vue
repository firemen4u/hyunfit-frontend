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
        <BaseRating compact :rating="4.9" :reviewCount="10" />
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
import { BaseCardTemplate, BaseRating } from '@/module/@base/components'
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
