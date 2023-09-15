<template>
  <div class="container">
    <div class="trn-search-container-filter">
      <p class="trn-search-container-filter-component text-disable text-xs">
        추천 순(필터)
      </p>
    </div>
    <div class="trn-search-bar-section">
      <TrnSearchBar></TrnSearchBar>
    </div>
    <div class="trn-search-filter-selection">
      <TrnSearchFilterSelectionContainer></TrnSearchFilterSelectionContainer>
    </div>
    <div class="trn-search-result-list">
      <TrnSearchResultItem :result="result"></TrnSearchResultItem>
      <TrnSearchResultItem :result="result"></TrnSearchResultItem>
      <TrnSearchResultItem :result="result"></TrnSearchResultItem>
      <TrnSearchResultItem :result="result"></TrnSearchResultItem>
      <div class="pagination pt-3">
        <BasePagination></BasePagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TrnSearchBar from './TrnSearchBar.vue'
import TrnSearchFilterSelectionContainer from './TrnSearchFilterSelectionContainer.vue'
import TrnSearchResultItem from './TrnSearchResultItem.vue'
import BasePagination from '../../@base/components/BasePagination.vue'

const result = ref({
  trainerName: '고윤정',
  category: '필라테스',
  contents:
    '💁🏻‍♀️💌 리뷰가 보장하는 필라테스 개인레슨 ❤️ “체형교정/굽은등/편평등/라운드숄더/척추측만증/ 골반비대칭/다이어트/개인전문”',
  rating: '4.5',
  reviewCount: 15,
  img: '이미지',
})
</script>

<style scoped>
.container {
  /* border: 4px dotted red; */
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.trn-search-container-filter {
  /* border: 2px dotted rgb(0, 255, 128); */
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
.trn-search-container-filter-component {
  margin-bottom: 25px;
}
.trn-search-bar-section {
  border-top: 1.5px solid rgb(242, 242, 242);
  margin: 5px 0px 5px 0px;
  padding-top: 20px;
}
.trn-search-filter-selection {
  margin: 0px 0px 10px 0px;
}
.trn-search-result-list {
  margin: 3px;
}
</style>
