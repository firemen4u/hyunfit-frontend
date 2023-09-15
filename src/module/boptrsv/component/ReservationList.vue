<template>
  <!--최상위 div-->
  <div class="rsv-list-container">
    <div class="rsv-list-header flex items-center bg-gray-100 text-black h-9">
      <div class="ml-4">오늘 예약 현황 ({{ rsvCnt }}건)</div>
    </div>
    <div class="rsv-list-inner">
      <div class="flex flex-col bg-white mt-6 mb-6">
        <!--카테고리명(컬럼명)-->
        <div class="rsv-list-category">
          <div class="rsv-list-seq">#</div>
          <div class="rsv-list-ptSeq">예약번호</div>
          <div class="rsv-list-ptDate">예약일자</div>
          <div class="rsv-list-ptTime">예약시간</div>
          <div class="rsv-list-ptStatus">예약상태</div>
          <div class="rsv-list-mbrName">회 원 명</div>
        </div>
        <!--리스트(행)-->
        <div class="rsv-list-content">
          <div v-for="(reservation, index) in reservations" :key="index">
            <button class="rsv-list mb-1" @click="showDetailModal(reservation)">
              <div class="rsv-list-seq">{{ index + 1 }}</div>
              <div class="rsv-list-ptSeq">{{ reservation.ptSeq }}</div>
              <div class="rsv-list-ptDate">
                {{ formatDate(reservation.ptReservationDate) }}
              </div>
              <div class="rsv-list-ptTime">
                {{ formatTime(reservation.ptReservationDate) }}
              </div>
              <div class="rsv-list-ptStatus">
                {{ reservation.ptReservationStatus }}
              </div>
              <div class="rsv-list-mbrName">{{ reservation.mbrName }}</div>
            </button>
          </div>
          <ReservaionDetailModal
            :show="showDetail"
            :reservationData="selectedReservation"
            @close="showDetail = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ReservaionDetailModal from '/src/module/boptrsv/component/ReservationDetailModal.vue'
import axios from 'axios'
import moment from 'moment'
</script>

<script>
export default {
  components: {
    ReservaionDetailModal,
  },
  created() {
    console.log('create')
    axios
      .get('http://localhost:8080/trainers/1/personal-training')
      .then(response => {
        console.log('reseponse')
        this.reservations = response.data
        console.log(response.data)
        this.plusCnt()
        this.sendCntToParent()
      })
      .catch(error => {
        console.error('API 요청 실패:', error)
      })
  },
  methods: {
    sendCntToParent() {
      const cntList = {
        completeCnt: this.completeCnt,
        noShowCnt: this.noShowCnt,
        upcomingCnt: this.upcomingCnt,
      }
      console.log('자식에게 주는 데이터:', cntList)
      this.$emit('send-cntlist', cntList)
    },
    showDetailModal(reservation) {
      this.selectedReservation = reservation
      this.showDetail = true
    },
    plusCnt() {
      for (let i = 0; i < this.reservations.length; i++) {
        const reservation = this.reservations[i]
        if (reservation.ptReservationStatus === 3) {
          reservation.ptReservationStatus = '완료'
          this.completeCnt = this.completeCnt + 1
        } else if (reservation.ptReservationStatus === 2) {
          reservation.ptReservationStatus = '노쇼'
          this.noShowCnt = this.noShowCnt + 1
        } else {
          reservation.ptReservationStatus = '예정'
          this.upcomingCnt = this.upcomingCnt + 1
        }
      }
    },
    formatDate(timestamp) {
      return moment(timestamp).format('YYYY-MM-DD')
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${hours}:${minutes}`
    },
  },
  data() {
    return {
      completeCnt: 0,
      noShowCnt: 0,
      upcomingCnt: 0,
      showDetail: false,
      selectedReservation: null,
      reservations: [],
    }
  },
  computed: {
    rsvCnt() {
      return this.reservations.length
    },
  },
}
</script>

<style scoped>
.rsv-list-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.rsv-list-container {
  display: flex;
  flex-direction: column;
  width: 800px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.rsv-list-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.rsv-list-seq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptSeq {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptDate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptTime {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-ptStatus {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 35px;
  margin-right: 10px;
}
.rsv-list-mbrName {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
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
.rsv-list:hover {
  font-weight: 900;
  color: rgb(199, 0, 57);
  cursor: pointer;
}
</style>
