<template>
  <div class="center-container">
    <div style="margin-bottom: 30px">
      <div class="title">
        현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!
      </div>
      <div class="subtitle">
        현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!
      </div>
    </div>
    <div>
      <v-text-field
        class="mx-atuo mb-2"
        label="생년월일"
        variant="outlined"
        placeholder="YYYYMMDD"
        clearable
        hint="YYYYMMDD 형식으로 써주세요"
        v-model="birthdate"
      ></v-text-field>
      <!-- 성별 입력 (라디오 버튼 - TE) -->
      <div class="flex w-full relative mb-6">
        <input type="radio" id="option0" name="tabs" class="appearance-none" />
        <input
          type="radio"
          id="option0"
          name="tabs"
          class="appearance-none"
          v-model="gender"
          value="남자"
        />
        <label
          for="option0"
          class="cursor-pointer w-1/3 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-md py-2 border border-gray-500"
          >남자</label
        >

        <input
          type="radio"
          id="option1"
          name="tabs"
          class="appearance-none"
          v-model="gender"
          value="여자"
        />
        <label
          for="option1"
          class="cursor-pointer w-1/3 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-md py-2 border border-gray-500"
          >여자</label
        >

        <input
          type="radio"
          id="option2"
          name="tabs"
          class="appearance-none"
          v-model="gender"
          value="선택 안함"
        />
        <label
          for="option2"
          class="cursor-pointer w-1/3 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-md py-2 border border-gray-500"
          >선택 안함</label
        >

        <div
          class="w-1/3 flex-[2_2_0%] items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-md p-0 h-full bg-red-400 absolute transform transition-transform tabAnim"
        ></div>
      </div>

      <!-- 키 입력 -->
      <v-text-field
        class="mb-2"
        label="키"
        variant="outlined"
        suffix="cm"
        clearable
        hint="소수점 첫번째 자리까지 입력할수있습니다."
        v-model="height"
      ></v-text-field>

      <!-- 몸무게 입력 -->
      <v-text-field
        class="mb-2"
        label="몸무게"
        variant="outlined"
        suffix="kg"
        clearable
        hint="소수점 첫번째 자리까지 입력할수있습니다."
        v-model="weight"
      ></v-text-field>

      <!-- 정보 수집 동의 (체크박스) -->
      <div>
        <v-checkbox
          label="키, 몸무게 입력시 민갑 정보수집에 동의합니다"
          v-model="consent"
          @change="logData"
        ></v-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const birthdate = ref('') // 생년월일
const gender = ref('') // 성별
const height = ref('') // 키
const weight = ref('') // 몸무게
const consent = ref('') // 정보 수집 동의 여부

function logData() {
  console.log('생년월일:', birthdate.value)
  console.log('성별:', gender.value)
  console.log('키:', height.value)
  console.log('몸무게:', weight.value)
  console.log('정보 수집 동의 여부:', consent.value)
}
</script>

<style scoped>
/* 스타일 추가 */
/* 중앙 정렬 컨테이너 스타일 */
.center-container {
  height: 500px;
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  align-items: center; /* 내부 요소를 가로로 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
  justify-content: center;
}

.title {
  /* 제목 스타일 */
  font-size: 1.2em;
  color: black;
}

.subtitle {
  /* 부제목 스타일 */
  font-size: 0.8em;
  color: gray;
}

.tabAnim {
  z-index: -9;
}

#option0:checked ~ div {
  --tw-translate-x: 0%;
}

#option1:checked ~ div {
  --tw-translate-x: 100%;
}

#option2:checked ~ div {
  --tw-translate-x: 200%;
}
</style>
