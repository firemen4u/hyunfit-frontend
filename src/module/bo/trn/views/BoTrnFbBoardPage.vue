<template>
  <BaseContainer category="trainer" footer="false">
    <div class="w-100 flex justify-center primary-background">
      <BaseBodyWrapper>
        <div class="w-full mt-3 bg-white rounded-xl shadow-lg pb-10 mb-[150px]">
          <div
            class="trn-fb-banner-container h-[200px] overflow-hidden relative rounded-t-xl"
          >
            <div
              class="banner-img-cover w-full h-full absolute top-0 flex items-center mt-3"
            >
              <div class="banner-img-cover-text py-12 px-10 mb-5">
                <p class="text-2xl font-bold text-gray-200">트레이너</p>
                <p class="text-4xl font-black mt-3 text-gray-200">
                  회원 피드백 관리
                </p>
              </div>
            </div>
          </div>
          <div class="rsv-container-top">
            <div class="nfb-list-outer" ref="listOuter">
              <p class="text-2xl font-black mt-5 ml-[51px]">
                {{ year }}년 {{ formattedMonth }}월
                <v-btn :icon="LeftArrowSvg" variant="flat" @click="prevMonth" />
                <v-btn
                  :icon="RightArrowSvg"
                  variant="flat"
                  @click="nextMonth"
                />
              </p>
            </div>
            <div class="flex justify-center">
              <NoFeedbackList
                :key="reLoadKey"
                :targetDate="targetDate"
              ></NoFeedbackList>
            </div>
          </div>
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import NoFeedbackList from '/src/module/bo/trn/component/NoFeedbackList.vue'
import { LeftArrowSvg, RightArrowSvg } from '@/module/@base/svg'
</script>

<script>
import axios from 'axios'
import { BACKEND_API_BASE_URL } from '@/config'
import ApiClient from '@/services/api'

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      targetDate: null,
      reLoadKey: 0,
    }
  },
  async beforeRouteEnter() {
    const user = {
      username: 'yang',
      password: '123',
    }
    await axios
      .post(`${BACKEND_API_BASE_URL}/auth/trainer`, user)
      .then(response => {
        let token = response.headers.get('authorization')
        ApiClient.setTokenOnLocalStorage(token, 'trainer')
      })
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
.nfb-container-top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
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
.trn-fb-banner-container {
  //background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  background-color: #434a54;
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
}
</style>
