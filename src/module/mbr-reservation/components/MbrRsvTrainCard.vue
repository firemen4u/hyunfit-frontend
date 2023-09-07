<template>
  <div
    class="mbr-rsv-upcomming-rsv-item-card flex border-0 border-gray-400 rounded-lg shadow-xl m-2"
  >
    <div
      class="trainer-profile-img h-full w-48 bg-cover overflow-hidden rounded-l-lg"
      :style="`background-image: url('${trainerProfileImageUrl}')`"
      title="trainer profile img"
    ></div>
    <div
      class="rsv-train-info w-84 bg-white p-4 flex flex-col justify-between leading-normal rounded-r-lg"
    >
      <div class="mb-5 w-72">
        <p
          class="train-d-day text-sm w-12 text-gray-600 items-center rounded-xl text-center text-white bg-primary mb-2"
        >
          {{ trainDday }}
        </p>
        <div class="text-gray-900 font-bold mb-2 flex justify-between">
          <div class="flex flex-col">
            <p class="train-type text-xl font-bold">{{ trainType }}</p>
            <p class="train-datetime text-base">{{ trainDatetime }}</p>
          </div>
          <p class="text-gray-400 text-2xl font-bold">></p>
        </div>
        <div>
          <p class="train-trainer-name text-gray-900 text-base font-bold mb-2">
            {{ trainTrainerName }}
          </p>
          <p class="train-content text-gray-700">
            {{ trainContent }}
          </p>
        </div>
      </div>
      <div class="flex items-center">
        <img
          class="w-10 h-10 rounded-full mr-4"
          :src="avatarImageUrl"
          alt="Avatar of Jonathan Reinink"
        />
        <div class="text-sm">
          <p class="text-gray-900 leading-none">지난 수업 일자</p>
          <p class="text-gray-600">{{ lastClassDate }}</p>
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
