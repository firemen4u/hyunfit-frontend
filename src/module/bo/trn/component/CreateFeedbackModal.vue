<template>
  <div>
    <v-dialog v-model="show" width="1000">
      <v-card>
        <div class="h-full w-full flex justify-center flex-col p-10">
          <div class="flex justify-between mb-7">
            <span class="headline text-3xl font-black">피드백 작성하기</span>
            <v-spacer></v-spacer>
            <v-btn
              @click="closeModal"
              :icon="CrossSvg"
              size="small"
              variant="text"
            />
          </div>
          <div class="">
            <div class="text-xl font-black mb-3">회원 정보</div>
            <div class="flex justify-start flex-row">
              <div class="flex flex-col">
                <div class="fb-detail-category">라이브 클래스 ID</div>
                <div class="fb-detail-category">회원명</div>
              </div>
              <div class="flex flex-col items-center mr-8">
                <div class="info-gray-box">{{ noFeedbackData.trnfSeq }}</div>
                <div class="info-gray-box">{{ noFeedbackData.mbrName }}</div>
              </div>
              <div class="flex flex-col">
                <div class="fb-detail-category">마지막 클래스 진행일</div>
                <div class="fb-detail-category">피드백 대상월</div>
              </div>
              <div class="flex flex-col items-center">
                <div class="info-gray-box">
                  {{ formatDate(noFeedbackData.trnfCreationDate) }}
                </div>
                <div class="info-gray-box">
                  {{ formatTarget(noFeedbackData.trnfSubmissionDue) }}
                </div>
              </div>
            </div>
            <div class="flex flex-col mt-5">
              <div class="flex flex-row justify-between mb-5">
                <div class="text-xl font-black">피드백 내용</div>
                <v-btn
                  color="primary"
                  variant="flat"
                  @click="getGptFeedback(noFeedbackData.mbrSeq)"
                  >gpt 보고서 받아보기</v-btn
                >
              </div>
              <div>
                <v-textarea
                  v-if="textarea"
                  counter
                  v-model="feedbackContent"
                  variant="solo"
                  single-line
                  hide-details
                  rows="13"
                  no-resize
                  flat
                  bg-color="#f4f3f6"
                >
                </v-textarea>

                <div
                  v-if="loading"
                  class="absolute w-[650px] h-40 flex justify-center items-center rounded-md"
                >
                  <img
                    src="https://fs.hyunfit.life/api/hyunfit/file/gpt-loader.gif"
                    class="h-40 rounded-xl"
                    alt=""
                  />
                </div>
              </div>
              <div class="flex justify-center">
                <v-btn
                  class="mt-10"
                  width="200"
                  color="primary"
                  @click="submitFeedback(noFeedbackData)"
                >
                  {{
                    noFeedbackData.trnfContent !== null
                      ? '수정하기'
                      : '작성하기'
                  }}
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import ApiClient from '/src/services/api.js'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import CrossSvg from '@/module/@base/svg/CrossSvg.vue'
</script>

<script>
export default {
  props: {
    noFeedbackData: Object,
    modelValue: Boolean,
  },
  emits: ['update:modelValue', 'action:reload'],
  computed: {
    show: {
      get() {
        if (this.modelValue == true) {
          this.feedbackContent = this.noFeedbackData.trnfContent
        }
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  data() {
    return {
      feedbackContent: '',
      startDate: '',
      endDate: '',
      loading: false,
      textarea: true,
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
      this.$emit('action:reload')
    },
    formatDate(timestamp) {
      return dayjs(timestamp).locale('ko').format('YYYY-MM-DD')
    },
    formatTarget(timestamp) {
      return dayjs(timestamp).locale('ko').format('YYYY-MM')
    },
    async submitFeedback(sendingData) {
      sendingData.trnfContent = this.feedbackContent
      await ApiClient.post('/trainer-feedbacks/write-feedback', sendingData)
      this.closeModal()
    },
    async getGptFeedback(mbrSeq) {
      this.loading = true
      this.textarea = false

      const targetDate = dayjs(
        this.formatTarget(this.noFeedbackData.trnfSubmissionDue)
      )
      this.startDate = targetDate.startOf('month').format('YYYY-MM-01 00:00:00')
      this.endDate = targetDate.endOf('month').format('YYYY-MM-DD 00:00:00')
      let sendingData = await ApiClient.get('/members/' + mbrSeq + '/report', {
        params: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
      })
      let response = await ApiClient.post('/trainer-feedbacks/gpt', sendingData)
      this.loading = false
      this.textarea = true
      this.feedbackContent = response.content
    },
  },
}
</script>

<style scoped>
.fb-detail-category {
  display: flex;
  align-items: center;
  height: 30px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-right: 16px;
}
.info-gray-box {
  display: flex;
  align-items: center;
  background-color: rgb(243 244 246);
  width: 150px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 12px;
}
</style>
