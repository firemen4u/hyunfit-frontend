<script setup>
// https://soomgo.com/profile/users/195673?prev=searchPro&hasFilter=false&serviceSelected=true&from=pro_list&serviceInfo=%7B%22id%22%3A88,%22name%22%3A%22%ED%8D%BC%EC%8A%A4%EB%84%90%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%28PT%29%22,%22slug%22%3A%22%ED%8D%BC%EC%8A%A4%EB%84%90%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%22%7D
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { BaseRating } from '/src/module/@base/components'
import { ref, onMounted, onBeforeMount } from 'vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import TrnDetailTimeslotContainer from '@/module/trn-detail/components/TrnDetailTimeslotContainer.vue'
import BaseChipGroup from '@/module/@base/components/BaseChipGroup.vue'
import { getTrnDetail } from '@/module/trn-detail/services/trnDetailApi'
import ReviewStickerGroup from '@/module/trn-detail/components/ReviewStickerGroup.vue'
import { useRoute } from 'vue-router'
import BaseCompactRating from '@/module/@base/components/BaseCompactRating.vue'
import QnASection from '@/module/trn-detail/components/QnASection.vue'

let trnData = ref([])
const route = useRoute()
let options = [
  '운동이 처음이에요',
  '살을 빼고 싶어요',
  '코어를 강화하고 싶어요',
  '부상 이력이 있어요',
  '식단 조언도 함께 받고 싶어요',
]

let certificates = [
  'https://fs.hyunfit.life/api/hyunfit/file/pt-certificate-1.jpg',
  'https://fs.hyunfit.life/api/hyunfit/file/pt-certificate-2.jpg',
  'https://fs.hyunfit.life/api/hyunfit/file/pt-certificate-3.jpg',
]
let sectionFocus = ref(1)

let dateSelected = ref(null)
let timeSelected = ref('')
let optionSelected = ref([])
let reservationConfirmLoading = ref(false)
function resetDateSelected() {
  timeSelected.value = null
  optionSelected.value = []
}

function confirmReservation() {
  reservationConfirmLoading.value = true
  setTimeout(() => (reservationConfirmLoading.value = false), 3000)
}

async function initPage() {
  trnData.value = await getTrnDetail(route.params.trnId)
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
        :src="trnData.trnProfileUrl"
        alt="Banner Image"
        class="banner-img object-cover w-100"
      />
    </div>

    <BaseBodyWrapper ref="root">
      <div class="profile-image mt-40">
        <img
          class="rounded-lg border-white border-2 w-24 border-solid"
          :src="trnData.trnProfileUrl"
          alt=""
        />
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
            <div class="flex flex-col items-center">
              <div class="text-xs">수업</div>
              <div class="text-xl font-black">{{ trnData.trnPtCount }}회</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-xs">리뷰</div>
              <BaseCompactRating
                compact
                :rating="trnData.averageReviewRating"
                :reviewCount="trnData.reviews?.length"
                icon-size="sm"
                font-size="lg"
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
                    v-for="(c, i) in certificates"
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
                <div class="flex items-end">
                  <div class="text-3xl font-black">
                    {{ trnData.averageReviewRating }}
                  </div>
                  <div class="ml-4">
                    <BaseRating
                      icon-size="xs"
                      v-model="trnData.averageReviewRating"
                      readonly
                    />
                    <div class="text-xxs">
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
                    <div class="mr-5 font-black">{{ review.mbrName }}</div>
                    <div class="text-xs text-gray-400">{{ review.date }}</div>
                  </div>
                  <BaseRating
                    icon-size="xs"
                    readonly
                    v-model="review.ptrRating"
                  ></BaseRating>
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
          <div class="trn-detail-date-picker-wrapper">
            <v-locale-provider locale="ko">
              <v-date-picker
                v-model="dateSelected"
                class="trn-detail-date-picker"
                hide-actions
                show-adjacent-months
                max-width="100%"
                :min="Date.now()"
                color="#D23361"
                @update:modelValue="resetDateSelected()"
              ></v-date-picker
            ></v-locale-provider>
          </div>
          <div class="timeslot-container mt-4">
            <div v-if="dateSelected">
              <TrnDetailTimeslotContainer
                :modelValue="timeSelected"
                @update:modelValue="value => (timeSelected = value)"
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
              <BaseChipGroup v-model="optionSelected" :items="options" />
            </div>
          </div>
          <v-btn
            v-if="timeSelected"
            :loading="reservationConfirmLoading"
            color="primary"
            height="50"
            class="w-full mt-10"
            @click="confirmReservation"
          >
            <div class="py-4 text-bold">10월 22일 오후 2시 예약</div>
          </v-btn>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style scoped>
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
</style>

<style>
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
