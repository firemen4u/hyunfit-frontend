<script setup>
import { ref } from 'vue'
import ReviewConst from '@/module/@base/stores/reviewConst'

const props = defineProps({
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
      v-for="idx in ReviewConst.reviews.length - 1"
      :key="idx"
      filter
      :variant="selected(idx) ? 'outlined' : 'outlined'"
      :ripple="false"
      color="primary"
      :value="idx"
      :tabindex="-1"
    >
      <div class="flex justify-center items-center">
        <img class="h-4 w-4 mr-1" :src="ReviewConst.getIcon(idx)" alt="" />
        <div>{{ ReviewConst.getContent(idx) }}</div>
      </div>
    </v-chip>
  </v-chip-group>
</template>

<style scoped>
.v-chip.v-chip--link.v-chip--filter.v-chip--density-default.v-chip--variant-outlined.hyunfit-base-chip {
  border: solid 1px #939292;
  color: #5b5b5b;
}
</style>
