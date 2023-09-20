<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object,
  options: Array,
})
const emit = defineEmits(['update:option', 'update:modelValue'])
const innerModelValue = ref(props.modelValue)
function updateOption() {
  emit('update:option')
  emit('update:modelValue', innerModelValue.value)
}
</script>
<template>
  <div class="h-11">
    <v-select
      v-model="innerModelValue"
      class="selector w-40"
      single-line
      flat
      label="Select"
      :items="props.options"
      item-title="name"
      :item-value="item => item"
      variant="outlined"
      density="compact"
      hide-details
      @update:modelValue="updateOption()"
    >
      <template v-slot:prepend-icon> </template>
    </v-select>
  </div>
</template>

<style scoped>
.selector {
  height: 44px;
}
</style>
