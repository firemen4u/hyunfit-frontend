<template>
  <div>
    <v-dialog v-model="show" width="650">
      <v-card>
        <!--헤더부분-->
        <div class="flex flex-col px-10 py-5">
          <div class="mt-3">
            <div class="flex justify-between">
              <span class="headline text-3xl font-black mb-10"
                >예약 상세 정보</span
              >
              <v-spacer></v-spacer>
              <v-btn
                @click="closeModal"
                :icon="CrossSvg"
                size="small"
                variant="text"
              />
            </div>
          </div>
          <div>
            <div class="headline text-2xl font-bold mb-3">예약정보</div>
            <div class="flex flex-row">
              <!--카테고리-->
              <div class="flex flex-col items-center">
                <div class="rsvdetail-category">예약번호</div>
                <div class="rsvdetail-category">예약일자</div>
              </div>
              <!--정보-->
              <div class="flex flex-col items-center">
                <div class="info-gray-box">{{ reservationData.ptSeq }}</div>
                <div class="info-gray-box">
                  {{ formatDate(reservationData.ptReservationDate) }}
                </div>
              </div>
              <div class="flex flex-col items-center">
                <div class="rsvdetail-category">예약상태</div>
                <div class="rsvdetail-category">예약시간</div>
              </div>
              <div class="flex flex-col items-center">
                <div class="info-gray-box">
                  {{ reservationData.ptReservationStatus }}
                </div>
                <div class="info-gray-box">
                  {{ formatTime(reservationData.ptReservationDate) }}
                </div>
              </div>
            </div>
            <div class="headline text-2xl font-bold mt-7 mb-3">회원정보</div>
            <div class="flex flex-row mb-3">
              <!--카테고리-->
              <div class="flex flex-col items-center">
                <div class="rsvdetail-category">회원번호</div>
                <pre class="rsvdetail-category">성별</pre>
                <pre class="rsvdetail-category">키</pre>
                <div class="rsvdetail-category">운동 레벨</div>
              </div>
              <!--정보-->
              <div class="flex flex-col items-center">
                <div class="info-gray-box">{{ reservationData.mbrSeq }}</div>
                <div class="info-gray-box">
                  {{ memberInfo?.mbrGender }}
                </div>
                <div class="info-gray-box">
                  {{ memberInfo?.mbrHeight }}
                </div>
                <div class="info-gray-box">
                  {{ memberInfo?.mbrExerciseExperienceLevel }}
                </div>
              </div>
              <div class="flex flex-col items-center">
                <pre class="rsvdetail-category">회원명</pre>
                <div class="rsvdetail-category">운동 목표</div>
                <pre class="rsvdetail-category">몸무게</pre>
              </div>
              <div class="flex flex-col items-center">
                <div class="info-gray-box">
                  {{ reservationData.mbrName }}
                </div>
                <div class="info-gray-box">
                  {{ memberInfo?.mbrExerciseGoal }}
                </div>
                <div class="info-gray-box">
                  {{ memberInfo?.mbrWeight }}
                </div>
              </div>
            </div>
            <!--고객요청사항-->
            <div v-if="reservationData.ptNoteStickers" class="flex flex-col">
              <div class="text-2xl font-bold mt-5 mb-3">회원요청사항</div>
              <BaseRequestChipGroup
                :stickers="reservationData.ptNoteStickers"
              />
            </div>
          </div>
          <!--꼬리(입장버튼)-->
          <div class="flex justify-center mb-5 mt-10">
            <v-btn
              height="50"
              width="250"
              color="primary"
              v-if="
                reservationData.ptReservationStatus == '예정' ||
                reservationData.ptReservationStatus == '재입장'
              "
              @click="enterPtRoom"
            >
              <div class="text-lg font-black">라이브클래스 입장</div>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { BaseChipGroup } from '@/module/@base/components'
import CrossSvg from '@/module/@base/svg/CrossSvg.vue'
import ApiClient from '/src/services/api.js'
import BaseRequestChipGroup from '@/module/@base/components/BaseRequestChipGroup.vue'
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
      memberInfo: {
        mbrGender: null,
        mbrHeight: null,
        mbrWeight: null,
        mbrExerciseGoal: null,
        mbrExerciseExperienceLevel: null,
      },
    }
  },
  emits: ['update:modelValue', 'action:reload'],
  computed: {
    show: {
      get() {
        //api한번더 멤버 정보 성향정보
        //매핑 시키고
        if (this.modelValue == true) {
          this.init()
        }
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
  methods: {
    async init() {
      let res = await ApiClient.get(
        '/members/by/' + this.reservationData.mbrSeq
      )
      console.log(res)
      if (res.mbrExerciseExperienceLevel == 1) {
        this.memberInfo.mbrExerciseExperienceLevel = '초급'
      } else if (res.mbrExerciseExperienceLevel == 2) {
        this.memberInfo.mbrExerciseExperienceLevel = '초중급'
      } else if (res.mbrExerciseExperienceLevel == 3) {
        this.memberInfo.mbrExerciseExperienceLevel = '중급'
      } else if (res.mbrExerciseExperienceLevel == 4) {
        this.memberInfo.mbrExerciseExperienceLevel = '중상급'
      } else if (res.mbrExerciseExperienceLevel == 5) {
        this.memberInfo.mbrExerciseExperienceLevel = '상급'
      }
      if (res.mbrExerciseGoal == 1) {
        this.memberInfo.mbrExerciseGoal = '체중관리'
      } else {
        this.memberInfo.mbrExerciseGoal = '건강관리'
      }
      if (res.mbrGender == 1) {
        this.memberInfo.mbrGender = '남성'
      } else {
        this.memberInfo.mbrGender = '여성'
      }
      this.memberInfo.mbrHeight = res.mbrHeight
      this.memberInfo.mbrWeight = res.mbrWeight
    },
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
  background-color: rgb(243 244 246);
  width: 200px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 12px;
  margin-right: 10px;
}
</style>
