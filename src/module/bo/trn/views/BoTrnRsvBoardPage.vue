<template>
  <BaseContainer category="trainer" footer="false">
    <BaseBodyWrapper>
      <div class="rsv-container flex justify-center">
        <div class="rsv-list-outer mb-10" ref="listOuter">
          <div v-if="showCardList" class="rsv-smr-card-container">
            <div v-for="index in 5" :key="index">
              <ReservationSummaryCard
                class="shadow-lg"
                :sendToChild="sendingData"
                :index="index"
              ></ReservationSummaryCard>
            </div>
          </div>
          <div class="">
            <ReservationList @send-cntlist="receiveCntList"></ReservationList>
          </div>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<script setup>
import ReservationList from '/src/module/bo/trn/component/ReservationList.vue'
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import ReservationSummaryCard from '../component/ReservationSummaryCard.vue'
</script>

<script>
export default {
  data() {
    return {
      showCardList: false,
      sendingData: {
        completeCnt: 0,
        noShowCnt: 0,
        upcomingCnt: 0,
        cancelCnt: 0,
      },
    }
  },

  methods: {
    receiveCntList(cntList) {
      console.log('부모 컴포넌트에서 받은 데이터:', cntList)
      this.sendingData = {
        completeCnt: cntList.completeCnt,
        noShowCnt: cntList.noShowCnt,
        upcomingCnt: cntList.upcomingCnt,
        cancelCnt: cntList.cancelCnt,
      }
      this.showCardList = true
    },
  },
}
</script>

<style scoped>
.rsv-container {
  display: flex;
  flex-direction: row;
  width: 1100px;
  height: auto;
}
.rsv-sidebar {
  width: 220px;
  height: auto;
}
.rsv-list-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: auto;
  background: #ffffff;
}
.rsv-smr-card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 160px;
}
</style>
