<template>
  <div
    class="mbr-rsv-upcomming-rsv-item-card flex flex-col border-0 border-gray-400 rounded-lg shadow-xl m-2 p-4"
    style="width: 500px"
  >
    <div class="">
      <div class="flex flex-col">
        <div class="">
          <p
            class="text-sm text-gray-600 items-center rounded-xl text-center text-white bg-primary mb-1 pt-0.5 pb-0.5 pr-3 pl-3"
            style="display: inline-block; min-width: auto"
          >
            {{ trainDday }}
          </p>
        </div>
        <div class="text-gray-900 font-bold mb-2 flex justify-between">
          <div class="flex items-center">
            <p class="train-type text-xl font-bold mr-4 align-middle">
              {{ trainType }}
            </p>
            <p class="train-datetime text-base align-middle text-gray-500">
              {{ trainDatetime }}
            </p>
          </div>
          <p class="text-gray-400 text-xl font-bold">></p>
        </div>
      </div>
    </div>
    <div class="rsv-train-info w-84 bg-white flex leading-normal rounded-r-lg">
      <div
        class="trainer-profile-img h-24 w-24 bg-cover overflow-hidden rounded-lg mr-4"
        :style="`background-image: url('${trainerProfileImageUrl}')`"
        title="trainer profile img"
      ></div>
      <div class="">
        <div>
          <p class="train-trainer-name text-gray-900 text-base font-bold mb-2">
            {{ trainTrainerName }}
          </p>
          <p class="train-content text-gray-700">
            {{ trainContent }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  profileImageUrl: String,
  trainerProfileImageUrl: String,
  trainDday: String,
  trainType: String,
  trainDatetime: String,
  trainTrainerName: String,
  trainContent: String,
  avatarImageUrl: String,
  lastClassDate: String,
})
</script>
