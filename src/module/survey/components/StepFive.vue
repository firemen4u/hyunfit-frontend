<template>
  <div class="center-container">
    <div style="margin-bottom: 30px">
      <div class="title">원하는 운동 구성을 선택해주세요!</div>
      <div class="subtitle">원하시는 운동 구성으로 추천해드릴께요!</div>
    </div>
    <!-- 설문조사 표 -->
    <table class="survey-table">
      <tbody>
        <tr v-for="(question, index) in surveyQuestions" :key="index">
          <td>
            <label class="custom-radio">
              <input
                type="radio"
                :value="index"
                v-model="selectedOption"
                @change="logSelectedOption"
              />
              <span class="custom-radio-button"></span>
              {{ question }}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    memberInfo: Object,
  },
  data() {
    return {
      surveyQuestions: [
        '상체 근력 및 유산소 운동',
        '하체 근력 및 유산소 운동',
        '상/하체 근력 및 유산소 운동',
        '서킷트레이닝(전체 유산소 운동)',
      ],
      selectedOption: null, // 선택한 옵션 저장
      currentMember: this.memberInfo,
    }
  },
  methods: {
    logSelectedOption() {
      // 선택한 옵션을 콘솔에 출력
      console.log(this.selectedOptions)
      this.currentMember.mbrExerciseTarget = this.selectedOption + 1
      this.$emit('updateMemberInfo', this.currentMember)
    },
  },
}
</script>

<style scoped>
/* 스타일 추가 */
.center-container {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.title {
  font-size: 1.2em;
  color: black;
}

.subtitle {
  font-size: 0.8em;
  color: gray;
}

.survey-table {
  width: 300px;
  margin-top: 20px;
  border-collapse: collapse;
}

.survey-table tbody {
  border: 1px solid #ccc;
}

.survey-table th,
.survey-table td {
  padding: 8px;
  text-align: left;

  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.survey-table th {
  background-color: #f0f0f0;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.survey-table input[type='checkbox'] {
  margin-right: 8px;
}
.custom-radio {
  position: relative;
  display: inline-block;
  padding-left: 30px; /* 여백을 조절하여 체크박스 크기 조절 가능 */
  cursor: pointer;
}

.custom-radio input[type='radio'] {
  display: none;
}
.custom-radio-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px; /* 체크박스 크기 조절 가능 */
  height: 20px; /* 체크박스 크기 조절 가능 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.custom-radio input[type='radio']:checked + .custom-radio-button {
  background-color: #d23360d2; /* 체크된 상태의 배경색 설정 */
  border-color: #d23360d2; /* 체크된 상태의 테두리 색 설정 */
}
</style>
