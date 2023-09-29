<template>
  <BaseContainer>
    <div class="w-100 flex justify-center primary-background">
      <BaseBodyWrapper>
        <div
          class="mbr-rsv-container w-full mt-3 bg-white rounded-xl shadow-lg pb-10"
          v-if="reservingResponse !== null"
        >
          <div
            class="mbr-rsv-banner-container h-[200px] overflow-hidden relative rounded-t-xl"
          >
            <div
              class="banner-img-cover w-full h-full absolute top-0 flex items-center mt-3"
            >
              <div class="banner-img-cover-text py-12 px-10 mb-5">
                <p class="text-4xl font-black mt-5 text-[#021f3d]">
                  나의 트레이닝 스케쥴
                </p>
                <p class="text-2xl font-bold mt-5 text-[#021f3d]">
                  더 강해지는 나만의 길, 함께 달려요!
                </p>
              </div>
            </div>
          </div>

          <div
            class="mbr-rsv-upcomming-rsv-container w-full p-3 border-b-0 border-gray-200 mt-2"
          >
            <div>
              <p class="text-3xl font-bold mt-2 mb-6 ml-3">
                예약 중 트레이닝 클래스
              </p>
            </div>
            <div
              class="mbr-rsv-upcomming-rsv-item flex flex-wrap justify-start ml-2"
              title="예약한 트레이너의 카드"
              v-if="reservingResponse.personalTrainingDTOList.length"
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
            <div v-else class="h-[200px] flex justify-center items-center">
              <p class="text-2xl text-gray-500">예약중인 클래스가 없습니다.</p>
            </div>
          </div>
          <div class="mbr-rsv-history-contaioner" title="예약 내역 카드">
            <div class="mbr-rsv-history-item mt-[40px] ml-3 mb-1">
              <p class="text-3xl font-bold mb-6 ml-3">지난 트레이닝 클래스</p>

              <div v-if="reservedResponse?.personalTrainingDTOList.length">
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
              </div>
              <div v-else class="h-[300px] flex justify-center items-center">
                <p class="text-2xl text-gray-500">
                  지난 트레이닝 클래스 기록이 없습니다.
                </p>
              </div>
              <template class="border-solid border-4 border-orange-400">
              </template>
            </div>
          </div>
          <div class="mt-5 mb-5">
            <BasePagination v-model="currentPage" :total-pages="totalPages" />
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
    </div>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { ref, onBeforeMount, computed, watch } from 'vue'
import MbrRsvTrainCard from '/src/module/mbr-rsv/components/MbrRsvTrainCard.vue'
import MbrRsvHistoryCard from '../components/MbrRsvHistoryCard.vue'
import MbrRsvReviewModal from '/src/module/mbr-rsv/components/MbrRsvReviewModal.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import ApiClient from '/src/services/api.js'

let memberSource = ''
let selectedSeq = ref('')
const reservingResponse = ref(null)
const reservedResponse = ref(null)
const modalActive = ref(false)

const currentPage = ref(1)
const itemsTotalPage = ref(null)

function toggleModal(ptSeq) {
  selectedSeq.value = ptSeq
  modalActive.value = !modalActive.value
}

const totalPages = computed(() => {
  console.log(Math.ceil(itemsTotalPage.value.mbrPastPtCount / 5))
  return Math.ceil(itemsTotalPage.value.mbrPastPtCount / 5)
})

watch(currentPage, newVal => {
  getNextPt()
})

async function getNextPt() {
  const paramsReserved = {
    page: currentPage.value,
    order: 'desc',
    ptReservationStatus: 0,
  }
  try {
    reservedResponse.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings`,
      { params: paramsReserved }
    )
  } catch (error) {
    console.error('다음 페이지 API 요청 실패:', error)
  }
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
  } catch (error) {
    console.log('update reserved api 실패!')
  }
}

async function init() {
  try {
    memberSource = await ApiClient.get('/members/me')

    itemsTotalPage.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings/count`
    )

    const paramsReserving = {
      page: 1,
      order: 'asc',
      ptReservationStatus: 1,
    }
    reservingResponse.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings`,
      { params: paramsReserving }
    )

    const paramsReserved = {
      page: currentPage.value,
      order: 'desc',
      ptReservationStatus: 0,
    }
    reservedResponse.value = await ApiClient.get(
      `/members/${memberSource.mbrSeq}/personal-trainings`,
      { params: paramsReserved }
    )

    console.log('reserving', reservingResponse.value)
    console.log('reserved', reservedResponse.value)
    console.log(
      'reserved total items',
      reservedResponse.value.personalTrainingDTOList.length
    )
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}

onBeforeMount(() => {
  init()
})
</script>
<style scoped>
.mbr-rsv-banner-container {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
}
.MbrRsvTrainCard:hover {
  transform: translateY(-2px);
}
</style>
