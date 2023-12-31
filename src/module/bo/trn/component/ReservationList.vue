<template>
  <div class="rsv-list-container">
    <div class="h-28 mt-3">
      <div v-if="showCardList" class="flex flex-row justify-between">
        <div v-for="index in 5" :key="index">
          <ReservationSummaryCard
            class="shadow-lg"
            :sendToChild="sendingData"
            :index="index"
          ></ReservationSummaryCard>
        </div>
      </div>
    </div>
    <div class="rsv-list-inner">
      <div class="flex flex-col bg-white mt-1 mb-1">
        <div class="rsv-list-category">
          <div class="rsv-list-seq">#</div>
          <div class="rsv-list-ptSeq">예약번호</div>
          <div class="rsv-list-mbrName">회원명</div>
          <div class="rsv-list-ptDate">예약일자</div>
          <div class="rsv-list-ptTime">예약시간</div>
          <div class="rsv-list-ptStatus">예약상태</div>
        </div>
        <div>
          <div v-if="reservations.length === 0" class="rsv-noData">
            이달의 예약이 없습니다.
          </div>
          <div
            class="rsv-list-content"
            v-for="(reservation, index) in paginatedReservations"
            :key="index"
          >
            <button class="rsv-list mb-1" @click="showDetailModal(reservation)">
              <div class="rsv-list-seq">{{ index + 1 }}</div>
              <div class="rsv-list-ptSeq">{{ reservation.ptSeq }}</div>
              <div class="rsv-list-mbrName">{{ reservation.mbrName }}</div>
              <div class="rsv-list-ptDate">
                {{ formatDate(reservation.ptReservationDate) }}
              </div>
              <div class="rsv-list-ptTime">
                {{ formatTime(reservation.ptReservationDate) }}
              </div>
              <div class="rsv-list-ptStatus">
                {{ reservation.ptReservationStatus }}
              </div>
            </button>
          </div>
          <ReservationDetailModal
            v-model="showDetail"
            :reservationData="selectedReservation"
            @action:reload="listReload"
          />
        </div>
      </div>
      <BasePagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script setup>
import ReservationDetailModal from '/src/module/bo/trn/component/ReservationDetailModal.vue'
import ReservationSummaryCard from '/src/module/bo/trn/component/ReservationSummaryCard.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import ApiClient from '/src/services/api.js'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
</script>

<script>
export default {
  components: {
    ReservationDetailModal,
    ReservationSummaryCard,
  },
  props: {
    targetDate: String,
  },
  data() {
    return {
      showCardList: false,
      sendingData: {
        totalCnt: 0,
        completeCnt: 0,
        noShowCnt: 0,
        upcomingCnt: 0,
        cancelCnt: 0,
      },
      showDetail: false,
      selectedReservation: null,
      reservations: [],
      startDate: '',
      endDate: '',
      currentPage: 1,
      totalPages: 0,
      loadInterval: null,
    }
  },
  computed: {
    paginatedReservations() {
      const itemsPerPage = 10
      const startIndex = (this.currentPage - 1) * itemsPerPage
      const endIndex = Math.min(
        startIndex + itemsPerPage,
        this.reservations.length
      )
      return this.reservations.slice(startIndex, endIndex)
    },
  },
  async mounted() {
    await this.loadReservations()
    this.loadInterval = setInterval(async () => {
      await this.loadReservations()
    }, 5000)
  },
  async beforeUnmount() {
    clearInterval(this.loadInterval)
  },
  methods: {
    async loadReservations() {
      this.startDate = dayjs(this.targetDate)
        .startOf('month')
        .format('YYYY-MM-01 00:00:00')
      this.endDate = dayjs(this.targetDate)
        .endOf('month')
        .format('YYYY-MM-DD 00:00:00')
      let resposeData = await ApiClient.get('/trainers/me')
      await ApiClient.get(
        '/trainers/' + resposeData.trnSeq + '/personal-training',
        { params: { startDate: this.startDate, endDate: this.endDate } }
      )
        .then(response => {
          if (response !== null) {
            this.reservations = response
            this.totalPages = Math.ceil(response.length / 10)
            this.calCnt()
            this.showCardList = true
          }
        })
        .catch(error => {
          console.error('API 요청 실패:', error)
        })
    },
    showDetailModal(reservation) {
      this.selectedReservation = reservation
      this.showDetail = true
    },
    calCnt() {
      for (let i = 0; i < this.reservations.length; i++) {
        const reservation = this.reservations[i]
        if (reservation.ptReservationStatus === 1) {
          reservation.ptReservationStatus = '예정'
          this.sendingData.upcomingCnt = this.sendingData.upcomingCnt + 1
        } else if (reservation.ptReservationStatus === 2) {
          reservation.ptReservationStatus = '재입장'
        } else if (reservation.ptReservationStatus === 3) {
          reservation.ptReservationStatus = '완료'
          this.sendingData.completeCnt = this.sendingData.completeCnt + 1
        } else if (reservation.ptReservationStatus === 4) {
          reservation.ptReservationStatus = '취소'
          this.sendingData.cancelCnt = this.sendingData.cancelCnt + 1
        } else if (reservation.ptReservationStatus === 5) {
          reservation.ptReservationStatus = '노쇼'
          this.sendingData.noShowCnt = this.sendingData.noShowCnt + 1
        }
      }
      this.sendingData.totalCnt = this.reservations.length
    },
    formatDate(timestamp) {
      return dayjs(timestamp).locale('ko').format('YYYY-MM-DD')
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${hours}:${minutes}`
    },
    async listReload() {
      let resposeData = await ApiClient.get('/trainers/me')
      await ApiClient.get(
        '/trainers/' + resposeData.trnSeq + '/personal-training',
        { params: { startDate: this.startDate, endDate: this.endDate } }
      )
        .then(response => {
          this.reservations = response
          this.calCnt()
        })
        .catch(error => {
          console.error('API 요청 실패:', error)
        })
    },
  },
}
</script>

<style scoped>
.rsv-list-container {
  display: flex;
  flex-direction: column;
  width: 1000px;
}
.rsv-list-inner {
  display: flex;
  flex-direction: column;
  width: 1000px;
  background-color: white;
  min-height: 505px;
  justify-content: space-between;
}
.rsv-list-seq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptSeq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptDate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptTime {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptStatus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-mbrName {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 35px;
}
.rsv-list-category {
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
.rsv-list {
  display: flex;
  justify-items: center;
  border-bottom: 1px solid rgb(205, 205, 205);
}
.rsv-noData {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  width: 1000px;
  height: 380px;
}
.rsv-list:hover {
  font-weight: 900;
  color: rgb(3, 0, 199);
  cursor: pointer;
}
</style>
