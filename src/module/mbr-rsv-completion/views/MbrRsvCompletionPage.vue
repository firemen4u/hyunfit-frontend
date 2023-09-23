<script setup>
import PtReservationCompletionEffect from '@/module/mbr-rsv-completion/components/PtReservationCompletionEffect.vue'
import { BaseContainer } from '@/module/@base/views'
import BaseBodyWrapper from '@/module/@base/views/BaseBodyWrapper.vue'
import router, { pathNames } from '@/router'

async function gotoMbrReservation() {
  await router.push(pathNames.mbrRsvPage)
}
async function gotoMain() {
  await router.push(pathNames.mainPage)
}
</script>

<template>
  <BaseContainer>
    <BaseBodyWrapper>
      <div
        class="pt-reservation-completion-container items-center justify-center flex"
      >
        <div
          class="pt-reservation-completion-wrapper flex-col items-center justify-center"
        >
          <PtReservationCompletionEffect />

          <div class="mt-10 text-xl mb-10 font-medium">
            예약이 완료되었습니다!
          </div>
          <v-btn
            :ripple="false"
            color="primary"
            variant="flat"
            height="50"
            class="w-full mt-3"
            @click="gotoMbrReservation"
          >
            <div class="font-bold text-lg">MY 예약 확인하기</div>
          </v-btn>
          <v-btn
            :ripple="false"
            height="50"
            color="primary"
            variant="outlined"
            class="w-full mt-3"
            @click="gotoMain"
          >
            <div class="font-bold text-lg">홈으로</div>
          </v-btn>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style scoped>
.pt-reservation-completion-wrapper {
  display: flex;
  width: 400px;
  height: 620px;
}
</style>
