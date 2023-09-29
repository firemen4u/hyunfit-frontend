<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: Array,
  disabled: Boolean,
  filter: {
    type: Boolean,
    default: false,
  },
  fontSize: { type: Number, default: 12 },
  modelValue: Array,
})
const emit = defineEmits(['update:modelValue'])
const innerValue = ref(props.modelValue)

const selected = val => innerValue.value.includes(val)
</script>

<template>
  <v-chip-group
    column
    multiple
    v-model="innerValue"
    @update:modelValue="value => emit('update:modelValue', value)"
  >
    <v-chip
      class="hyunfit-base-chip"
      v-for="(item, idx) in items"
      :key="idx"
      :filter="filter"
      :variant="selected(idx) ? 'flat' : 'outlined'"
      selected-class="active-chip"
      :ripple="false"
      :disabled="disabled"
      color="primary"
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
</style>
