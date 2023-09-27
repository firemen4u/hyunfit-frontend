<template>
  <BaseContainer category="trainer" footer="false">
    <BaseBodyWrapper>
      <div class="nfb-container flex justify-center">
        <div class="nfb-list-outer" ref="listOuter">
          <div class="flex flex-row text-3xl font-bold mt-8 ml-10 mb-5">
            피드백리스트
            <div class="flex text-end flex-row text-xl ml-10">
              <button class="mr-3 align-baseline" @click="prevMonth">
                &lt;
              </button>
              {{ year }}년 {{ formattedMonth }}월
              <button class="ml-3 align-baseline" @click="nextMonth">
                &gt;
              </button>
            </div>
          </div>
          <div class="flex justify-center">
            <NoFeedbackList
              :key="reLoadKey"
              :targetDate="targetDate"
            ></NoFeedbackList>
          </div>
          <BasePagination v-model="currentPage" :total-pages="totalPages" />
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import NoFeedbackList from '/src/module/bo/trn/component/NoFeedbackList.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
</script>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      targetDate: null,
      reLoadKey: 0,
      currentPage: 0,
      itemsTotalPage: 0,
      itemsPerPage: 10,
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
.nfb-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1100px;
  height: auto;
}
.nfb-list-outer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1100px;
  height: auto;
  background: #ffffff;
}
.text-end {
  align-items: end;
}
</style>
