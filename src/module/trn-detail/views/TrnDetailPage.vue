<script setup>
// https://soomgo.com/profile/users/195673?prev=searchPro&hasFilter=false&serviceSelected=true&from=pro_list&serviceInfo=%7B%22id%22%3A88,%22name%22%3A%22%ED%8D%BC%EC%8A%A4%EB%84%90%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%28PT%29%22,%22slug%22%3A%22%ED%8D%BC%EC%8A%A4%EB%84%90%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%22%7D
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { BaseRating } from '/src/module/@base/components'
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import TrnDetailTimeslotContainer from '@/module/trn-detail/components/TrnDetailTimeslotContainer.vue'
import BaseChipGroup from '@/module/@base/components/BaseChipGroup.vue'
import {
  getTrnDetail,
  postPersonalTraining,
  getTrnAllReservedTimeslots,
} from '@/module/trn-detail/services/trnDetailApi'

import UiHandler from '@/module/trn-detail/services/trnDetailUiHandler'

import ReviewStickerGroup from '@/module/trn-detail/components/TrnDetailReviewStickerGroup.vue'
import { useRoute } from 'vue-router'
import BaseCompactRating from '@/module/@base/components/BaseCompactRating.vue'
import QnASection from '@/module/trn-detail/components/TrnDetailQnASection.vue'
import TrnDetailDateUtils from '@/module/trn-detail/services/trnDetailDateUtils'
import PtReservationConfirmLoadingModal from '@/module/mbr-rsv-completion/components/PtReservationConfirmLoadingModal.vue'
import {
  ptReservationOptions,
  trnCertificatesSrc,
} from '@/module/trn-detail/stores/trnDetailCommon'
import ReportDateUtils from '@/module/report/services/reportDateUtils'
import ApiClient from '@/services/api'

let trnData = ref([])
const route = useRoute()

let sectionFocus = ref(1)
const trnDetailPageDatePicker = ref(null)
const dateSelected = ref(null)
const timeSelected = ref('')
const reservedTimeslots = ref([])
const datetimeSelected = computed(() => {
  if (dateSelected.value && timeSelected.value) {
    return TrnDetailDateUtils.toDateFromDateAndTimeStr(
      dateSelected.value,
      timeSelected.value
    )
  }
  return null
})

let timeslotsLoading = ref(false)
let ptReservationOptionSelected = ref([])
let reservationConfirmLoading = ref(false)
let reservationFailureReason = ref('')
let reservationResultModalOpen = computed(() => {
  return (
    reservationConfirmLoading.value || reservationFailureReason.value !== ''
  )
})
let lazyLoadedProfileImageUrl = ref(null)
const hasProfileImage = ref(true)
const profileDialogOpen = ref(false)

const userData = ref(null)

function setDefaultBanner(e) {
  if (e.target.src === null) return
  hasProfileImage.value = false
}

function openProfileDialog() {
  profileDialogOpen.value = true
}

function okClickedOnReservationResultModal() {
  reservationConfirmLoading.value = false
  reservationFailureReason.value = ''
}
async function reloadTimeslots(date) {
  timeslotsLoading.value = true
  timeSelected.value = null
  ptReservationOptionSelected.value = []
  let params = TrnDetailDateUtils.toTimeslotSearchDTO(date)
  let result = await getTrnAllReservedTimeslots(route.params.trnId, params)
  reservedTimeslots.value = result.timeslots?.map(dateStr => {
    const timeParts = dateStr.split(' ')[1].split(':')
    return `${timeParts[0]}:${timeParts[1]}`
  })
  timeslotsLoading.value = false
}

async function confirmReservation(trnSeq) {
  reservationConfirmLoading.value = true
  const data = {
    mbrSeq: userData.value.mbrSeq,
    trnSeq: trnSeq,
    ptReservationDate: datetimeSelected.value,
    ptNoteStickers: ptReservationOptionSelected.value.join(','),
  }
  try {
    let result = await postPersonalTraining(data)
    console.log(data)
    reservationConfirmLoading.value = false
    // await router.push(pathNames.mbrRsvCompletionPage)
  } catch (error) {
    reservationFailureReason.value = error
  }
}
async function reloadDatePicker(date) {
  await UiHandler.reloadDatePicker(
    trnDetailPageDatePicker,
    route.params.trnId,
    date
  )
}
function lazyLoadProfileImage(url) {
  lazyLoadedProfileImageUrl.value = url
}
async function initPage() {
  userData.value = await ApiClient.me()
  if (!userData.value) {
    alert('유저데이터 불러오기 실패. ')
  }
  trnData.value = await getTrnDetail(route.params.trnId)
  await reloadDatePicker(new Date())
  lazyLoadProfileImage(trnData.value.trnProfileUrl)
}

