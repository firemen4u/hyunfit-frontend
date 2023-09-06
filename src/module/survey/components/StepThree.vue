<template>
  <div class="center-container">
    <div style="margin-bottom: 30px">
      <div class="title">현핏 트레이너 에게 당신의 체력을 알려주세요!</div>
      <div class="subtitle">체력을 고려한 운동을 추천해 드릴게요!</div>
    </div>
    <!-- 설문조사 표 -->
    <table class="survey-table">
      <tbody>
        <tr v-for="(question, index) in surveyQuestions" :key="index">
          <td>
            <label>
              <input
                type="checkbox"
                v-model="selectedOptions[index]"
                @change="logSelectedOptions"
              />
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
  data() {
    return {
      surveyQuestions: [
        '홈트레이닝 초심자에요!',
        '홈트레이닝 초심-중급자에요!',
        '홈트레이닝 중급자에요!',
        '홈트레이닝 중급-고급자에요!',
        '홈트레이닝 고급자에요!',
        '홈트레이닝 정도는 쉬워요!',
      ],
      selectedOptions: [false, false, false, false, false, false], // 선택한 옵션 저장
    }
  },
  methods: {
    logSelectedOptions() {
      // 선택한 옵션을 콘솔에 출력
      console.log(this.selectedOptions)
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
</style>
