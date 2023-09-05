<template>
  <div class="container">
    <div class="trn-search-container-filter">
      <h4>추천 순(필터)</h4>
    </div>
    <div class="trn-search-bar-section">
      <!-- TrnSearhBarSection 컴포넌트 -->
      <h4>search bar</h4>
    </div>
    <div class="trn-search-filter-selection">
      <!-- TrnSearhFilterSelection 컴포넌트 -->
      <h4>Base Chips</h4>
      <Button>퍼스널 트레이닝</Button>
    </div>
    <div class="trn-search-result-list">
      <!-- TrnSearhResultItem 컴포넌트 -->
      <h4>TrnSearchResultItem</h4>
    </div>
    <div class="trn-search-result-list">
      <!-- TrnSearhResultItem 컴포넌트 -->
      <h4>TrnSearchResultItem</h4>
    </div>
    <div class="trn-search-result-list">
      <!-- TrnSearhResultItem 컴포넌트 -->
      <h4>TrnSearchResultItem</h4>
    </div>
    <div class="trn-search-result-list">
      <!-- TrnSearhResultItem 컴포넌트 -->
      <h4>TrnSearchResultItem</h4>
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
  width: 100%;
}
.trn-search-container-filter{
    border: 2px dotted rgb(0, 255, 128);
    padding:10px;

}
.trn-search-bar-section{
    border: 2px dotted rgb(0, 255, 128);
    padding:10px;

}
.trn-search-filter-selection{
    border: 2px dotted rgb(0, 255, 128);
    padding:10px;

}
.trn-search-result-list{
    border: 2px dotted rgb(0, 255, 128);
    padding:10px;
}


</style>