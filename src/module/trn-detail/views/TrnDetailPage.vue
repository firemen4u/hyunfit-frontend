<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { BaseRating, BaseLabel } from '/src/module/@base/components'
import { ref, onMounted } from 'vue'
import { EmptyStarSvg, HalfStarSvg, FullStarSvg } from '@/module/@base/svg'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import TrnDetailTimeslotContainer from '@/module/trn-detail/components/TrnDetailTimeslotContainer.vue'
import BaseCheckChip from '@/module/@base/components/BaseCheckChip.vue'

let data = {
  trainerAbout:
    '일반적인 PT는 단순 근력 강화에 목적이 집중되어 있어 사람마다 다른 신체 기능을 모두 만족시킬 수 없습니다. 이는 부상과 통증으로 이어져 꾸준한 운동과 신체 관리가 어렵게 됩니다. \n\n건강관리&운동처방 석사 출신의 사이클팀과 레슬링팀으로 두 번의 올림픽을 경험한 10년 경력의 국가대표 출신 트레이너가 1:1 맞춤 트레이닝을 설계해드립니다. \n\n뇌과학 기반 트레이닝으로 고객님 스스로 몸의 움직임을 인지하고 학습하면서 올바른 움직임 가운데 잠재 되어있던 뇌기능과 신체 발란스를 향상 시킬 수 있도록 돕습니다. \n',
  trainerRating: 4.9,
  reviewCount: 14,
  reviews: [
    {
      name: '김**',
      date: '2022.12.19',
      rating: 4.5,
      content:
        '트레이너님과 직접 뵙고 상담받았습니다. 일단 사람이 되게 좋으시고 일반적으로 헬스장 김탁구 이런 사람들 느낌 아니고 의사쌤 같이 좀 친근한 친절한 느낌입니다. 축구할때 발목 부분이 평소 약해서 근력 강화를 원했는데 운동테스트 해보시고서 허리와 엉덩이부터 키우는게 좋겠다고 하셔서 그렇게 프로그램 받았...',
    },
    {
      name: '김**',
      date: '2022.12.19',
      rating: 4.5,
      content:
        '트레이너님과 직접 뵙고 상담받았습니다. 일단 사람이 되게 좋으시고 일반적으로 헬스장 김탁구 이런 사람들 느낌 아니고 의사쌤 같이 좀 친근한 친절한 느낌입니다. 축구할때 발목 부분이 평소 약해서 근력 강화를 원했는데 운동테스트 해보시고서 허리와 엉덩이부터 키우는게 좋겠다고 하셔서 그렇게 프로그램 받았...',
    },
    {
      name: '김**',
      date: '2022.12.19',
      rating: 4.5,
      content:
        '트레이너님과 직접 뵙고 상담받았습니다. 일단 사람이 되게 좋으시고 일반적으로 헬스장 김탁구 이런 사람들 느낌 아니고 의사쌤 같이 좀 친근한 친절한 느낌입니다. 축구할때 발목 부분이 평소 약해서 근력 강화를 원했는데 운동테스트 해보시고서 허리와 엉덩이부터 키우는게 좋겠다고 하셔서 그렇게 프로그램 받았...',
    },
    {
      name: '김**',
      date: '2022.12.19',
      rating: 4.5,
      content:
        '트레이너님과 직접 뵙고 상담받았습니다. 일단 사람이 되게 좋으시고 일반적으로 헬스장 김탁구 이런 사람들 느낌 아니고 의사쌤 같이 좀 친근한 친절한 느낌입니다. 축구할때 발목 부분이 평소 약해서 근력 강화를 원했는데 운동테스트 해보시고서 허리와 엉덩이부터 키우는게 좋겠다고 하셔서 그렇게 프로그램 받았...',
    },
  ],
}

let options = [
  '운동이 처음이에요',
  '살을 빼고 싶어요',
  '코어를 강화하고 싶어요',
  '부상 이력이 있어요',
  '식단 조언도 함께 받고 싶어요',
]

