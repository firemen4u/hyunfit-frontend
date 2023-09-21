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
            Day {{ daysDiff }}
          </p>
        </div>
        <div class="text-gray-900 font-bold mb-2 flex justify-between">
          <div class="flex items-center">
            <p class="train-type text-xl font-bold mr-4 align-middle">
              {{ props.responseData.trnTypeName }}
            </p>
            <p class="train-datetime text-base align-middle text-gray-500">
              {{
                dateUtil.timestampToFullDate(
                  props.responseData.ptReservationDate
                )
              }}
            </p>
          </div>
          <button class="text-gray-400 text-xl font-bold" @click="enterPtRoom">
            >>>
          </button>
        </div>
      </div>
    </div>
    <div class="rsv-train-info w-84 bg-white flex leading-normal rounded-r-lg">
      <div
        class="trainer-profile-img h-24 w-24 bg-cover overflow-hidden rounded-lg mr-4"
        :style="`background-image: url('${props.responseData.trnProfileUrl}')`"
        title="trainer profile img"
      ></div>
      <div class="">
        <div>
          <p class="train-trainer-name text-gray-900 text-base font-bold mb-2">
            {{ props.responseData.trnName }}
          </p>
          <p class="train-content text-gray-700">
            {{ props.responseData.trainContent }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dateUtil from '/src/utils/date.js'
import { onMounted, ref } from 'vue'

const props = defineProps({
  responseData: Object,
})
let daysDiff = ref('')
function enterPtRoom() {
  localStorage.setItem('ptSeq', props.responseData.ptSeq)
  localStorage.setItem('userRole', 0)
  window.open('http://localhost:5173/PtRoom', '_blank')
}
function calcDay() {
  const today = new Date()
  const timeDiff = today - props.responseData.ptReservationDate
  daysDiff.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  if (daysDiff.value > 0) daysDiff.value = `+ ${daysDiff.value}`

  console.log('날짜 계산', daysDiff.value)
}
onMounted(() => {
  console.log('mounted')
  calcDay()
}),
  console.log('자식 컴포넌트', props.responseData)
</script>
