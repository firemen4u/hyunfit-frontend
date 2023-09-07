<template>
  <BaseContainer footer="false">
    <BaseBodyWrapper>
  <div class="container">
    <div class="trn-search-section1">
      <p class="trn-search-title text-4xl font-extrabold">트레이너 만나보기</p>
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
</BaseBodyWrapper>
</BaseContainer>
</template>

<script setup>
import {BaseContainer, BaseBodyWrapper} from '/src/module/@base/views';
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
  /* border: 4px dotted red; */
  display: flex; /* Flexbox 사용 */
  padding-left:20px;
  margin-bottom: 50px;
}
.trn-search-section2 {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* border: 4px dotted black; */
  margin-bottom:70px;
}

.trn-search-filter-aside {
  width: 30%;
  margin-right:100px;
}
.trn-search-container {
  width: 70%;
  margin-right:30px;
}
</style> 