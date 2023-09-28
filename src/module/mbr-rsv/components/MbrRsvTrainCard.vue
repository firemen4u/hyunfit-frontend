<template>
  <div
    class="mbr-rsv-upcomming-rsv-item-card flex flex-col border-0 border-gray-400 rounded-lg m-2 py-2 px-4 bg-gray-100 shadow-lg"
    style="width: 500px"
  >
    <div class="">
      <div class="flex flex-col">
        <div
          class="flex flex-row justify-between mb-1 items-center border-soild border-b-[2px] pb-2"
        >
          <p
            class="text-xs rounded-lg text-center text-white w-[50px] bg-[#021f3d] py-[4px]"
          >
            D {{ daysDiff }}
          </p>
          <v-btn
            class="float-right bg-primary rounded-lg pt-0.5 pb-0.5 pr-3 pl-3"
            @click="enterPtRoom"
            size="small"
          >
            입장하기
          </v-btn>
        </div>
        <div class="text-gray-900 font-bold mb-2 flex justify-between">
          <div class="flex items-center">
            <p class="train-type text-xl font-bold mr-2 align-middle">
              {{ props.responseData.trnTypeName }}
            </p>
            <p class="train-datetime text-xs self-end text-gray-500">
              {{
                dateUtil.timestampToFullDate(
                  props.responseData.ptReservationDate
                )
              }}
            </p>
          </div>
          <!--          <button-->
          <!--              class="text-gray-400 text-xl font-bold"-->
          <!--              @click="showDetailModal"-->
          <!--          >-->
          <!--          </button>-->
          <ReservaionDetailModal
            :show="showDetail"
            :reservationData="selectedReservation"
            @close="showDetail = false"
          />
        </div>
      </div>
    </div>
    <div class="rsv-train-info w-84 flex leading-normal rounded-r-lg">
      <div
        class="trainer-profile-img h-24 w-24 bg-cover overflow-hidden rounded-lg mr-4"
        :style="`background-image: url('${props.responseData.trnProfileUrl}')`"
        title="trainer profile img"
      ></div>
      <div class="w-9/12">
        <p
          class="train-trainer-name text-gray-900 text-base font-bold mb-[0.5px]"
        >
          {{ props.responseData.trnName }}
        </p>
        <p
          class="train-content h-10 w-80 text-gray-700 overflow-hidden text-sm"
        >
          {{ props.responseData.trnShortDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dateUtil from '/src/utils/date.js'
import { onMounted, ref } from 'vue'
import ReservaionDetailModal from '/src/module/mbr-rsv/components/MbrRsvDetailModal.vue'
import router, { pathNames } from '@/router'

const props = defineProps({
  responseData: Object,
})
let daysDiff = ref('')

function enterPtRoom() {
  const isConfirmed = window.confirm('입장하시겠습니까?')

  if (isConfirmed) {
    localStorage.setItem('ptSeq', props.responseData.ptSeq)
    window.open(router.resolve(pathNames.ptRoomPage.name).href, '_blank')
  }
}

function calcDay() {
  const today = new Date()
  const timeDiff = today - props.responseData.ptReservationDate
  daysDiff.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  if (daysDiff.value > 0) daysDiff.value = `+ ${daysDiff.value}`
  else if (daysDiff.value == 0) {
    daysDiff.value = `-Day`
  }
}

onMounted(() => {
  calcDay()
})
</script>

<script>
export default {
  data() {
    return {
      selectedReservation: null,
      showDetail: false,
    }
  },
  methods: {
    showDetailModal() {
      this.selectedReservation = this.$props.responseData
      this.showDetail = true
    },
  },
}
</script>
