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
  <div v-if="items.length > 0" class="search-result-container">
    <div
      v-for="(data, i) in items"
      :key="i"
      class="card-container cursor-pointer"
      @click="gotoTrnDetail(data.trnId)"
    >
      <div class="">
        <div
          class="trn-title-container item flex flex-row items-end align-baseline"
        >
          <p class="trn-subtitle mr-2 text-xl font-black">{{ data.trnName }}</p>
          <p class="trn-subtitle text-sm">{{ data.trnTypeName }}</p>
        </div>
        <BaseCompactRating
          v-if="data.reviewCount"
          :rating="data.averageReviewRating"
          :reviewCount="data.reviewCount"
          :icon-size="16"
          :count-size="14"
        />
        <div class="mt-3 trn-content item text-sm">
          <p>
            {{ data.trnShortDescription }}
          </p>
        </div>
      </div>
      <div
        class="trn-img-wrapper flex justify-center items-center overflow-hidden"
      >
        <img
          :src="data.trnProfileUrl"
          :alt="data.trnName"
          onerror="javascript:this.src='/src/assets/images/default-user-profile.jpg'"
          class="trn-profile-image rounded-lg w-[100px] h-[100px] object-cover"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="search-result-container flex items-start mt-10 justify-center"
  >
    <div class="text-lg text-neutral-500">검색 결과가 없습니다</div>
  </div>
</template>

<style scoped>
.search-result-container {
  min-height: 500px;
  width: 100%;
}
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
</style>