onBeforeMount(() => {
  initPage()
})

onMounted(() => {
  let observer = new IntersectionObserver(
    entry => {
      entry.forEach(section => {
        if (section.isIntersecting) {
          sectionFocus.value = parseInt(
            section.target.getAttribute('section-id')
          )
        }
      })
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px -90% 0px',
    }
  )
  let sections = document.querySelectorAll('.section')
  sections.forEach(e => observer.observe(e))
})
</script>

<template>
  <BaseContainer>
    <div class="bg-white w-100 flex flex-col items-center justify-center">
      <BaseBodyWrapper
        class="trn-detail-body primary-background rounded-xl bg-white shadow-lg mt-3"
      >
        <div class="training-detail-class-banner py-12 px-10 rounded-t-xl" />
        <div class="px-10 bg-white">
          <div class="relative h-[100px]">
            <div class="profile flex">
              <div v-if="hasProfileImage">
                <button @click="openProfileDialog()">
                  <img
                    class="rounded-lg border-white border-2 w-40 h-40 object-cover border-solid"
                    :src="lazyLoadedProfileImageUrl"
                    alt=""
                    @error="e => setDefaultBanner(e)"
                  />
                </button>
                <v-dialog
                  v-model="profileDialogOpen"
                  class="trn-detail-profile-dialog"
                  width="auto"
                >
                  <img
                    class="dialog-img rounded-lg"
                    :src="lazyLoadedProfileImageUrl"
                    alt=""
                    @error="e => setDefaultBanner(e)"
                  />
                </v-dialog>
              </div>
              <div v-else>
                <img
                  class="rounded-lg border-white border-2 w-40 h-40 border-solid"
                  src="/src/assets/images/default-user-profile.png"
                  alt=""
                />
              </div>

              <div class="flex flex-col justify-end mb-3 ml-6">
                <div class="text-3xl font-black">{{ trnData.trnName }}</div>
                <div class="text-lg mt-2">{{ trnData.trnTypeName }}</div>
              </div>
            </div>
          </div>
          <div class="flex text-black justify-between">
            <div class="profile-container mr-10">
              <div class="text-neutral-700 pt-2 h-[80px]">
                {{ trnData.trnShortDescription }}
              </div>
              <div
                class="summary-container bg-gray-100 py-6 flex justify-around rounded-lg mb-10"
              >
                <div
                  class="flex flex-col items-center"
                  v-if="trnData.trnPtCount"
                >
                  <div class="text-xs">수업</div>
                  <div class="text-2xl font-black">
                    {{ trnData.trnPtCount }}회
                  </div>
                </div>
                <div
                  class="flex flex-col items-center"
                  v-if="trnData.reviews?.length"
                >
                  <div class="text-xs">리뷰</div>
                  <BaseCompactRating
                    :rating="trnData.averageReviewRating"
                    :reviewCount="trnData.reviews?.length"
                    :icon-size="24"
                    font-size="2xl"
                    :font-weight="900"
                  ></BaseCompactRating>
                </div>
                <div class="flex flex-col items-center">
                  <div class="text-xs">총 경력</div>
                  <div class="text-2xl font-black">
                    {{ trnData.trnExperienceYear }}년
                  </div>
                </div>
              </div>
              <div class="info-container">
                <!-- Nav Bar-->
                <div class="info-navbar bg-white">
                  <div class="flex">
                    <div
                      class="mr-8 p-2"
                      :class="
                        sectionFocus === 1
                          ? 'font-black border-b-2 border-black'
                          : 'text-neutral-500'
                      "
                    >
                      트레이너 정보
                    </div>
                    <div
                      class="mr-8 p-2"
                      :class="
                        sectionFocus === 2
                          ? 'font-black border-b-2 border-black'
                          : 'text-neutral-500'
                      "
                    >
                      리뷰
                    </div>
                    <div
                      class="mr-8 p-2"
                      :class="
                        sectionFocus === 3
                          ? 'font-black border-b-2 border-black'
                          : 'text-neutral-500'
                      "
                    >
                      질문답변
                    </div>
                  </div>
                  <hr class="solid" />
                </div>

                <!--  트레이너 정보 시작-->
                <div class="section" section-id="1">
                  <div class="info-item mt-10 mb-16">
                    <div class="text-xl font-black mb-2">트레이너 정보</div>
                    <div>
                      총 경력 <span>{{ trnData.trnExperienceYear }}년</span>
                    </div>
                    <div>
                      연락 가능 시간
                      <span>{{ trnData.trnAvailableTime }}</span>
                    </div>
                  </div>
                  <div class="trainer-about mb-16">
                    <div class="text-xl font-black mb-2">트레이너 소개</div>
                    <div
                      v-html="trnData.trnAbout?.replaceAll('\n', '<br>')"
                    ></div>
                  </div>
                  <div class="certification-list mb-16">
                    <div class="text-xl font-black mb-2">자격증 및 서류</div>
                    <div class="flex">
                      <div
                        class="h-28 w-28 border-2 border-neutral-100 rounded-lg mr-4 flex itmes-center"
                        v-for="(c, i) in trnCertificatesSrc"
                        :key="i"
                      >
                        <img :src="c" alt="" class="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="review-container section mb-20" section-id="2">
                  <div class="text-xl font-black mb-2">리뷰</div>
                  <div class="review-nav">
                    <div class="flex items-center">
                      <div class="text-[40px] font-black">
                        {{ trnData.averageReviewRating }}
                      </div>
                      <div class="ml-4">
                        <BaseRating
                          icon-size=""
                          v-model="trnData.averageReviewRating"
                          readonly
                        />
                        <div class="text-sm">
                          {{ trnData.reviews?.length }}개 리뷰
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(review, i) in trnData.reviews"
                    :key="i"
                    class="review-container mt-10"
                  >
                    <div class="review-item">
                      <div class="flex items-center">
                        <div class="mr-3 font-black">
                          {{ review.mbrName }}
                        </div>
                        <BaseCompactRating
                          readonly
                          :rating="review.ptrRating"
                          :icon-size="16"
                          :count-size="14"
                        ></BaseCompactRating>
                      </div>

                      <div class="mt-1 text-xs text-gray-400">
                        {{
                          ReportDateUtils.timestampToFullDate(
                            review.ptrCreationDate
                          )
                        }}
                      </div>
                      <div class="my-3">{{ review.ptrContent }}</div>

                      <ReviewStickerGroup :stickers="review.ptrStickers" />
                    </div>
                  </div>
                </div>
                <div class="qna-container section mb-20" section-id="3">
                  <div class="text-xl font-black mb-2">질문답변</div>
                  <QnASection />
                </div>
              </div>
            </div>

            <div class="pt-aside mt-[76px]">
              <div class="text-xl font-black mb-2">클래스 예약하기</div>
              <div class="text-sm text-neutral-600 mb-3">
                트레이닝 받을 날짜와 시간을 선택해 주세요!
              </div>
              <div
                class="trn-detail-date-picker-wrapper"
                ref="trnDetailPageDatePicker"
              >
                <v-locale-provider locale="ko">
                  <v-date-picker
                    v-model="dateSelected"
                    hide-actions
                    class="trn-detail-date-picker"
                    show-adjacent-months
                    max-width="100%"
                    :min="Date.now()"
                    color="#D23361"
                    @update:modelValue="date => reloadTimeslots(date)"
                    @update:displayDate="date => reloadDatePicker(date)"
                  ></v-date-picker
                ></v-locale-provider>
              </div>
              <div class="timeslot-container mt-3">
                <div v-if="dateSelected">
                  <TrnDetailTimeslotContainer
                    :modelValue="timeSelected"
                    @update:modelValue="value => (timeSelected = value)"
                    :disabled="reservationConfirmLoading"
                    :reservedTimeslots="reservedTimeslots"
                  />
                </div>
              </div>
              <div v-if="timeSelected" class="option-container mt-10">
                <div class="text-xl font-black mb-2">전달사항</div>
                <div class="text-sm text-neutral-600">
                  더욱 개인화된 트레이닝을 받을 수 있어요!
                </div>
                <div class="chips-wrapper mt-3">
                  <BaseChipGroup
                    v-model="ptReservationOptionSelected"
                    :items="ptReservationOptions"
                    :disabled="reservationConfirmLoading"
                    :filter="true"
                    :font-size="11"
                  />
                </div>
              </div>
              <v-btn
                v-if="timeSelected"
                :loading="reservationConfirmLoading"
                :disabled="reservationConfirmLoading"
                color="primary"
                height="50"
                class="w-full mt-10"
                @click="confirmReservation(trnData.trnSeq)"
              >
                <div class="font-bold">
                  {{ TrnDetailDateUtils.formattedDatetime(datetimeSelected) }}
                </div>
              </v-btn>

              <PtReservationConfirmLoadingModal
                v-model="reservationResultModalOpen"
                :failure-reason="reservationFailureReason"
                @click:ok="okClickedOnReservationResultModal"
              />
            </div>
          </div>
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<style scoped>
.trn-detail-body {
  z-index: 2;
}
.dialog-img {
  width: 30vw;
}
hr.solid {
  border-top: 1px solid #d5d5d5;
}
.info-navbar {
  position: sticky;
  top: 64px;
  z-index: 10;
}
.profile-container {
  width: 680px;
}
.pt-aside {
  width: 280px;
  top: 20px;
}

