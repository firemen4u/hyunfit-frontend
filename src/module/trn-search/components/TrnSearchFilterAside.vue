<template>
  <div class="container">
    <div class="filter-title-section">
      <p style="font-weight: bold">필터</p>
      <button>초기화</button>
    </div>
    <div class="filter-lesson-section">
      <h4 class="filter-lesson-title">레슨 종류</h4>
      <!-- TrnsearchFilterContainer Component 재사용 자리 -->
      <label>
        <input class="filter-lesson-radio-button" type="radio" name="lesson" />
        퍼스널 트레이닝
      </label>
    </div>
    <div class="filter-trn-sex-section">
      <!-- TrnsearchFilterContainer Component 재사용 자리 -->
      <h4 class="filter-trn-sex-title">트레이너 성별</h4>
      <label> <input type="radio" name="gender" /> 남성 </label>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
.container {
  border: 4px dotted red;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap:30px;
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
.filter-lesson-title{
    padding-bottom: 10px;
}

.filter-trn-sex-section {
  border: 2px dotted blue;
  flex-grow: 2.5;
  padding: 10px;
}
.filter-trn-sex-title{
    padding-bottom:10px;
}

</style>