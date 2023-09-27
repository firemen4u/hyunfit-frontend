<script setup>
import { BaseContainer } from '@/module/@base/views'
import MainCardContainer from '@/module/main/components/MainCardContainer.vue'
import {
  RoutineRcmCard,
  RoutineCard,
  TrainerCard,
  ReportCard,
} from '@/module/main/components'
import SurveyCard from '@/module/main/components/cards/SurveyCard.vue'
</script>

<template>
  <BaseContainer>
    <div class="article w-[1100px] h-[1500px]">
      <div class="">
        <div class="flex my-16 justify-center">
          <div class="flex items-center">
            <div class="rounded-lg p-2 mr-2">
              <div class="mb-2 text-[40px] flex text-black font-semibold">
                <p class="font-black text-[#0d1851]">현대</p>
                <div class=""></div>
                인들의 피트니스를 책임지는, 현핏
              </div>
              <div class="text-xl font-bold">
                AI 분석으로 건강도 챙기고 포인트도 챙기고
              </div>
            </div>
            <div class="maskot">
              <img
                class="w-[120px]"
                src="https://fs.hyunfit.life/api/hyunfit/file/rend_0001.svg"
              />
            </div>
          </div>
        </div>
        <!--        <MainBanner class="mt-10"></MainBanner>-->

        <div class="grid grid-cols-3 gap-3">
          <MainCardContainer color="#0d1851" :size="2">
            <RoutineRcmCard />
          </MainCardContainer>
          <MainCardContainer :color="'#e7edf4'" :size="1">
            <ReportCard />
          </MainCardContainer>
          <MainCardContainer :color="'#bc2391'" :size="1">
            <RoutineCard />
          </MainCardContainer>
          <MainCardContainer color="#1c1b8e" :size="1">
            <TrainerCard />
          </MainCardContainer>
          <MainCardContainer color="#331e51" :size="1">
            <SurveyCard />
          </MainCardContainer>
        </div>
      </div>

      <!--      <section class="mt-10">-->
      <!--        <MainSwipableCardContainer-->
      <!--          title="최승열님! 이런 루틴은 어떠세요?"-->
      <!--          count="4"-->
      <!--        >-->
      <!--          <swiper-slide v-for="(card, i) in cards" :key="i">-->
      <!--            <MainRtnCard-->
      <!--              :title="card.title"-->
      <!--              :src="card.src"-->
      <!--              card-size="lg"-->
      <!--            ></MainRtnCard>-->
      <!--          </swiper-slide>-->
      <!--        </MainSwipableCardContainer>-->
      <!--      </section>-->
      <!--      <section class="mt-20">-->
      <!--        <MainSwipableCardContainer title="지금 인기있는 트레이너" see-more>-->
      <!--          <swiper-slide v-for="(card, i) in cards" :key="i">-->
      <!--            <MainTrnCard-->
      <!--              color="bg-gray-50"-->
      <!--              :title="card.title"-->
      <!--              :src="card.src"-->
      <!--            ></MainTrnCard>-->
      <!--          </swiper-slide>-->
      <!--        </MainSwipableCardContainer>-->
      <!--      </section>-->
      <!--      <section class="mt-20">-->
      <!--        <MainSwipableCardContainer title="양석진님만을 위한 마약" count="4">-->
      <!--          <swiper-slide v-for="(food, i) in foods" :key="i">-->
      <!--            <MainFoodCard-->
      <!--              title="곤드레 단백질 쉐이크"-->
      <!--              :src="food.imgSrc"-->
      <!--              card-size="lg"-->
      <!--            ></MainFoodCard>-->
      <!--          </swiper-slide>-->
      <!--        </MainSwipableCardContainer>-->
      <!--      </section>-->
    </div>
  </BaseContainer>
</template>

<style scoped>
.article {
  position: relative;
}

.article::after,
.article::before {
  content: '';
  position: absolute;
  z-index: -1;
  width: 1115px;
  height: 575px;
  -webkit-filter: blur(160px);
  filter: blur(160px);
}

.article::before {
  opacity: 0.4;
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

.article::after {
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
</style>
