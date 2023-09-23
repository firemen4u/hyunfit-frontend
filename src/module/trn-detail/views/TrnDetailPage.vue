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
import router, { pathNames } from '@/router'
import ReportDateUtils from '@/module/report/services/reportDateUtils'

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
  timeSelected.value = null
  ptReservationOptionSelected.value = []
  let params = TrnDetailDateUtils.toTimeslotSearchDTO(date)
  let result = await getTrnAllReservedTimeslots(route.params.trnId, params)
  reservedTimeslots.value = result.timeslots?.map(dateStr => {
    const timeParts = dateStr.split(' ')[1].split(':')
    return `${timeParts[0]}:${timeParts[1]}`
  })
}

async function confirmReservation() {
  reservationConfirmLoading.value = true
  const data = {
    mbrSeq: 1,
    trnSeq: 1,
    ptReservationDate: datetimeSelected.value,
    ptNoteStickers: ptReservationOptionSelected.value.join(','),
  }
  try {
    let result = await postPersonalTraining(data)
    reservationConfirmLoading.value = false
    await router.push(pathNames.mbrRsvCompletionPage)
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
    <div class="banner w-full flex items-center">
      <img
        v-if="hasProfileImage"
        :src="lazyLoadedProfileImageUrl"
        alt="Banner Image"
        class="banner-img object-cover w-100"
      />
      <div v-else class="banner-default-img w-100"></div>
    </div>

    <BaseBodyWrapper ref="root">
      <div class="profile-image mt-40">
        <div v-if="hasProfileImage">
          <button @click="openProfileDialog()">
            <img
              class="rounded-lg border-white border-2 w-32 border-solid"
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
            class="rounded-lg border-white border-2 w-32 border-solid"
            src="/src/assets/images/default-user-profile.png"
            alt=""
          />
        </div>
      </div>
      <div class="flex mt-6 justify-between">
        <div class="profile-container mr-10">
          <div class="profile">
            <div class="text-2xl font-black">{{ trnData.trnName }}</div>
            <div class="mt-2">{{ trnData.trnTypeName }}</div>
            <div class="text-sm mt-6 text-neutral-500">
              {{ trnData.trnShortDescription }}
            </div>
          </div>
          <div
            class="summary-container bg-neutral-50 py-6 flex justify-around rounded my-10"
          >
            <div class="flex flex-col items-center" v-if="trnData.trnPtCount">
              <div class="text-xs">수업</div>
              <div class="text-xl font-black">{{ trnData.trnPtCount }}회</div>
            </div>
            <div
              class="flex flex-col items-center"
              v-if="trnData.reviews?.length"
            >
              <div class="text-xs">리뷰</div>
              <BaseCompactRating
                :rating="trnData.averageReviewRating"
                :reviewCount="trnData.reviews?.length"
                icon-size="22"
                font-size="xl"
              ></BaseCompactRating>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-xs">총 경력</div>
              <div class="text-xl font-black">
                {{ trnData.trnExperienceYear }}년
              </div>
            </div>
          </div>

          <div class="info-container">
            <!-- Nav Bar-->
            <div class="info-navbar">
              <div class="bg-white flex">
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
                  연락 가능 시간 <span>{{ trnData.trnAvailableTime }}</span>
                </div>
              </div>
              <div class="trainer-about mb-16">
                <div class="text-xl font-black mb-2">트레이너 소개</div>
                <div v-html="trnData.trnAbout?.replaceAll('\n', '<br>')"></div>
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
                    <div class="mr-3 font-black">{{ review.mbrName }}</div>
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
        <!--        aside-->

        <div class="pt-aside h-36">
          <div class="text-lg font-black mb-2">트레이너 레슨 예약하기</div>
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
                title=""
                header=""
                @update:modelValue="date => reloadTimeslots(date)"
                @update:displayDate="date => reloadDatePicker(date)"
              ></v-date-picker
            ></v-locale-provider>
          </div>
          <div class="timeslot-container mt-4">
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
            <div class="text-md font-black mb-2">
              트레이너님이 알아야 할 사항을 알려주세요.
            </div>
            <div class="text-sm text-neutral-600">
              더욱 개인화된 트레이닝을 받을 수 있어요!
            </div>
            <div class="chips-wrapper mt-5">
              <BaseChipGroup
                v-model="ptReservationOptionSelected"
                :items="ptReservationOptions"
                :disabled="reservationConfirmLoading"
                :filter="true"
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
            @click="confirmReservation"
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
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style scoped>
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
  width: 65%;
}
.pt-aside {
  width: 30%;
  top: 20px;
}

.banner {
  position: absolute;
  top: 64px;
  height: 200px;
  z-index: -1;
  overflow-y: hidden;
}

.banner .banner-img {
  filter: blur(8px);
  height: 210px;
  object-position: 50% 20%;
}
.banner .banner-default-img {
  height: 210px;
  object-position: 50% 20%;
  background-color: #d23361;
}
</style>

<style>
.trn-detail-profile-dialog .v-overlay__scrim {
  backdrop-filter: blur(8px);
  background: none;
  opacity: 1;
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

.trn-detail-date-picker-wrapper .v-picker-title {
  display: none;
}
.trn-detail-date-picker-wrapper .v-date-picker-header {
  display: none;
}
.trn-detail-date-picker .v-date-picker-controls {
  margin-bottom: 10px;
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
  font-size: 0.75rem;
}
.trn-detail-date-picker .v-date-picker-month__weekday {
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 700;
}
.trn-detail-date-picker.v-picker.v-sheet {
  box-shadow: none;
}
.trn-detail-date-picker .v-date-picker-month {
  padding: 0;
  min-width: auto;
}
.trn-detail-date-picker .v-btn--active {
  font-size: 14px;
  font-weight: 800;
}

.trn-detail-date-picker .v-btn--icon {
  border-radius: 30%;
}
</style>
