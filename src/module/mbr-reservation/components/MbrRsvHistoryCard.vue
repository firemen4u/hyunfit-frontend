<template>
  <div class="mbr-rsv-history-card m-2 mb-5 p-2">
    <div class="flex items-center">
      <div
        class="h-10 w-10 rounded-full bg-cover mr-4"
        :style="`background-image: url('${profileImageUrl}')`"
        title="trainer profile img"
      ></div>
      <div class="flex-col">
        <div class="text-xl font-bold">{{ trainerName }}</div>
        <div class="text-base flex text-gray-500">
          <p>{{ `${day} | ${time}` }}</p>
        </div>
      </div>
    </div>

    <div
      class="card-in-card border border-3 border-solid border-gray-600 mt-3 p-5 rounded-md shadow-md"
    >
      <div class="flex">
        <div>{{ type }}</div>
        <div class="ml-3">
          <BaseRating :rating="5"></BaseRating>
        </div>
      </div>
      <div class="flex justify-between text-gray-500">
        <div>{{ subTitle }}</div>
        <div>{{ ptCount }}번째 수업 완료</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BaseRating } from '/src/module/@base/components'
const props = defineProps({
  profileImageUrl: String,
  trainerName: String,
  day: String,
  time: String,
  type: String,
  subTitle: String,
  ptCount: Number,
})
</script>
