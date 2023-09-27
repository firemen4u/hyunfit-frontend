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
    <BaseDivider class="my-5" />
    <p class="filter-title text-lg font-bold mb-2">{{ title }}</p>
    <div class="checkbox-group" v-if="multiple">
      <v-checkbox
        v-for="(option, i) in props.options"
        :key="i"
        :value="option.value"
        color="primary"
        v-model="localModelValue"
        @input="emit('update:modelValue', filterSelection)"
        hide-details
        density="compact"
      >
        <template v-slot:label>
          <div class="ml-2">{{ option.label }}</div>
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
        density="compact"
        class="mb-2"
      >
        <template v-slot:label>
          <div class="ml-2">{{ option.label }}</div>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<style scoped></style>
