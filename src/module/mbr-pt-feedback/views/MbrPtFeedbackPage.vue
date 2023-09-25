<template>
  <BaseContainer footer="false">
    <BaseBodyWrapper>
      <div class="tfb-side-bar"></div>
      <div class="tfb-content-container flex-col">
        <div class="tfb-content-header text-4xl font-extrabold mt-12 ml-7">
          월간 피드백
        </div>
        <div
          class="select-cal flex justify-around items-center flex-row ml-14 mr-14"
        >
          <button
            class="cal-left-arrow flex flex-row items-center"
            @click="prevMonth"
          >
            <img
              class="move-month-triangle"
              src="/src/assets/images/triangle-left.png"
            />
            이전달
          </button>
          <div class="calendar text-2xl font-semibold">
            {{ mbrName }} 사원님의 {{ year }}년 {{ formattedMonth }}월
            피드백이예요!!
          </div>
          <button
            class="cal-right-arrow flex flex-row items-center"
            @click="nextMonth"
          >
            다음달<img
              class="move-month-triangle"
              src="/src/assets/images/triangle-right.png"
            />
          </button>
        </div>
        <div class="tfb-content flex justify-center items-center">
          <TrnFeedBackComponent :feedbackContent="responseFeedbackData">
          </TrnFeedBackComponent>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import TrnFeedBackComponent from '../components/MbrPtFeedbackComponent.vue'
import ApiClient from '/src/services/api.js'
</script>

<script>
export default {
  data() {
    return {
      mbrSeq: 0,
      mbrName: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      sendingMonth: null,
      responseFeedbackData: null,
    }
  },
  async created() {
    await this.initializedMonth()
    let responseUser = await ApiClient.get('/members/me')
    console.log(responseUser)
    this.mbrName = responseUser.mbrName
    await ApiClient.get('/members/' + responseUser.mbrSeq + '/feedback', {
      params: { date: this.year + '-' + this.sendingMonth },
    })
      .then(response => {
        console.log(response)
        if (response !== '') {
          this.responseFeedbackData = response
        } else {
          this.responseFeedbackData = '이달의 피드백이 존재하지않아요!'
        }
      })
      .catch(error => {
        console.error('API 요청 실패:', error)
      })
  },
  methods: {
    async getFeedback() {
      let responseUser = await ApiClient.get('/members/me')
      await ApiClient.get('/members/' + responseUser.mbrSeq + '/feedback', {
        params: { date: this.year + '-' + this.sendingMonth },
      })
        .then(response => {
          console.log(response)
          if (response !== '') {
            this.responseFeedbackData = response
          } else {
            this.responseFeedbackData = '이달의 피드백이 존재하지않아요!'
          }
        })
        .catch(error => {
          console.error('API 요청 실패:', error)
        })
    },
    prevMonth() {
      if (this.month === 1) {
        this.year = this.year - 1
        this.month = 12
      } else {
        this.month = this.month - 1
      }
      this.initializedMonth()
      this.getFeedback()
    },
    nextMonth() {
      if (this.month === 12) {
        this.year = this.year + 1
        this.month = 1
      } else {
        this.month = this.month + 1
      }
      this.initializedMonth()
      this.getFeedback()
    },
    initializedMonth() {
      return new Promise(resolve => {
        this.sendingMonth =
          this.month < 10 ? `0${this.month}` : this.month.toString()
        resolve()
      })
    },
  },
  computed: {
    formattedMonth() {
      return this.month < 10 ? `0${this.month}` : this.month.toString()
    },
  },
}
</script>

<style scoped>
.tfb-content-header {
  flex-grow: 1;
  display: flex;
  padding-left: 20px;
  margin-bottom: 50px;
}
.move-month-triangle {
  width: 15px;
  height: 15px;
}
</style>
