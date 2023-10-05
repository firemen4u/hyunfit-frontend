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
    class="flex justify-center"
  >
    <v-chip
      class="hyunfit-base-chip"
      v-for="idx in ReviewConst.reviews.length"
      :key="idx"
      filter
      variant="outlined"
      :ripple="false"
      color="primary"
      :value="idx - 1"
      :tabindex="-1"
    >
      <div class="flex justify-center items-center">
        <img class="h-4 w-4 mr-2" :src="ReviewConst.getIcon(idx - 1)" alt="" />
        <div>{{ ReviewConst.getContent(idx - 1) }}</div>
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
