<template>
  <BaseContainer footer="false">
    <BaseBodyWrapper>
      <div class="rsv-container">
        <div class="rsv-sidebar"></div>
        <div class="rsv-list-outer" ref="listOuter">
          <div v-if="showCardList" class="rsv-smr-card-container">
            <div v-for="index in 4" :key="index">
              <ReservationSummaryCard
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
import ReservationList from '/src/module/boptrsv/component/ReservationList.vue'
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
  height: 700px;
  overflow-y: scroll;
  border: 1px solid #ccc;
}
.rsv-sidebar {
  width: 200px;
  height: 1200px;
  background: #008b5f;
}
.rsv-list-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: 1200px;
  background: #eeeeee;
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
