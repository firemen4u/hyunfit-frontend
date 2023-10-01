<template>
  <div>
    <v-dialog v-model="show" max-width="700px" max-height="700px">
      <v-card>
        <v-card-title class="mt-3">
          <div class="flex justify-between ml-[4.5px]">
            <span class="headline text-2xl">피드백 작성하기</span>
            <v-spacer></v-spacer>
            <v-btn
              @click="closeModal"
              :icon="CrossSvg"
              size="small"
              variant="text"
            />
          </div>
        </v-card-title>
        <v-card-text>
          <div class="flex justify-between flex-row">
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
          <div class="flex flex-col">
            <div class="flex flex-row justify-between h-11">
              <div class="fb font-semibold self-center">피드백 내용</div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="getGptFeedback(noFeedbackData.mbrSeq)"
                  >gpt 보고서 받아보기</v-btn
                >
              </v-card-actions>
            </div>
            <div class="w-[650px] h-40">
              <v-textarea
                v-if="textarea"
                counter
                :value="
                  noFeedbackData.trnfContent !== null
                    ? noFeedbackData.trnfContent
                    : trnfContent
                "
                clearable
                variant="solo"
                single-line
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
          </div>
        </v-card-text>
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
      console.log(mbrSeq)
      console.log('bef', this.loading, this.textarea)

      this.loading = true
      this.textarea = false

      console.log('aft', this.loading, this.textarea)
      const targetDate = dayjs(
        this.formatTarget(this.noFeedbackData.trnfSubmissionDue)
      )
      this.startDate = targetDate.startOf('month').format('YYYY-MM-01 00:00:00')
      this.endDate = targetDate.endOf('month').format('YYYY-MM-DD 00:00:00')
      // let sendingData = await ApiClient.get('/members/' + mbrSeq + '/report', {
      //   params: {
      //     startDate: this.startDate,
      //     endDate: this.endDate,
      //   },
      // })
      // let response = await ApiClient.post('/trainer-feedbacks/gpt', sendingData)
      // console.log('getaft', this.loading, this.textarea)
      // this.loading = false
      // this.textarea = true
      // console.log('fin', this.loading, this.textarea)
      // this.feedbackContent = response.content
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
</style>
