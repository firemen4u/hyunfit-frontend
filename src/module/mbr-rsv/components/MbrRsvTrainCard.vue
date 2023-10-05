<template>
  <div class="flex flex-col">
    <p
      class="mb-2 text-xs rounded text-center text-white w-[50px] bg-[#d23361] py-[4px]"
    >
      {{ daysDiff }}
    </p>
    <div
      class="flex flex-col bg-white hover:bg-red rounded-lg py-3 px-4 shadow-md cursor-pointer"
      style="width: 500px"
      @click="openLiveClassModal"
    >
      <div class="card-header">
        <div class="flex flex-col">
          <div class="text-gray-900 font-bold flex justify-between">
            <div class="flex items-baseline mb-2">
              <div class="train-type text-lg font-black mr-2 align-middle">
                {{ props.responseData.trnTypeName }}
              </div>
              <div class="train-datetime text-xs text-gray-500">
                {{
                  dateUtil.timestampToFullDate(
                    props.responseData.ptReservationDate
                  )
                }}
              </div>
            </div>
            <div class="ml-15">
              <!-- <v-btn
                class="float-right bg-primary rounded-lg w-[70px]"
                @click="enterPtRoom"
                size="small"
              >
                입장하기
              </v-btn> -->
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
          class="trainer-profile-img h-20 w-20 bg-cover overflow-hidden rounded-lg mr-4 mb-1"
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
    <v-dialog v-model="enterLiveClassModalOpen" width="500">
      <v-card>
        <div class="px-5 py-5">
          <div>
            <div class="mb-5 text-lg">
              {{ hoursLeft() }}
            </div>
            <div class="text-xl mb-5">
              <span class="font-black mr-1">{{ responseData.trnName }}</span
              >트레이너님과의
              <span class="font-black">{{ responseData.trnTypeName }}</span>
              클래스에
              <div>입장하시겠습니까?</div>
            </div>
          </div>
          <div class="flex flex-col gap-y-1">
            <v-btn
              color="primary"
              :ripple="false"
              variant="flat"
              block
              @click="enterPtRoom"
              >입장하기</v-btn
            >
            <v-btn
              color="primary"
              variant="outlined"
              block
              :ripple="false"
              @click="enterLiveClassModalOpen = false"
              >취소하기</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
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

const enterLiveClassModalOpen = ref(false)

function openLiveClassModal() {
  enterLiveClassModalOpen.value = true
}
function hoursLeft() {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

  const reservationDate = new Date(props.responseData.ptReservationDate)
  reservationDate.setHours(0, 0, 0, 0) // 시간, 분, 초, 밀리초를 0으로 설정

  const diff = (reservationDate - today) / 1000
  const days = Math.floor(diff / 86400)

  if (days >= 2) {
    return `클래스 예약 ${days}일 전 입니다.`
  }
  if (days === 1) {
    return `클래스 예약 하루 전입니다.`
  }
  if (diff < 0) {
    return '클래스 예정시간이 이미 지났습니다.'
  }
  let hours = Math.floor(diff / 3600)
  if (hours) {
    return `클래스 예약이 ${hours}시간 남았습니다.`
  }

  let minutes = Math.floor(diff % 60)
  if (minutes > 3) {
    return `클래스 입장 ${minutes}분 전입니다.`
  }
  return '클래스가 곧 시작합니다.'
}
function enterPtRoom() {
  localStorage.setItem('ptSeq', props.responseData.ptSeq)
  enterLiveClassModalOpen.value = false
  window.open(router.resolve(pathNames.ptRoomPage.name).href, '_blank')
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
