<template>
  <BaseContainer>
    <BaseBodyWrapper>
      <div
        class="mbr-rsv-container w-full h-full"
        v-if="reservingResponse !== null"
      >
        <div class="mbr-rsv-banner-container h-1/5 overflow-hidden relative">
          <div class="banner-img w-full h-96 hover:h-96">
            <img
              :src="reservingResponse.personalTrainingDTOList[0].trnProfileUrl"
              alt="Option 1"
              class="option-image w-full"
            />
          </div>
          <div
            class="banner-img-cover w-full h-full bg-black absolute top-0 opacity-50 flex justify-center items-center"
          >
            <div class="banner-img-cover-text text-left mr-96">
              <p class="text-4xl">나의 트레이닝 스케쥴</p>
              <p class="text-base">더 강해지는 나만의 길, 함께 달려요!</p>
            </div>
          </div>
        </div>

        <div
          class="mbr-rsv-upcomming-rsv-container w-full p-3 border-b-0 border-gray-200 mt-10"
        >
          <div
            class="mbr-rsv-upcomming-rsv-item flex flex-wrap justify-between"
            title="예약한 트레이너의 카드"
          >
            <MbrRsvTrainCard
              v-for="training in reservingResponse.personalTrainingDTOList.slice(
                0,
                2
              )"
              :key="training.id"
              :responseData="training"
            ></MbrRsvTrainCard>
          </div>
        </div>
        <div class="mbr-rsv-history-contaioner" title="예약 내역 카드">
          <div class="mbr-rsv-history-item m-3">
            <p class="text-2xl font-bold mt-10 mb-8 ml-3">지난 예약</p>
            <div
              v-for="training in reservedResponse?.personalTrainingDTOList"
              :key="training.id"
              class="mbr-rsv-history-card"
            >
              <MbrRsvHistoryCard
                :responseData="training"
                @toggle-modal="toggleModal(training.ptSeq)"
              />
            </div>
            <template class="border-solid border-4 border-orange-400">
              <div></div>
            </template>
          </div>
        </div>
      </div>
      <MbrRsvReviewModal
        @action:cancel="toggleModal()"
        @action:save="saveAndReload()"
        :modalActive="modalActive"
        :responseData="reservedResponse"
        :targetSeq="selectedSeq"
      >
      </MbrRsvReviewModal>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { ref, onBeforeMount } from 'vue'
import MbrRsvTrainCard from '/src/module/mbr-rsv/components/MbrRsvTrainCard.vue'
import MbrRsvHistoryCard from '../components/MbrRsvHistoryCard.vue'
import MbrRsvReviewModal from '/src/module/mbr-rsv/components/MbrRsvReviewModal.vue'
import ApiClient from '/src/services/api.js'

let memberSource = ''
let selectedSeq = ref('')
const reservingResponse = ref(null)
const reservedResponse = ref(null)
const modalActive = ref(false)

function toggleModal(ptSeq) {
  selectedSeq.value = ptSeq
  modalActive.value = !modalActive.value
}

async function saveAndReload() {
  toggleModal()
  const paramsReserved = {
    page: 1,
    order: 'desc',
    ptReservationStatus: 0,
  }
  try {
    reservedResponse.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings`,
      { params: paramsReserved }
    )

    console.log('updated', reservedResponse.value)
  } catch (error) {
    console.log('update reserved api 실패!')
  }
}

async function init() {
  try {
    memberSource = await ApiClient.get('/members/me')

    const paramsReserving = {
      page: 1,
      order: 'asc',
      ptReservationStatus: 1,
    }
    const paramsReserved = {
      page: 1,
      order: 'desc',
      ptReservationStatus: 0,
    }

    reservingResponse.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings`,
      { params: paramsReserving }
    )

    reservedResponse.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings`,
      { params: paramsReserved }
    )

    console.log('reserving', reservingResponse.value)
    console.log('reserved', reservedResponse.value)
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}

onBeforeMount(() => {
  init()
})
</script>
<style scoped>
.MbrRsvTrainCard:hover {
  transform: translateY(-2px);
}
</style>
