<script setup>
const props = defineProps({
  items: Array,
  disabled: Boolean,
  filter: {
    type: Boolean,
    default: false,
  },
  fontSize: { type: Number, default: 12 },
})
</script>

<template>
  <v-chip-group column multiple>
    <v-chip
      class="hyunfit-base-chip"
      v-for="(item, idx) in items"
      :key="idx"
      :filter="filter"
      variant="outlined"
      selected-class="active-chip"
      :ripple="false"
      :disabled="disabled"
      size="small"
    >
      <div :style="{ fontSize: props.fontSize + 'px' }">{{ item }}</div>
    </v-chip>
  </v-chip-group>
</template>

<style scoped>
.v-chip.v-chip--link.v-chip--filter.v-chip--density-default.v-chip--size-small.v-chip--variant-outlined.hyunfit-base-chip {
  //background-color: #ffffff;
  border: solid 1px #939292;
  color: #5b5b5b;
}
.active-chip {
  background-color: #d23361;
  color: #ffffff !important;
  border: none !important;
}
</style>
