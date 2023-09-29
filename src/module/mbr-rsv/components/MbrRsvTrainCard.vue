<template>
  <div class="flex flex-col">
    <div class="mb-2">
      <p
        class="text-xs rounded-lg text-center text-white w-[50px] bg-[#d23361] py-[4px]"
      >
        {{ daysDiff }}
      </p>
    </div>
    <div
      class="mbr-rsv-upcomming-rsv-item-card flex flex-col border-0 border-gray-400 rounded-lg py-2 px-2 bg-gray-100 shadow-lg hover:bg-gray-300"
      style="width: 490px"
      @click="enterPtRoom"
    >
      <div class="card-header w-[480px] my-1 mb-2">
        <div class="flex flex-col">
          <div class="text-gray-900 font-bold flex justify-between">
            <div class="flex items-center">
              <p class="train-type text-lg font-black mr-2 align-middle">
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
            <div class="ml-15">
              <v-btn
                class="float-right bg-primary rounded-lg w-[70px]"
                @click="enterPtRoom"
                size="small"
              >
                입장하기
              </v-btn>
            </div>
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
          class="trainer-profile-img h-24 w-24 bg-cover overflow-hidden rounded-lg mr-4 mb-1"
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
            class="train-content h-10 w-[360px] text-gray-700 overflow-hidden text-sm"
          >
            {{ props.responseData.trnShortDescription }}
          </p>
        </div>
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
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

  const reservationDate = new Date(props.responseData.ptReservationDate)
  reservationDate.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

  // 오늘 날짜가 아니면 alert 창을 표시하고 함수를 종료
  if (today.getTime() !== reservationDate.getTime()) {
    alert('오늘의 예약중인 클래스만 입장할 수 있습니다.')
    return
  }

  const isConfirmed = window.confirm('입장하시겠습니까?')

  if (isConfirmed) {
    localStorage.setItem('ptSeq', props.responseData.ptSeq)
    window.open(router.resolve(pathNames.ptRoomPage.name).href, '_blank')
  }
}

function calcDay() {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

  const reservationDate = new Date(props.responseData.ptReservationDate)
  reservationDate.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

  const timeDiff = reservationDate - today
  daysDiff.value = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  if (daysDiff.value > 1) {
    daysDiff.value = `D-${daysDiff.value}` // 예약날짜가 미래
  } else if (daysDiff.value === 0) {
    daysDiff.value = '오늘' // 예약날짜가 오늘
  } else if (daysDiff.value === 1) {
    daysDiff.value = '내일' // 예약날짜가 내일
  } else {
    daysDiff.value = `+ ${-daysDiff.value}` // 예약날짜가 과거
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
