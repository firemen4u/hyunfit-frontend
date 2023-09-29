<template>
  <div class="nfb-list-container">
    <div v-if="showCardList" class="fb-smr-card-container mt-3 mb-5">
      <div v-for="index in 3" :key="index">
        <FeedbackSummaryCard
          class="shadow-lg"
          :sendToChild="sendingData"
          :index="index"
        ></FeedbackSummaryCard>
      </div>
    </div>
    <div class="nfb-list-inner content-between">
      <div class="flex flex-col bg-white mt-1 mb-1">
        <div class="nfb-list-category">
          <div class="nfb-list-seq">#</div>
          <div class="nfb-list-fbSeq">피드백번호</div>
          <div class="nfb-list-ptDate">최근PT일자</div>
          <div class="nfb-list-fbtarget">피드백대상월</div>
          <div class="nfb-list-fbStatus">작성상태</div>
          <div class="nfb-list-mbrName">회 원 명</div>
        </div>
        <div>
          <div v-if="noFeedbackList.length === 0" class="nfb-noData">
            이달의 피드백이 없습니다.
          </div>
          <div
            class="nfb-list-content"
            v-for="(nofeedback, index) in paginatedNofeedbacks"
            :key="index"
          >
            <button class="nfb-list mb-1" @click="showDetailModal(nofeedback)">
              <div class="nfb-list-seq">{{ index + 1 }}</div>
              <div class="nfb-list-fbSeq">{{ nofeedback.trnfSeq }}</div>
              <div class="nfb-list-ptDate">
                {{ formatDate(nofeedback.trnfCreationDate) }}
              </div>
              <div class="nfb-list-fbtarget">
                {{ formatTarget(nofeedback.trnfSubmissionDue) }}
              </div>
              <div class="nfb-list-fbStatus">
                {{ nofeedback.trnfContent !== null ? '완료' : '미완료' }}
              </div>
              <div class="nfb-list-mbrName">{{ nofeedback.mbrName }}</div>
            </button>
          </div>
          <CreateFeedbackModal
            v-model="showDetail"
            :noFeedbackData="selectedNoFeedback"
            @action:reload="listReload"
          />
        </div>
      </div>
      <BasePagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import CreateFeedbackModal from './CreateFeedbackModal.vue'
import ApiClient from '/src/services/api.js'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import FeedbackSummaryCard from '/src/module/bo/trn/component/FeedbackSummaryCard.vue'
</script>

<script>
export default {
  components: {
    CreateFeedbackModal,
    FeedbackSummaryCard,
  },
  props: {
    targetDate: String,
  },
  data() {
    return {
      showDetail: false,
      selectedNoFeedback: null,
      noFeedbackList: [],
      sendingData: {
        totalCnt: 0,
        writeCnt: 0,
        unWriteCnt: 0,
      },
      showCardList: false,
      currentPage: 1,
      totalPages: 0,
    }
  },
  computed: {
    paginatedNofeedbacks() {
      const itemsPerPage = 10
      const startIndex = (this.currentPage - 1) * itemsPerPage
      const endIndex = Math.min(
        startIndex + itemsPerPage,
        this.noFeedbackList.length
      )
      return this.noFeedbackList.slice(startIndex, endIndex)
    },
  },
  async created() {
    this.startDate = dayjs(this.targetDate)
      .startOf('month')
      .format('YYYY-MM-01 00:00:00')
    this.endDate = dayjs(this.targetDate)
      .endOf('month')
      .format('YYYY-MM-DD 00:00:00')
    let response = await ApiClient.get('/trainers/me')
    await ApiClient.get('/trainers/' + response.trnSeq + '/nofeedback', {
      params: { startDate: this.startDate, endDate: this.endDate },
    })
      .then(response => {
        this.noFeedbackList = response
        this.totalPages = Math.ceil(response.length / 10)
        this.calCnt()
        this.showCardList = true
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
      return dayjs(timestamp).locale('ko').format('YYYY-MM-DD')
    },
    formatTarget(timestamp) {
      return dayjs(timestamp).locale('ko').format('YYYY-MM')
    },
    calCnt() {
      for (let i = 0; i < this.noFeedbackList.length; i++) {
        const feedback = this.noFeedbackList[i]
        if (feedback.trnfContent === null) {
          this.sendingData.unWriteCnt = this.sendingData.unWriteCnt + 1
        } else {
          this.sendingData.writeCnt = this.sendingData.writeCnt + 1
        }
      }
      this.sendingData.totalCnt = this.nfbCnt()
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
.fb-smr-card-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 980px;
  height: 100px;
}
.nfb-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  width: 1000px;
}
.nfb-list-inner {
  display: flex;
  flex-direction: column;
  width: 1000px;
  min-height: 505px;
  justify-content: space-between;
  background-color: white;
}
.nfb-list-seq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-fbSeq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-ptDate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-fbtarget {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-fbStatus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  margin-right: 10px;
}
.nfb-list-mbrName {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
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
.nfb-noData {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  width: 1000px;
  height: 380px;
}
</style>