let sectionFocus = ref(1)

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
        src="/src/assets/images/trainer-profile.png"
        alt="Banner Image"
        class="banner-img object-cover w-100"
      />
    </div>

    <BaseBodyWrapper ref="root">
      <div class="profile-image mt-40">
        <img
          class="rounded-lg border-white border-2 w-24 border-solid"
          src="/src/assets/images/trainer-profile.png"
          alt=""
        />
      </div>
      <div class="flex mt-6 justify-between">
        <div class="profile-container mr-10">
          <div class="profile">
            <div class="text-2xl font-black">이준영</div>
            <div class="mt-2">퍼스널트레이닝 (PT)</div>
            <div class="text-sm mt-6 text-neutral-500">
              회원님의 운동목적과 체형에 맞추어 더 안전하고 빠르고 재미있게
              목표에 도달할 수 있도록 최선을 다하겠습니다.
            </div>
          </div>
          <div
            class="summary-container bg-neutral-50 py-6 flex justify-around rounded my-10"
          >
            <div class="flex flex-col items-center">
              <div class="text-xs">수업</div>
              <div class="text-xl font-black">25회</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-xs">리뷰</div>
              <BaseRating
                compact
                :rating="4.9"
                :reviewCount="10"
                icon-size="sm"
                font-size="lg"
              ></BaseRating>
            </div>
            <div class="flex flex-col items-center">
              <div class="text-xs">총 경력</div>
              <div class="text-xl font-black">15년</div>
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
                <div class="text-lg font-black mb-2">트레이너 정보</div>
                <div>총 경력 <span>10년</span></div>
                <div>연락 가능 시간 <span>오전 9시 ~ 오후 8시</span></div>
              </div>
              <div class="trainer-about mb-16">
                <div class="text-lg font-black mb-2">트레이너 소개</div>
                <div v-html="data.trainerAbout.replaceAll('\n', '<br>')"></div>
              </div>
              <div class="certification-list mb-16">
                <div class="text-lg font-black mb-2">자격증 및 서류</div>
                <div class="flex">
                  <div class="h-28 w-28 border-4 rounded-lg mr-4">자격증1</div>
                  <div class="h-28 w-28 border-4 rounded-lg mr-4">자격증1</div>
                  <div class="h-28 w-28 border-4 rounded-lg mr-4">자격증1</div>
                </div>
              </div>
            </div>
            <div class="review-container section mb-20" section-id="2">
              <div class="text-lg font-black mb-2">리뷰</div>
              <div class="review-nav">
                <div class="flex items-end">
                  <div class="text-3xl font-black">
                    {{ data.trainerRating }}
                  </div>
                  <div class="ml-4">
                    <BaseRating
                      icon-size="xs"
                      :rating="data.trainerRating"
                      readonly
                      @update:rating="args => console.log(args)"
                    />
                    <div class="text-xxs">{{ data.reviewCount }}개 리뷰</div>
                  </div>
                </div>
              </div>
              <div
                v-for="(review, i) in data.reviews"
                :key="i"
                class="review-container mt-10"
              >
                <div class="review-item">
                  <div class="flex items-center">
                    <div class="mr-5 font-black">{{ review.name }}</div>
                    <div class="text-xs text-gray-400">{{ review.date }}</div>
                  </div>
                  <BaseRating icon-size="xs" readonly></BaseRating>
                  <div class="my-3">{{ review.content }}</div>
                  <div class="review-label-container flex">
                    <BaseLabel class="mr-2">
                      <div class="flex items-center px-1 py-0.5">
                        <FullStarSvg :size="14" class="mr-1"></FullStarSvg>
                        <div>친절해요</div>
                      </div>
                    </BaseLabel>
                    <BaseLabel>
                      <div class="flex items-center px-1 py-0.5">
                        <FullStarSvg :size="14" class="mr-1"></FullStarSvg>
                        <div>또 가고 싶어요</div>
                      </div>
                    </BaseLabel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        aside-->

        <div class="pt-aside h-36">
          <div class="text-lg font-black mb-2">트레이너 레슨 예약하기</div>
          <div class="trn-detail-date-picker-wrapper">
            <v-locale-provider locale="ko">
              <v-date-picker
                class="trn-detail-date-picker"
                hide-actions
                show-adjacent-months
                max-width="100%"
                :min="Date.now()"
                color="#D23361"
              ></v-date-picker
            ></v-locale-provider>
          </div>
          <div class="timeslot-container mt-4">
            <div>
              <TrnDetailTimeslotContainer />
            </div>
          </div>
          <div class="option-container mt-10">
            <div class="text-md font-black mb-2">
              트레이너님이 알아야 할 사항을 알려주세요.
            </div>
            <div class="text-sm text-neutral-600">
              더욱 개인화된 트레이닝을 받을 수 있어요!
            </div>

            <div class="chips-wrapper mt-5">
              <BaseCheckChip
                class="mr-2 mb-2"
                v-for="(o, i) in options"
                :key="i"
                :label="o"
              />
            </div>
          </div>

          <v-btn color="primary" height="50" class="w-full mt-10">
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
  position: sticky;
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
