<template>
  <BaseContainer>
    <div class="w-100 flex justify-center primary-background mb-[150px]">
      <BaseBodyWrapper>
        <div
          class="mbr-rsv-container w-full mt-3 bg-gray-50 rounded-xl shadow-lg"
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
                  My 라이브 클래스
                </p>
                <p class="text-2xl font-bold mt-5 text-[#021f3d]">
                  오늘은 어떤 클래스가 있으신가요?
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="w-full px-10 border-gray-200 my-10">
              <div>
                <p class="text-2xl font-black mb-3">다가오는 라이브 클래스</p>
              </div>
              <div
                class="mbr-rsv-upcomming-rsv-item flex flex-wrap justify-between"
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
                />
              </div>
              <div v-else class="h-[200px] flex justify-center items-center">
                <p class="text-2xl text-gray-500">
                  예약중인 클래스가 없습니다.
                </p>
              </div>
            </div>
            <hr class="mbr-hr border-[2px] rounded-xl border-gray-100 mx-10" />
            <div class="px-10 pb-10 rounded-b-2xl">
              <div class="mbr-rsv-history-container" title="예약 내역 카드">
                <div class="mbr-rsv-history-item">
                  <p class="text-2xl font-black mt-10 mb-6">
                    지난 라이브 클래스
                  </p>

                  <div v-if="reservedResponse?.personalTrainingDTOList.length">
                    <div
                      v-for="training in reservedResponse?.personalTrainingDTOList.filter(
                        pt => pt.ptReservationStatus > 2
                      )"
                      :key="training.id"
                      class="mbr-rsv-history-card"
                    >
                      <MbrRsvHistoryCard
                        :responseData="training"
                        @toggle-modal="toggleModal(training.ptSeq)"
                      />
                    </div>
                  </div>
                  <div
                    v-else
                    class="h-[300px] flex justify-center items-center"
                  >
                    <p class="text-2xl text-gray-500">
                      지난 라이브 클래스 기록이 없습니다.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 mb-5">
                <BasePagination
                  v-model="currentPage"
                  :total-pages="totalPages"
                />
              </div>
            </div>
          </div>
        </div>
        <MbrRsvReviewModal
          v-model="modalActive"
          :responseData="reservedResponse"
          :targetSeq="selectedSeq"
          @action:save="saveAndReload()"
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
let selectedSeq = ref(0)
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
