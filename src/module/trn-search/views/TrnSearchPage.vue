<template>
  <div class="container">
    <div class="trn-search-section1">
      <h1 class="trn-search-title">트레이너 만나기</h1>
    </div>
    <div class="trn-search-section2">
      <div class="trn-search-filter-aside">
        <TrnSearchFilterAside> </TrnSearchFilterAside>
      </div>
      <div class="trn-search-container">
        <TrnSearchContainer> </TrnSearchContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import TrnSearchContainer from '../components/TrnSearchContainer.vue'
import TrnSearchFilterAside from '../components/TrnSearchFilterAside.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;

}

.trn-search-section1 {
  display: flex;
  margin-top:50px;
}
.trn-search-title {
  flex-grow: 1;
  border: 4px dotted red;
  display: flex; /* Flexbox 사용 */
  padding-left:20px;
}
.trn-search-section2 {
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 4px dotted black;
  margin-bottom:70px;
}

.trn-search-filter-aside {
  flex-grow: 1;
}
.trn-search-container {
  flex-grow: 4;
}
</style>