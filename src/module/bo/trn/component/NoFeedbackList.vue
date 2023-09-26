<template>
  <!--최상위 div-->
  <div class="nfb-list-container">
    <div class="nfb-list-header flex items-center bg-gray-100 text-black h-9">
      <div class="ml-4">피드백 현황({{ nfbCnt() }}건)</div>
    </div>
    <div class="nfb-list-inner">
      <div class="flex flex-col bg-white mt-6 mb-6">
        <!--카테고리명(컬럼명)-->
        <div class="nfb-list-category">
          <div class="nfb-list-seq">#</div>
          <div class="nfb-list-ptSeq">PT번호</div>
          <div class="nfb-list-ptDate">최근PT일자</div>
          <div class="nfb-list-fbtarget">피드백대상월</div>
          <div class="nfb-list-fbStatus">작성상태</div>
          <div class="nfb-list-mbrName">회 원 명</div>
        </div>
        <!--리스트(행)-->
        <div class="nfb-list-content">
          <div v-for="(nofeedback, index) in noFeedbackList" :key="index">
            <button class="nfb-list mb-1" @click="showDetailModal(nofeedback)">
              <div class="nfb-list-seq">{{ index + 1 }}</div>
              <div class="nfb-list-ptSeq">{{ nofeedback.trnfSeq }}</div>
              <div class="nfb-list-ptDate">
                {{ formatDate(nofeedback.trnfCreationDate) }}
              </div>
              <div class="nfb-list-fbtarget">
                {{ formatTarget(nofeedback.trnfSubmissionDue) }}
              </div>
              <div class="nfb-list-fbStatus">미작성</div>
              <div class="nfb-list-mbrName">{{ nofeedback.mbrName }}</div>
            </button>
          </div>
          <CreateFeedbackModal
            :show="showDetail"
            :noFeedbackData="selectedNoFeedback"
            @action:reload="listReload"
            @close="showDetail = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import CreateFeedbackModal from './CreateFeedbackModal.vue'
import ApiClient from '/src/services/api.js'
</script>

<script>
export default {
  components: {
    CreateFeedbackModal,
  },
  data() {
    return {
      showDetail: false,
      selectedNoFeedback: null,
      noFeedbackList: [],
      trnSeq: 1,
    }
  },
  async created() {
    let response = await ApiClient.get('/trainers/me')
    ApiClient.get('/trainers/' + response.trnSeq + '/nofeedback')
      .then(response => {
        this.noFeedbackList = response
      })
      .catch(error => {
        console.error('API 요청 실패:', error)
      })
  },
  methods: {
    showDetailModal(nofeedback) {
      this.selectedNoFeedback = nofeedback
      this.showDetail = true
    },
    formatDate(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD')
    },
    formatTarget(timestamp) {
      return moment(timestamp).format('YYYY-MM')
    },
    nfbCnt() {
      return this.noFeedbackList.length
    },
    async listReload() {
      let response = await ApiClient.get('/trainers/me')
      ApiClient.get('/trainers/' + response.trnSeq + '/nofeedback')
        .then(response => {
          this.noFeedbackList = response
        })
        .catch(error => {
          console.error('API 요청 실패:', error)
        })
    },
  },
}
</script>

<style scoped>
.nfb-list-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.nfb-list-container {
  display: flex;
  flex-direction: column;
  width: 800px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.nfb-list-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.nfb-list-seq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-ptSeq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-ptDate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-fbtarget {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-fbStatus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-mbrName {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
}
.nfb-list-category {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  background-color: rgb(234, 236, 244);
  color: black;
  font-weight: 500;
  border-bottom: 1px solid rgb(205, 205, 205);
  margin-bottom: 5px;
}
.nfb-list {
  display: flex;
  justify-items: center;
  border-bottom: 1px solid rgb(205, 205, 205);
}
.nfb-list:hover {
  font-weight: 900;
  color: rgb(199, 0, 57);
  cursor: pointer;
}
</style>
