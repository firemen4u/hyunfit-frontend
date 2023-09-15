<template>
  <div class="center-container">
    <div style="margin-bottom: 30px">
      <div class="title">현핏이 알고있어야 하는 점을 알려주세요!</div>
      <div class="subtitle">
        환경과 목적에 맞는 운동을 골라드릴게요! (중복 선택가능)
      </div>
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
        '층간 소음이 신경쓰여요',
        '무릎 운동은 피하고 싶어요',
        '목과 어깨 근육을 풀어주고 싶어요',
        '앉아 있는 시간이 길어요',
        '주로 서서 일해요',
        '전부 해당되지 않아요',
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
