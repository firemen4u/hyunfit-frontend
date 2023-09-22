<template>
  <div class="center-container">
    <div style="margin-bottom: 30px">
      <div class="title text-2xl">
        현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!
      </div>
      <div class="subtitle text-">
        현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!
      </div>
    </div>
    <!-- 버튼 그룹 -->
    <div class="button-group">
      <!-- 첫 번째 버튼 -->
      <button
        @click="selectOption(1)"
        :class="[
          selectedOption === 1 ? ['selected', 'text-white'] : 'text-black',
          'option-button',
        ]"
      >
        <div class="img-cover">
          <img
            src="https://i.pinimg.com/564x/9a/aa/d5/9aaad5abc02c7a6b4c6b35fd7b8419c6.jpg"
            alt="Option 1"
            class="option-image"
          />
        </div>
        <div class="option-text">
          <div class="title">체지방을 줄이고 싶어요</div>
          <div class="subtitle">부제목 또는 설명</div>
        </div>
      </button>

      <!-- 두 번째 버튼 -->
      <button
        @click="selectOption(2)"
        :class="[
          selectedOption === 2 ? ['selected', 'text-white'] : 'text-black',
          'option-button',
        ]"
      >
        <div class="img-cover">
          <img
            src="https://i.pinimg.com/564x/11/09/bd/1109bdc4dc8da3efcbc7fee6e33bdb24.jpg"
            alt="Option 2"
            class="option-image"
          />
        </div>
        <div class="option-text">
          <div class="title">근육을 키우고 싶어요</div>
          <div class="subtitle">부제목 또는 설명</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    memberInfo: Object,
  },
  data() {
    return {
      selectedOption: null, // 선택된 옵션을 저장할 변수
      currentInfo: this.memberInfo,
    }
  },
  methods: {
    selectOption(option) {
      // 선택한 옵션을 업데이트
      this.selectedOption = option
      // 선택한 버튼의 정보를 콘솔에 출력
      const selectedButton = this.getSelectedButton(option)
      if (option === 1) {
        this.updateMemberInfo(1)
      } else {
        this.updateMemberInfo(2)
      }
    },
    getSelectedButton(option) {
      // 선택한 버튼의 정보를 가져오는 함수
      if (option === 1) {
        return {
          title: '체지방을 줄이고 싶어요',
        }
      } else if (option === 2) {
        return {
          title: '근육을 키우고 싶어요',
        }
      } else {
        return {} // 선택한 옵션이 없는 경우 빈 객체 반환
      }
    },
    updateMemberInfo(input) {
      this.currentInfo.mbrExerciseGoal = input
      this.$emit('updateMemberInfo', this.currentInfo)
    },
  },
}
</script>

<style scoped>
/* 선택된 버튼에 스타일 적용 */
.button-group .selected {
  background-color: #d23360d2;
}

/* 중앙 정렬 컨테이너 스타일 */
.center-container {
  height: 500px;
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  align-items: center; /* 내부 요소를 가로로 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
  justify-content: center;
}

/* 버튼 그룹 스타일 */
.button-group {
  display: flex;
  justify-content: center; /* 내부 요소를 가로로 가운데 정렬 */
}

/* 버튼 스타일 */
.option-button {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
  border-radius: 20px;
  background-color: rgb(204, 204, 204);
}

.option-button:hover {
  background-color: #d23360d2;
}

.option-button:focus {
  background-color: #d23361;
  fill-opacity: 0.7;
  transition: opacity 0.7s; /* 투명도 트랜지션 효과 적용 */
}

/* 이미지 스타일 */
.img-cover {
  max-width: 400px;
  max-height: 200px;
  overflow: hidden;
}

.option-image {
  width: 350px;
  border-radius: 20px;
}

.option-text {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
