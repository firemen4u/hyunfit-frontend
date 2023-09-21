<template>
  <div>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <!--헤더부분-->
        <div class="flex justify-between ml-1 mr-1 mb-2">
          <div class="mr-10 font-bold"><h2>예약 상세 정보</h2></div>
          <div class=""><button @click="closeModal">닫기</button></div>
        </div>
        <div class="flex divider"></div>
        <!--바디부분-->
        <div class="flex flex-row ml-4 mt-4">
          <!--카테고리-->
          <div class="flex flex-col mr-4 items-center">
            <div class="rsvdetail-category">예약번호</div>
            <div class="rsvdetail-category">예약일자</div>
            <div class="rsvdetail-category">예약시간</div>
            <div class="rsvdetail-category">예약상태</div>
            <div class="rsvdetail-category">회 원 명</div>
          </div>
          <!--정보-->
          <div class="flex flex-col items-center">
            <div class="info-gray-box">{{ reservationData.ptSeq }}</div>
            <div class="info-gray-box">
              {{ formatDate(reservationData.ptReservationDate) }}
            </div>
            <div class="info-gray-box">
              {{ formatTime(reservationData.ptReservationDate) }}
            </div>
            <div class="info-gray-box">
              {{ reservationData.ptReservationStatus }}
            </div>
            <div class="info-gray-box">{{ reservationData.mbrName }}</div>
          </div>
        </div>
        <!--고객요청사항-->
        <div class="flex flex-col gap-2 ml-4 mb-4">
          <div class="font-semibold">고객요청사항</div>
          <div class="sticker-container">
            <BaseCheckChip
              class="mr-2 mb-2"
              v-for="(option, index) in options"
              :key="index"
              :label="option"
            />
          </div>
        </div>
        <div class="flex divider"></div>
        <!--꼬리(입장버튼)-->
        <div class="flex justify-center mt-2">
          <button class="ptEntryButton" @click="entryPtRoom">
            PT Room 입장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import BaseCheckChip from '@/module/@base/components/BaseCheckChip.vue'
</script>
<script>
export default {
  props: {
    reservationData: Object,
    show: Boolean,
  },
  data() {
    return {
      options: [
        '운동이 처음이에요',
        '살을 빼고 싶어요',
        '코어를 강화하고 싶어요',
        '부상 이력이 있어요',
        '식단 조언도 함께 받고 싶어요',
      ],
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    entryPtRoom() {
      let ptSeq = this.reservationData.ptSeq
      window.open('http://localhost:5173/PtRoom', '_blank')
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
.rsvdetail-category {
  display: flex;
  align-items: center;
  width: 70px;
  height: 30px;
  font-weight: 600;
  margin-bottom: 12px;
}
.info-gray-box {
  display: flex;
  align-items: center;
  background-color: rgb(234, 236, 244);
  width: 260px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 12px;
}
.needs-gray-box {
  background-color: rgb(234, 236, 244);
  width: 350px;
  height: 100px;
  padding: 10px;
  display: inline-block;
  border-radius: 5px;
}
.sticker-container {
  width: 400px;
}
.ptEntryButton {
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
