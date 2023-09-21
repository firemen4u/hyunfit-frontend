<script setup>
import BaseCompactRating from '@/module/@base/components/BaseCompactRating.vue'
import router, { pathNames } from '@/router'

const props = defineProps({
  items: Array,
})
function gotoTrnDetail(trnId) {
  router.push(pathNames.trnDetailPage.with({ trnId }))
}
</script>
<template>
  <div
    v-for="(data, i) in items"
    :key="i"
    class="card-container cursor-pointer"
    @click="gotoTrnDetail(data.trnId)"
  >
    <div class="trn-contents">
      <div
        class="trn-title-container item flex flex-row items-end align-baseline"
      >
        <p class="trn-subtitle mr-2 text-lg">{{ data.trnName }}</p>
        <p class="trn-subtitle text-xs">{{ data.trnTypeName }}</p>
      </div>
      <div class="trn-content item text-xs">
        <p>
          {{ data.trnShortDescription }}
        </p>
      </div>
      <BaseCompactRating
        v-if="data.reviewCount"
        :rating="data.averageReviewRating"
        :reviewCount="data.reviewCount"
        :icon-size="20"
        font-size="lg"
      ></BaseCompactRating>
    </div>
    <div
      class="trn-img-wrapper flex justify-center items-center overflow-hidden"
    >
      <img
        :src="data.trnProfileUrl"
        :alt="data.trnName"
        onerror="javascript:this.src='/src/assets/images/default-user-profile.jpg'"
        class="trn-profile-image rounded-lg"
      />
    </div>
  </div>
</template>

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
.trn-img-wrapper {
  width: 100px;
}
.item {
  margin-bottom: 10px;
}
</style>
