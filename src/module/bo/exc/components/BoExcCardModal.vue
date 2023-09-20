<!-- ExcInfoModal.vue -->
<template>
  <div v-if="show" class="modal" @click="closeModal">
    <div class="modal-content relative" @click.stop>
      <button @click="closeModal" class="absolute right-4 top-2 p-2">❌</button>
      <div class="flex items-center justify-center mt-4 rounded-md">
        <img
          class="exc-img rounded-md"
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdAJq71%2FbtsteQJsEa7%2FntSCTKbwomKjVIpQusuLwk%2Fimg.jpg"
        />
      </div>
      <div class="modal-category-wrap p-3">
        <div class="modal-sub-wrap">
          <p>운동 이름</p>
          <p>:</p>
          <p>{{ exercise.excName }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>운동 설명</p>
          <p>:</p>
          <p>{{ exercise.excContent }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>운동 부위</p>
          <p>:</p>
          <p>{{ mapExcType(exercise.excType) }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>운동 난이도</p>
          <p>:</p>
          <p>{{ mapDifficultyType(exercise.excDifficulty) }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>1회당 칼로리 소모량</p>
          <p>:</p>
          <p>{{ exercise.excCaloriesPerRep }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>총 세트수</p>
          <p>:</p>
          <p>{{ exercise.excSetCount }}</p>
        </div>
        <div class="modal-sub-wrap flex">
          <p>세트 당 동작수</p>
          <p>:</p>
          <p>{{ exercise.excRepCountPerSet }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>세트 당 시간</p>
          <p>:</p>
          <p>{{ exercise.excTimePerSetInSec }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>생성 일자</p>
          <p>:</p>
          <p>{{ dateUtil.timestampToFullDate(exercise.excCreatedDate) }}</p>
        </div>
        <div class="modal-sub-wrap">
          <p>타겟 부위</p>
          <p>:</p>
          <div>
            <div
              v-for="(target, index) in exercise.exerciseTargets"
              :key="index"
              class="flex flex-col"
            >
              <p>
                {{ mapExcAreaType(target.exctgArea) }} 비중 -
                {{ target.exctgWeight * 100 }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-sub-wrap justify-end">
        <p></p>
        <button class="mr-4 rounded-lg">수정</button>
        <button class="mr-0 rounded-lg">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dateUtil from '/src/utils/date.js'

const props = defineProps(['show', 'exercise'])
const emit = defineEmits([])

const closeModal = () => {
  emit('update:show', false)
}

const excTypeMapping = {
  1: '상체',
  2: '하체',
  3: '전신',
  4: '유산소',
}

const mapExcType = type => {
  return excTypeMapping[type] || '알 수 없음'
}

const excDifficultyMapping = {
  1: '초급',
  2: '초중급',
  3: '중급',
  4: '중상급',
  5: '상급',
}

const mapDifficultyType = type => {
  return excDifficultyMapping[type] || '알 수 없음'
}

const excAreaMapping = {
  1: '광배근',
  2: '기립근',
  3: '대퇴사두',
  4: '대흉근',
  5: '둔근',
  6: '삼두',
  7: '승모근',
  8: '이두근',
  9: '전면어깨',
  10: '측면어깨',
  11: '코어',
  12: '햄스트링',
  13: '후면어깨',
}

const mapExcAreaType = type => {
  return excAreaMapping[type] || '알 수 없음'
}

const formatDate = dateString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('ko-KR', options)
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검정색 배경 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.modal-content {
  margin-top: 150px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 700px; /* 원하는 너비로 설정 */
  text-align: center;
}
.modal-sub-wrap {
  display: flex;
  margin-bottom: 5px;
}
.modal-sub-wrap button {
  background-color: rgb(163, 163, 163);
  padding: 4px;
  color: white;
  display: none;
}
.modal-sub-wrap :first-child {
  text-align: start;
  width: 150px;
}
.modal-sub-wrap :nth-child(2) {
  margin-right: 10px;
}
.modal-sub-wrap :nth-child(3) {
  width: 510px;
  text-align: start;
}

.exc-img {
  width: 100%; /* 혹은 원하는 값, 예: max-width: 300px; */
  height: 200px;
  /*max-height: 50%;  혹은 원하는 값, 예: max-height: 300px; */
  object-fit: contain; /* 비율 유지 */
  object-fit: cover; /* 이미지 비율을 유지하면서 넘치는 부분을 잘라냄 */
  overflow: hidden; /* 넘치는 부분을 숨김 */
}
</style>
