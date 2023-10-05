<template>
  <div>
    <v-dialog v-model="show" max-width="605">
      <v-card>
        <!--헤더부분-->
        <v-card-title class="mt-3">
          <div class="flex justify-between ml-1">
            <span class="headline text-2xl font-bold">예약 상세 정보</span>
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
          <div class="headline text-xl font-semibold mb-2">예약정보</div>
          <div class="flex flex-row mb-3">
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
          <div class="headline text-xl font-semibold mb-2">회원정보</div>
          <div class="flex flex-row mb-3">
            <!--카테고리-->
            <div class="flex flex-col items-center">
              <div class="rsvdetail-category">회원번호</div>
              <pre class="rsvdetail-category">성       별</pre>
              <pre class="rsvdetail-category">키</pre>
              <div class="rsvdetail-category">운동레벨</div>
            </div>
            <!--정보-->
            <div class="flex flex-col items-center">
              <div class="info-gray-box">{{ reservationData.mbrSeq }}</div>
              <div class="info-gray-box">{{ this.memberInfo.mbrGender }}</div>
              <div class="info-gray-box">{{ this.memberInfo.mbrHeight }}</div>
              <div class="info-gray-box">
                {{ this.memberInfo.mbrExerciseExperienceLevel }}
              </div>
            </div>
            <div class="flex flex-col items-center">
              <pre class="rsvdetail-category">회  원  명</pre>
              <div class="rsvdetail-category">운동목표</div>
              <pre class="rsvdetail-category">몸  무  게</pre>
            </div>
            <div class="flex flex-col items-center">
              <div class="info-gray-box">
                {{ reservationData.mbrName }}
              </div>
              <div class="info-gray-box">
                {{ this.memberInfo.mbrExerciseGoal }}
              </div>
              <div class="info-gray-box">{{ this.memberInfo.mbrWeight }}</div>
            </div>
          </div>
          <!--고객요청사항-->
          <div class="flex flex-col">
            <div class="text-xl font-semibold">회원요청사항</div>
            <div class="sticker-container">
              <BaseChipGroup
                v-model="options"
                :items="options"
                :disabled="true"
                :filter="true"
                :font-size="11"
              />
            </div>
          </div>
        </v-card-text>
        <!--꼬리(입장버튼)-->
        <div class="flex justify-center mb-5 mt-3">
          <v-btn
            width="200"
            color="primary"
            v-if="
              reservationData.ptReservationStatus == '예정' ||
              reservationData.ptReservationStatus == '재입장'
            "
            @click="enterPtRoom"
          >
            라이브클래스 입장
          </v-btn>
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
        this.memberInfo.mbrExerciseGoal = '체지방감량'
      } else {
        this.memberInfo.mbrExerciseGoal = '근량증대'
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
  background-color: rgb(234, 236, 244);
  width: 200px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 12px;
  margin-right: 10px;
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
