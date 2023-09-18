<script setup>
defineProps({
  items: Array,
})
</script>

<template>
  <v-chip-group column multiple>
    <v-chip
      class="hyunfit-base-chip"
      v-for="(item, idx) in items"
      :key="idx"
      filter
      variant="outlined"
      selected-class="active-chip"
      :ripple="false"
    >
      {{ item }}
    </v-chip>
  </v-chip-group>
</template>

<style scoped>
.hyunfit-base-chip.v-chip.v-chip--link.v-chip--filter.v-chip--density-default.v-chip--size-default {
  //background-color: #ffffff;
  border: solid 1px #888888;
  color: #3d3d3d;
}
.active-chip {
  background-color: #d23361;
  color: #ffffff !important;
  border: none !important;
}
</style>
