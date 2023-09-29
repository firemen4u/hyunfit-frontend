<template>
  <div>
    <v-dialog v-model="show" max-width="400px">
      <v-card>
        <!--헤더부분-->
        <v-card-title class="mt-3">
          <div class="flex justify-between ml-1">
            <span class="headline text-2xl">예약 상세 정보</span>
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
          <!--바디부분-->
          <div class="flex flex-row">
            <!--카테고리-->
            <div class="flex flex-col items-center">
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
          <div class="flex flex-col">
            <div class="font-semibold mt-1">고객요청사항</div>
            <div class="sticker-container mt-3">
              <BaseCheckChip
                class="mr-2 mb-2"
                v-for="(option, index) in options"
                :key="index"
                :disabled="true"
                :label="option"
              />
            </div>
          </div>
        </v-card-text>
        <!--꼬리(입장버튼)-->
        <div class="flex justify-center mb-5">
          <v-btn color="primary" @click="enterPtRoom"> PT Room 입장 </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import BaseCheckChip from '@/module/@base/components/BaseCheckChip.vue'
import { BaseChipGroup } from '@/module/@base/components'
import CrossSvg from '@/module/@base/svg/CrossSvg.vue'
</script>
<script>
import router, { pathNames } from '@/router'

export default {
  props: {
    reservationData: Object,
    modelValue: Boolean,
  },
  data() {
    return {
      options: [
        '운동이 처음이에요',
        '살을 빼고 싶어요',
        '부상 이력이 있어요',
        '코어를 강화하고 싶어요',
        '식단 조언도 함께 받고 싶어요',
      ],
    }
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
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
      this.$emit('action:reload')
    },
    enterPtRoom() {
      localStorage.setItem('ptSeq', this.reservationData.ptSeq)
      window.open(router.resolve(pathNames.ptRoomPage.name).href, '_blank')
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
</style>
