<template>
  <div class="card-container">
    <div class="trn-contents">
      <div
        class="trn-title-container item flex flex-row items-end align-baseline"
      >
        <p class="trn-subtitle mr-2 text-lg">{{ result.trainerName }}</p>
        <p class="trn-subtitle text-xs">{{ result.category }}</p>
      </div>
      <div class="trn-content item text-xs">
        <p>
          {{ result.contents }}
        </p>
      </div>
      <BaseRating
        compact
        :rating="result.rating"
        :review-count="result.reviewCount"
      ></BaseRating>
    </div>
    <div class="trn-img flex justify-center items-center">
      <img src="/src/assets/images/trainer-img.png" alt="예시 이미지" />
    </div>
  </div>
</template>
<script setup>
import BaseCheckBox from '../../@base/components/BaseCheckBox.vue'
import BaseRating from '../../@base/components/BaseRating.vue'

const props = defineProps({
  result: Object,
})
</script>
<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid rgb(242, 242, 242);
}
.trn-contents {
  width: 80%;
  margin-right: 30px;
}
.trn-img {
  width: 20%;
}
.item {
  margin-bottom: 10px;
}
</style>
