<template>
  <div class="container">
    <div class="mt-2 mb-5 flex flex-col">
      <slot name="search-order-selector"> </slot>

      <BaseDivider />
    </div>

    <div class="trn-search-bar-section w-full">
      <slot name="search-bar"> </slot>
    </div>

    <div class="trn-search-filter-selection h-10 mt-2">
      <slot name="filter-chip-group"></slot>
    </div>

    <div class="trn-search-result-list">
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
