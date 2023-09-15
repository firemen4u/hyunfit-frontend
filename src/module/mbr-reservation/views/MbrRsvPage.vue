<template>
  <BaseContainer>
    <BaseBodyWrapper>
      <div class="mbr-rsv-container w-full h-full">
        <div class="mbr-rsv-banner-container h-1/5 overflow-hidden relative">
          <div class="banner-img w-full">
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLmK30%2FbtstpDVKWjo%2FK4PSNMpfTmkccfOWoB6Ao1%2Fimg.jpg"
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
              :trainerProfileImageUrl="profileImageUrl"
              trainDday="오늘"
              trainType="퍼스널트레이닝(PT)"
              trainDatetime="09.07 수 오후 2:00"
              trainTrainerName="고요한 선생님"
              trainContent="업무스트레스 모두 날리는 명상 요가"
              :avatarImageUrl="avatarImageUrl"
              lastClassDate="23.08.30"
            ></MbrRsvTrainCard>

            <MbrRsvTrainCard
              :trainerProfileImageUrl="profileImageUrl2"
              trainDday="D-2"
              trainType="필라테스"
              trainDatetime="09.09 - 14:00"
              trainTrainerName="고윤정 선생님"
              trainContent="머리 어깨 무릎 팔 다 풀어봅시다"
              :avatarImageUrl="avatarImageUrl2"
              lastClassDate="23.08.22"
            ></MbrRsvTrainCard>
          </div>
        </div>
        <div class="mbr-rsv-history-contaioner" title="예약 내역 카드">
          <div class="mbr-rsv-history-item m-3">
            <p class="text-2xl font-bold mt-10 mb-8">지난 예약</p>
            <div v-for="index in 5" :key="index" class="mbr-rsv-history-card">
              <MbrRsvHistoryCard
                profileImageUrl="https://mblogthumb-phinf.pstatic.net/MjAyMTAyMjVfMjk4/MDAxNjE0MjM5MDIwMTk5.aJVYERC3dCXww1NgFcRjSCGsvFMkl58NJC6ee--69vYg.jLPZXJ3t8x-sj8wJmuIXtAOQxeEOagLtDftS7zZFgtAg.JPEG.kikisoyun/IMG_1146.JPG?type=w800"
                trainerName="고윤정 트레이너"
                day="2023.09.07"
                time="2H"
                type="퍼스널트레이닝(PT)"
                subTitle="소제목"
                :ptCount="6 - index"
              />
            </div>

            <template class="border-solid border-4 border-orange-400">
              <div></div>
            </template>
          </div>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import MbrRsvTrainCard from '/src/module/mbr-reservation/components/MbrRsvTrainCard.vue'
import MbrRsvHistoryCard from '../components/MbrRsvHistoryCard.vue'
import { ref } from 'vue'
const profileImageUrl =
  'https://mblogthumb-phinf.pstatic.net/MjAyMTAyMjVfNiAg/MDAxNjE0MjM5MDE5NDky.PRUBGVPV9zDpuus_gRK8TRkc6OQ1bj2OeR8xpgIOZU4g._h3ecE-etq93eBQJgbKPSA7LNsDcG8AQpCKEHNc58hMg.JPEG.kikisoyun/IMG_1160.JPG?type=w800'
const avatarImageUrl =
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd3DAvL%2FbtstcPRGzk2%2FyEF3KBvZwJgQcfnNQyN0zK%2Fimg.jpg'

const profileImageUrl2 =
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb9OSgq%2FbtstfPDvgwy%2F2qJ7Ck73VKjAkzHAd7R5L0%2Fimg.jpg'
const avatarImageUrl2 =
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fd3DAvL%2FbtstcPRGzk2%2FyEF3KBvZwJgQcfnNQyN0zK%2Fimg.jpg'

const selectedRating = ref(0)
</script>
<style scope>
.MbrRsvTrainCard:hover {
  transform: translateY(-2px);
}
</style>
