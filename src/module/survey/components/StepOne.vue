<template>
  <div class="center-container">
    <div>
      <div class="title">
        현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!
      </div>
      <div class="subtitle">
        현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!
      </div>
    </div>
    <!-- 버튼 그룹 -->
    <div class="button-group">
      <!-- 첫 번째 버튼 -->
      <button
        @click="selectOption(1)"
        :class="{ selected: selectedOption === 1 }"
        class="option-button"
      >
        <img
          src="https://i.pinimg.com/564x/9a/aa/d5/9aaad5abc02c7a6b4c6b35fd7b8419c6.jpg"
          alt="Option 1"
          class="option-image"
        />
        <div class="option-text">
          <div class="title">근육을 키우고 싶어요</div>
          <div class="subtitle">부제목 또는 설명</div>
        </div>
      </button>

      <!-- 두 번째 버튼 -->
      <button
        @click="selectOption(2)"
        :class="{ selected: selectedOption === 2 }"
        class="option-button"
      >
        <img
          src="https://i.pinimg.com/564x/11/09/bd/1109bdc4dc8da3efcbc7fee6e33bdb24.jpg"
          alt="Option 2"
          class="option-image"
        />
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
  data() {
    return {
      selectedOption: null, // 선택된 옵션을 저장할 변수
    }
  },
  methods: {
    selectOption(option) {
      // 선택한 옵션을 업데이트
      this.selectedOption = option
    },
  },
}
</script>

<style scoped>
/* 선택된 버튼에 스타일 적용 */
.selected {
  background-color: rgba(239, 89, 89, 0.7); /* 검정색에 투명도 추가 */
  transition: background-color 0.5s; /* 트랜지션 효과 적용 */
}

/* 중앙 정렬 컨테이너 스타일 */
.center-container {
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  align-items: center; /* 내부 요소를 가로로 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

/* 버튼 그룹 스타일 */
.button-group {
  display: flex;
  justify-content: center; /* 내부 요소를 가로로 가운데 정렬 */
}

/* 버튼 스타일 */
.option-button {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
  border-radius: 20px;
}

.option-button:hover {
  background-color: rgb(221, 142, 142);
  opacity: 1.5;
}

.option-button:focus {
  background-color: rgba(239, 89, 89, 0.7);
  fill-opacity: 0.7;
  transition: opacity 0.7s; /* 투명도 트랜지션 효과 적용 */
}

/* 이미지 스타일 */
.option-image {
  width: 300px;
  height: 400px;
  border-radius: 20px;
}

.option-text {
  /* 이전 스타일 유지 */
  height: 100px;
  /* 내부 요소를 가로로 가운데 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