.training-detail-class-banner {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position-y: -160px;
}

.profile {
  position: absolute;
  top: -70px;
}
</style>

<style>
.primary-background {
  position: relative;
}

.primary-background::after,
.primary-background::before {
  content: '';
  position: absolute;
  z-index: -1;
  width: 1115px;
  height: 575px;
  -webkit-filter: blur(160px);
  filter: blur(160px);
}

.primary-background::before {
  opacity: 0.2;
  top: 500px;
  left: -600px;
  -webkit-transform: rotate(144deg);
  transform: rotate(144deg);
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(38%, #9643ff),
    color-stop(50%, #43b0ff),
    color-stop(74%, rgba(72, 184, 236, 0.9)),
    color-stop(120%, rgba(116, 255, 67, 0))
  );
  background: linear-gradient(
    270deg,
    #9643ff 38%,
    #43b0ff 50%,
    rgba(72, 184, 236, 0.9) 74%,
    rgba(116, 255, 67, 0) 120%
  );
}

.primary-background::after {
  top: -500px;
  left: 100%;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(66%, #43b0ff),
    color-stop(120%, rgba(116, 255, 67, 0))
  );
  background: linear-gradient(270deg, #43b0ff 66%, rgba(116, 255, 67, 0) 120%);
}

.trn-detail-date-picker .trn-detail-disabled-btn {
  cursor: default;
}

.trn-detail-date-picker .trn-detail-disabled-btn .v-btn__overlay {
  background-color: rgba(161, 113, 113, 0) !important;
}
.trn-detail-date-picker .trn-detail-disabled-btn .v-btn__content {
  color: rgba(0, 0, 0, 0.2) !important;
}

.trn-detail-date-picker .v-date-picker-month__days {
  flex-grow: 0;
  flex-shrink: 0;
  grid-row-gap: 0;
  grid-column-gap: 8px;
}
.trn-detail-date-picker-wrapper .v-picker-title {
  display: none;
}
.trn-detail-date-picker-wrapper .v-date-picker-header {
  display: none;
}
.trn-detail-date-picker .v-date-picker-controls {
  margin-bottom: 10px;
  padding-inline-start: 14px;
}

.trn-detail-date-picker .v-date-picker-controls > button {
  display: none;
}
.trn-detail-date-picker .v-date-picker-controls .v-date-picker-controls__date {
  font-size: 1rem;
  font-weight: 800;
}
.trn-detail-date-picker .v-date-picker-month__day {
  height: auto;
  width: auto;
}

.trn-detail-date-picker .v-date-picker-month__day .v-btn {
  height: 30px;
  width: 30px;
  font-size: 11px;
  border-radius: 30%;
}
.trn-detail-date-picker .v-date-picker-month__weekday {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 700;
}
.trn-detail-date-picker.v-picker.v-sheet {
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);

  border-radius: 8px;
}
.trn-detail-date-picker .v-date-picker-month {
  padding: 8px 0;
  min-width: auto;
}
.trn-detail-date-picker .v-btn--active {
  font-size: 14px;
  font-weight: 800;
}

.trn-detail-date-picker .v-btn--icon {
}
</style>
