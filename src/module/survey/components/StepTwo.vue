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
      <!-- 생년월일 입력 -->
      <input
        type="date"
        id="birthdate"
        v-model="birthdate"
        class="input-field"
      />

      <!-- 성별 입력 (라디오 버튼) -->
      <div class="radio-group">
        <input type="radio" id="male" value="남성" v-model="gender" />
        <label for="male" class="radio-label">남성</label>
        <input type="radio" id="female" value="여성" v-model="gender" />
        <label for="female" class="radio-label">여성</label>
        <input type="radio" id="none" value="선택안함" v-model="gender" />
        <label for="none" class="radio-label">선택안함</label>
      </div>

      <!-- 키 입력 -->
      <input
        placeholder="키"
        type="number"
        id="height"
        v-model="height"
        class="input-field"
      />

      <!-- 몸무게 입력 -->
      <input
        placeholder="몸무게"
        type="number"
        id="weight"
        v-model="weight"
        class="input-field"
      />

      <!-- 정보 수집 동의 (체크박스) -->
      <div>
        <input type="checkbox" id="consent" v-model="consent" />
        <label for="consent" class="checkbox-label"
          >키, 몸무게 입력시 민갑 정보수집에 동의합니다</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birthdate: '', // 생년월일
      gender: '', // 성별
      height: '', // 키
      weight: '', // 몸무게
      consent: false, // 정보 수집 동의 여부
    }
  },
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

.input-field {
  width: 100%; /* 입력 칸 너비 설정 */
  padding: 8px;
  margin-bottom: 12px;
  background-color: #f0f0f0; /* 회색 배경색 설정 */
  border: 1px solid #ccc; /* 테두리 설정 */
  border-radius: 4px; /* 테두리 둥글게 만들기 */
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 16px; /* 라디오 버튼 사이 간격 설정 */
}

.radio-label {
  cursor: pointer;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 라디오 버튼 체크 표시 없애기 */
.radio-group input[type='radio'] {
  display: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 2px solid #ccc; /* 선택되지 않은 상태의 외곽선 */
  border-radius: 50%; /* 원 모양으로 만들기 */
  width: 16px; /* 가로 크기 조절 */
  height: 16px; /* 세로 크기 조절 */
  margin-right: 4px; /* 라벨과의 간격 조절 */
  background-color: transparent; /* 배경색 투명하게 */
  cursor: pointer;
}

/* 라디오 버튼 선택시의 스타일 */
.radio-group input[type='radio']:checked {
  border-color: #007bff; /* 선택된 상태의 외곽선 색상 */
  background-color: #007bff; /* 선택된 상태의 배경색 */
}

.checkbox-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
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
</style>
