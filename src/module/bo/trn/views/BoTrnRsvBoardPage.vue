<template>
  <BaseContainer category="trainer" footer="false">
    <BaseBodyWrapper>
      <div class="rsv-container">
        <div class="flex flex-row text-3xl font-bold mt-8 ml-10 mb-5">
          예약리스트
          <div class="flex text-end flex-row text-xl ml-10">
            <button class="mr-3 align-baseline" @click="prevMonth">&lt;</button>
            {{ year }}년 {{ formattedMonth }}월
            <button class="ml-3 align-baseline" @click="nextMonth">&gt;</button>
          </div>
        </div>
        <div class="flex items-center flex-col m-3" ref="listOuter">
          <div class="">
            <ReservationList
              @send-cntlist="receiveCntList"
              :key="reLoadKey"
              :targetDate="targetDate"
            ></ReservationList>
          </div>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<script setup>
import ReservationList from '/src/module/bo/trn/component/ReservationList.vue'
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
</script>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      targetDate: null,
      reLoadKey: 0,
    }
  },
  async created() {
    await this.initializedMonth()
  },
  computed: {
    formattedMonth() {
      return this.month < 10 ? `0${this.month}` : this.month.toString()
    },
  },
  methods: {
    // receiveCntList(cntList) {
    //   this.itemCnt =
    //     cntList.completeCnt +
    //     cntList.noShowCnt +
    //     cntList.upcomingCnt +
    //     cntList.cancelCnt
    // },
    prevMonth() {
      if (this.month === 1) {
        this.year = this.year - 1
        this.month = 12
      } else {
        this.month = this.month - 1
      }
      this.initializedMonth()

      this.reLoadKey += 1
    },
    nextMonth() {
      if (this.month === 12) {
        this.year = this.year + 1
        this.month = 1
      } else {
        this.month = this.month + 1
      }
      this.initializedMonth()
      this.reLoadKey += 1
    },
    initializedMonth() {
      return new Promise(resolve => {
        this.sendingMonth =
          this.month < 10 ? `0${this.month}` : this.month.toString()
        resolve()
        this.targetDate = `${this.year}-${this.sendingMonth}`
      })
    },
  },
}
</script>

<style scoped>
.rsv-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(255, 255, 255);
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
  justify-content: center;
  width: 900px;
  height: auto;
  background: #ffffff;
}
.text-end {
  align-items: end;
}
</style>
