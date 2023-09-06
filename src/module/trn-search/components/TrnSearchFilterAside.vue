<template>
  <div class="container">
    <div class="filter-title-section">
      <p style="font-weight: bold">필터</p>
      <button>초기화</button>
    </div>
    <div class="filter-lesson-section">
      <h4 class="filter-lesson-title">레슨 종류</h4>
      <TrnSearchFilterContainer checkbox :data="componentsData1"></TrnSearchFilterContainer>
    </div>
    <div class="filter-trn-sex-section">
      <h4 class="filter-trn-sex-title">트레이너 성별</h4>
      <TrnSearchFilterContainer radiobox :data="componentsData2"></TrnSearchFilterContainer>
    </div>
  </div>
</template>
<script setup>
import TrnSearchFilterContainer from './TrnSearchFilterContainer.vue'

const componentsData1 = [
  { label: '퍼스널 트레이닝(PT)', value: 'pt' },
  { label: '필라테스', value: 'pilates' },
  { label: '요가', value: 'yoga' },
]

const componentsData2 = [
  { label: '남자', value: 'men' },
  { label: '여자', value: 'women' },
  { label: '상관없음', value: 'irrelevant' },
]


</script>
<style scoped>
.container {
  border: 4px dotted red;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.filter-title-section {
  border: 2px dotted blue;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}

.filter-lesson-section {
  border: 2px dotted blue;
  padding: 10px;
}
.filter-lesson-title {
  padding-bottom: 10px;
}

.filter-trn-sex-section {
  border: 2px dotted blue;
  flex-grow: 2.5;
  padding: 10px;
}
.filter-trn-sex-title {
  padding-bottom: 10px;
}
</style>