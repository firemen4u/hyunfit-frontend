<template>
  <div>
    <v-dialog v-model="show" max-width="700px">
      <v-card>
        <!--헤더부분-->
        <v-card-title class="mt-3">
          <div class="flex">
            <span class="headline">피드백 작성하기</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeModal" size="x-small">
              <v-icon size="default">mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text>
          <!--바디부분-->
          <div class="flex justify-between flex-row mt-4 ml-4 mr-4">
            <div class="flex flex-col items-center">
              <div class="fb-detail-category">PT번호</div>
              <div class="fb-detail-category">회 원 명</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="info-gray-box">{{ noFeedbackData.trnfSeq }}</div>
              <div class="info-gray-box">{{ noFeedbackData.mbrName }}</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="fb-detail-category">최근PT일자</div>
              <div class="fb-detail-category">피드백대상월</div>
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
          <!--피드백작성-->
          <div class="flex flex-col ml-4 mr-4">
            <div class="flex flex-row justify-between">
              <div class="font-semibold">피드백 내용</div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">gpt 보고서 받아보기</v-btn>
              </v-card-actions>
            </div>
            <v-textarea
              counter
              class="text-box h-[500px]"
              :value="
                noFeedbackData.trnfContent !== null
                  ? noFeedbackData.trnfContent
                  : trnfContent
              "
              clearable
              variant="solo"
              single-line
            ></v-textarea>
          </div>
        </v-card-text>
        <!--꼬리(submit버튼)-->
        <div class="flex justify-center mb-5">
          <v-btn color="primary" @click="submitFeedback(noFeedbackData)">
            {{ noFeedbackData.trnfContent !== null ? '수정하기' : '작성하기' }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import ApiClient from '/src/services/api.js'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
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
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  created() {
    console.log(this.noFeedbackData)
  },
  data() {
    return {
      feedbackContent: '',
      startDate: '',
      endDate: '',
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
      const targetDate = dayjs(
        this.formatTarget(this.noFeedbackData.trnfSubmissionDue)
      )
      this.startDate = targetDate.startOf('month').format('YYYY-MM-01 00:00:00')
      this.endDate = targetDate.endOf('month').format('YYYY-MM-DD 00:00:00')
      console.log(this.startDate, this.endDate)
      let sendingData = await ApiClient.get('/members/' + mbrSeq + '/report', {
        params: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
      })
      let response = await ApiClient.post('/trainer-feedbacks/gpt', sendingData)
      this.feedbackContent = response.content
    },
  },
}
</script>

<style scoped>
.fb-detail-category {
  display: flex;
  align-items: center;
  width: 100px;
  height: 30px;
  font-weight: 600;
  margin-bottom: 12px;
}
.info-gray-box {
  display: flex;
  align-items: center;
  background-color: rgb(234, 236, 244);
  width: 150px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 12px;
}
.text-box {
  width: 620px;
  border-radius: 5px;
}
</style>
