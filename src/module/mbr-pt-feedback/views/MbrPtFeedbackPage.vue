<template>
  <BaseContainer footer="false">
    <BaseBodyWrapper>
      <div class="tfb-content-container flex-col bg-white">
        <div
          class="tfb-content-header flex w-full h-[200px] items-center justify-center"
        >
          <p class="text-4xl font-extrabold text-white">월간 트레이닝 피드백</p>
        </div>

        <div class="tfb-content flex flex-col">
          <div
            class="text-2xl flex justify-center items-center font-extrabold w-full h-[70px] bg-[#2c286d] text-white"
          >
            <p>{{ year }}년 {{ formattedMonth }}월</p>
          </div>
          <div class="flex justify-center mt-[30px]">
            <div
              class="trfb-content-wrap py-4 pb-10 border-[2px] border-gray-200 rounded-lg shadow-xl w-[800px]"
              v-if="responseFeedbackData"
            >
              <div class="flex justify-center items-center h-[70px]">
                <p class="text-xl font-bold">
                  {{ mbrName }}
                </p>
                <p class="text-lg">님의 피드백 보고서</p>
              </div>
              <div class="feedback-content-wrap px-[100px]">
                <TrnFeedBackComponent :feedbackContent="responseFeedbackData" />
              </div>
              <div class="float-right mr-[100px] mt-[10px]">
                <p>트레이너 : {{ responsetrnName }}</p>
                <P>작성일자 : {{ responsetrnfWrittenDate }}</P>
              </div>
            </div>
            <div v-else class="flex justify-center">
              <p class="text-center text-xl mt-10">
                이달의 피드백이 존재하지 않아요!
              </p>
              <img
                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FP6TTP%2FbtsvYZ4rrQt%2FUVtc3Nb11MuWR5qhKuqZ9K%2Fimg.png"
              />
            </div>
          </div>
        </div>
        <div
          class="select-cal flex justify-around items-center flex-row h-[100px]"
        >
          <v-btn
            class="cal-left-arrow flex flex-row items-center"
            @click="prevMonth"
          >
            <img
              class="move-month-triangle"
              src="/src/assets/images/triangle-left.png"
            />
            <p>{{ formattedMonth - 1 }}월</p>
          </v-btn>
          <div class="calendar text-2xl font-semibold"></div>
          <v-btn
            class="cal-right-arrow flex flex-row items-center"
            @click="nextMonth"
          >
            <p>{{ formattedMonth - 1 + 2 }}월</p>
            <img
              class="move-month-triangle"
              src="/src/assets/images/triangle-right.png"
            />
          </v-btn>
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
      responsetrnName: '',
      responsetrnfWrittenDate: new Date().toLocaleDateString(),
    }
  },
  async created() {
    await this.initializedMonth()
    let responseUser = await ApiClient.get('/members/me')
    this.mbrName = responseUser.mbrName
    this.getFeedback()
  },
  methods: {
    async getFeedback() {
      try {
        const responseUser = await ApiClient.get('/members/me')
        const response = await ApiClient.get(
          '/members/' + responseUser.mbrSeq + '/feedback',
          {
            params: { date: this.year + '-' + this.sendingMonth },
          }
        )

        console.log('responses:', response)

        if (response !== '') {
          this.responseFeedbackData = response.trnfContent
          this.responsetrnName = response.trnName
          this.responsetrnWrittenDate = response.trnfWrittenDate
        } else {
          this.responseFeedbackData = null
          this.responsetrnName = ''
        }
      } catch (error) {
        console.error('API 요청 실패:', error)
      }
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
  background-image: url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcfcK7W%2Fbtsv8xSSnsG%2FqaMynSxJM9pmmkQsgYf4w1%2Fimg.jpg');
  background-position-x: 40%;
  background-position-y: 20%;
  background-size: cover;
}
.tfb-content {
  max-height: 1000px;
}
.move-month-triangle {
  width: 15px;
  height: 15px;
}
</style>
