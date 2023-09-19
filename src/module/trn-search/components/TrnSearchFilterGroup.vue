<script setup>
import { computed, ref } from 'vue'
import { VCheckbox } from 'vuetify/components'
import BaseDivider from '@/module/@base/components/BaseDivider.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: Array,
  title: String,
  options: Object,
  multiple: { type: Boolean, default: false },
})
const filterSelection = ref(props.modelValue)

const localModelValue = computed({
  get: () => props.modelValue,
  set: newSelection => (filterSelection.value = newSelection),
})
</script>

<template>
  <div class="filter-section">
    <BaseDivider />
    <p class="filter-title text-ls font-bold mt-5">{{ title }}</p>
    <div class="checkbox-group" v-if="multiple">
      <v-checkbox
        v-for="(option, i) in props.options"
        :key="i"
        :value="option.value"
        color="primary"
        v-model="localModelValue"
        @input="emit('update:modelValue', filterSelection)"
        hide-details
      >
        <template v-slot:label>
          <div>{{ option.label }}</div>
        </template>
      </v-checkbox>
    </div>

    <v-radio-group v-model="localModelValue" v-else>
      <v-radio
        v-for="(option, i) in props.options"
        :key="i"
        :value="option.value"
        color="primary"
        @input="emit('update:modelValue', filterSelection)"
      >
        <template v-slot:label>
          <div>{{ option.label }}</div>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<style scoped></style>
