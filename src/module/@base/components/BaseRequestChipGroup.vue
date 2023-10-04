<script setup>
import ReviewConst from '@/module/@base/stores/reviewConst'

const props = defineProps({
  stickers: String,
})
</script>

<template>
  <div>
    <v-chip
      class="hyunfit-base-chip"
      v-for="(item, idx) in ReviewConst.parse(stickers)"
      :key="idx"
      variant="outlined"
      color="primary"
      :model-value="true"
    >
      <div>{{ ReviewConst.requests[item] }}</div>
    </v-chip>
  </div>
</template>

<style scoped>
.v-chip.v-chip--link.v-chip--filter.v-chip--density-default.v-chip--size-small.v-chip--variant-outlined.hyunfit-base-chip {
  //background-color: #ffffff;
  border: solid 1px #939292;
  color: #5b5b5b;
}
</style>
