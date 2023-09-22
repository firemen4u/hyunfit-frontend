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
            <label class="custom-checkbox">
              <input
                type="checkbox"
                v-model="selectedOptions[index]"
                @change="logSelectedOptions(index)"
              />
              <span class="custom-checkbox-button"></span>
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
        '층간 소음이 신경쓰여요',
        '무릎 운동은 피하고 싶어요',
        '목과 어깨 근육을 풀어주고 싶어요',
        '앉아 있는 시간이 길어요',
        '허리에 부담이 되는 운동은 피하고 싶어요',
        '전부 해당되지 않아요',
      ],
      selectedOptions: [],
      currentMember: this.memberInfo,
    }
  },
  created() {
    this.selectedOptions = Array(this.surveyQuestions.length).fill(false)
  },
  methods: {
    async logSelectedOptions(index) {
      this.changeCheckBox(index)
      await this.changeNotice()
      console.log(this.selectedOptions)
      console.log(this.currentMember)
      this.$emit('updateMemberInfo', this.currentMember)
    },
    changeNotice() {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[0]) {
          this.currentMember.mbrNoiseConsidered = 1
        } else if (!this.selectedOptions[0]) {
          this.currentMember.mbrNoiseConsidered = 0
        }
        if (this.selectedOptions[1]) {
          this.currentMember.mbrKneeHealthConsidered = 1
        } else if (!this.selectedOptions[1]) {
          this.currentMember.mbrKneeHealthConsidered = 0
        }
        if (this.selectedOptions[2]) {
          this.currentMember.mbrNeckShoulderFocused = 1
        } else if (!this.selectedOptions[2]) {
          this.currentMember.mbrNeckShoulderFocused = 0
        }
        if (this.selectedOptions[3]) {
          this.currentMember.mbrLongSitter = 1
        } else if (!this.selectedOptions[3]) {
          this.currentMember.mbrLongSitter = 0
        }
        if (this.selectedOptions[4]) {
          this.currentMember.mbrBackDiskConsidered = 1
        } else if (!this.selectedOptions[4]) {
          this.currentMember.mbrBackDiskConsidered = 0
        }
        if (this.selectedOptions[5]) {
          this.currentMember.mbrNoiseConsidered = 0
          this.currentMember.mbrKneeHealthConsidered = 0
          this.currentMember.mbrNeckShoulderFocused = 0
          this.currentMember.mbrLongSitter = 0
        }
      }
    },
    changeCheckBox(index) {
      if (index === this.surveyQuestions.length - 1) {
        for (let i = 0; i < this.selectedOptions.length - 1; i++) {
          this.selectedOptions[i] = false
        }
      } else {
        this.selectedOptions[this.surveyQuestions.length - 1] = false
      }
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
.custom-checkbox {
  position: relative;
  display: inline-block;
  padding-left: 30px; /* 여백을 조절하여 체크박스 크기 조절 가능 */
  cursor: pointer;
}

.custom-checkbox input[type='checkbox'] {
  display: none;
}

.custom-checkbox-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px; /* 체크박스 크기 조절 가능 */
  height: 20px; /* 체크박스 크기 조절 가능 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.custom-checkbox input[type='checkbox']:checked + .custom-checkbox-button {
  background-color: #d23360d2; /* 체크된 상태의 배경색 설정 */
  border-color: #d23360d2; /* 체크된 상태의 테두리 색 설정 */
}
</style>
