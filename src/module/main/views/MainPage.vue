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

import MainBannerCard from '@/module/main/components/cards/MainBannerCard.vue'
import MainFooter from '@/module/main/components/MainFooter.vue'
import { onMounted, ref } from 'vue'
import MainApi from '@/module/main/services/mainApi'
import ApiClient from '@/services/api'
import router, { pathNames } from '@/router'
import TutorialDialog from '@/module/main/components/TutorialDialog.vue'

const rcm = ref(null)
const userdata = ref(null)
onMounted(async () => {
  userdata.value = await ApiClient.me()
  if (userdata.value) {
    rcm.value = await MainApi.getRecommendations(userdata.value)
  }
})
const tutorialDialogOpen = ref(false)
</script>

<template>
  <BaseContainer nofooter>
    <div class="article body-wrapper mb-[150px]">
      <div class="mt-3">
        <div class="grid grid-cols-3 gap-3">
          <div @click="tutorialDialogOpen = !tutorialDialogOpen">
            {{ tutorialDialogOpen }}
          </div>
          <MainCardContainer class="col-span-3">
            <MainBannerCard />
          </MainCardContainer>
          <MainCardContainer color="#0d1851" class="col-span-2">
            <RoutineRcmCard :rcm="rcm" :userdata="userdata" />
          </MainCardContainer>
          <MainCardContainer :color="'#e7edf4'" class="col-span-1">
            <ReportCard @click="router.push(pathNames.reportPage)" />
          </MainCardContainer>
          <MainCardContainer :color="'#bc2391'" class="col-span-1">
            <RoutineCard @click="router.push(pathNames.mbrRtnBoardPage)" />
          </MainCardContainer>
          <MainCardContainer color="#1c1b8e" class="col-span-1">
            <TrainerCard @click="router.push(pathNames.trnSearchPage)" />
          </MainCardContainer>
          <MainCardContainer color="#331e51" class="col-span-1">
            <SurveyCard @click="router.push(pathNames.surveyPage)" />
          </MainCardContainer>
        </div>
      </div>
    </div>
    <TutorialDialog v-model="tutorialDialogOpen" :userdata="userdata" />
    <MainFooter />
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

.body-wrapper {
  width: 100%;
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .body-wrapper {
    width: 80%;
  }
}

/* 큰 화면(데스크톱)에 대한 스타일 */
@media screen and (min-width: 1200px) {
  .body-wrapper {
    width: 1100px;
  }
}
</style>
