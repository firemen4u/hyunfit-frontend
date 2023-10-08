<template>
  <BaseContainer>
    <div class="w-100 flex justify-center primary-background mb-[150px]">
      <BaseBodyWrapper>
        <div
          class="tfb-content-container flex-col mt-3 shadow-xl rounded-xl bg-white"
        >
          <div
            class="tfb-content-header flex w-full h-[200px] items-center justify-items-end rounded-t-xl"
          >
            <div class="py-12 px-10 mb-5 flex-col">
              <p class="text-4xl mt-5 font-black text-white">트레이너 피드백</p>
              <p class="text-xl mt-5 font-bold text-white">
                트레이너가 나를 위해 작성한 월간 운동 보고서를 받아 볼 수 있어요
              </p>
            </div>
          </div>

          <div class="tfb-content flex flex-col">
            <div
              class="text-2xl flex justify-center items-center font-extrabold w-full h-[70px] bg-[#2c286d] text-white"
            >
              <LeftArrowSvg color="white" size="20" @click="prevMonth" />
              <p class="mx-5">{{ year }}년 {{ formattedMonth }}월</p>
              <RightArrowSvg color="white" size="20" @click="nextMonth" />
            </div>
            <div class="flex justify-center my-[30px]">
              <div
                class="trfb-content-wrap py-4 pb-10 rounded-b-xl w-full"
                v-if="responseFeedbackData"
              >
                <div class="feedback-content-wrap px-[100px]">
                  <div
                    class="flex justify-start items-center h-[70px] text-lg mb-10"
                  >
                    <p class="font-bold">
                      {{ mbrName }}
                    </p>
                    <p class="">님께,</p>
                  </div>
                  <TrnFeedBackComponent
                    :feedbackContent="responseFeedbackData"
                  />
                </div>
                <div class="float-right mr-[100px] mt-15 text-lg font-bold">
                  <p>{{ responsetrnName }} 트레이너 드림</p>
                  <P>{{ responsetrnfWrittenDate }}</P>
                </div>
              </div>
              <div v-else class="flex flex-col justify-center h-[500px]">
                <p class="text-center text-xl">
                  이달의 피드백이 존재하지 않아요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import { LeftArrowSvg, RightArrowSvg } from '/src/module/@base/svg'
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
  background-image: url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGghYC%2Fbtsv7cQd8dB%2Fi7ZIVAMkyknlQac30BdvMk%2Fimg.png');
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
