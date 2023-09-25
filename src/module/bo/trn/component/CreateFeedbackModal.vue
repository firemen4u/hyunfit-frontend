<template>
  <div>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <!--헤더부분-->
        <div class="flex justify-between ml-1 mr-1 mb-2">
          <div class="mr-10 font-bold"><h2>피드백 작성하기</h2></div>
          <div class=""><button @click="closeModal">닫기</button></div>
        </div>
        <div class="flex divider"></div>
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
        <div class="flex flex-col gap-2 ml-4 mb-4 mr-4">
          <div class="flex flex-row justify-between">
            <div class="font-semibold">피드백 내용</div>
            <button class="" @click="getGptFeedback(noFeedbackData)">
              gpt 보고서 받아보기
            </button>
          </div>
          <textarea class="text-box" v-model="feedbackContent"></textarea>
        </div>
        <div class="flex divider"></div>
        <!--꼬리(submit버튼)-->
        <div class="flex justify-center mt-2">
          <button
            class="fb-write-Button"
            @click="submitFeedback(noFeedbackData)"
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ApiClient from '/src/services/api.js'
export default {
  props: {
    noFeedbackData: Object,
    show: Boolean,
  },
  data() {
    return {
      feedbackContent: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    formatDate(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD')
    },
    formatTarget(timestamp) {
      return moment(timestamp).format('YYYY-MM')
    },
    submitFeedback(sendingData) {
      sendingData.trnfContent = this.feedbackContent
      ApiClient.post('/trainer-feedbacks/write-feedback', sendingData)
      this.$emit('close')
      location.reload()
    },
    async getGptFeedback(sendingData) {
      let response = await ApiClient.post('/trainer-feedbacks/gpt', sendingData)
      this.feedbackContent = response.content
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
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
  background-color: rgb(234, 236, 244);
  width: 650px;
  height: 500px;
  border-radius: 5px;
}
.fb-write-Button {
  width: 125px;
  height: 35px;
  border-radius: 5px;
  background: linear-gradient(
    120deg,
    rgb(144, 12, 63),
    rgb(199, 0, 57),
    rgb(249, 76, 16)
  );
  color: white;
  font-weight: 600;
}
.divider {
  height: 1px;
  background-color: rgb(222, 222, 222);
  margin: 10 10px;
}
</style>
