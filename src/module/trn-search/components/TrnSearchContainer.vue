<template>
  <div class="container">
    <div class="flex flex-col">
      <div class="order-selector flex items-end justify-end flex-col">
        <slot name="search-order-selector"> </slot>
      </div>
      <BaseDivider class="my-5" />
    </div>

    <div class="trn-search-bar-section w-full">
      <slot name="search-bar"> </slot>
    </div>

    <div class="trn-search-filter-selection h-2 mt-3">
      <slot name="filter-chip-group"></slot>
    </div>

    <div class="trn-search-result-list mt-5">
      <slot name="search-results"></slot>
      <div class="pagination pt-3">
        <slot name="pagination"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseDivider from '@/module/@base/components/BaseDivider.vue'

defineProps({
  filterOptions: Array,
})
</script>

<style scoped>
.order-selector {
  height: 40px;
}
</style>
