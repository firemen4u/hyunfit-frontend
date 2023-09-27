<script setup>
import TrnSearchUtils from '@/module/trn-search/services/trnSearchUtils'
defineProps({
  items: Array,
})
</script>

<template>
  <v-chip
    v-for="(item, idx) in items"
    :key="idx"
    color="primary"
    variant="flat"
    class="mr-1"
    :ripple="false"
  >
    {{ TrnSearchUtils.filterNameOf(item) }}
  </v-chip>
</template>
