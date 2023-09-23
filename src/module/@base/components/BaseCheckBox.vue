<template>
  <v-checkbox v-model="checked" @input="updateValue">
    <template v-slot:label>{{ label }}</template>
  </v-checkbox>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  value: Boolean,
  label: String,
})

const emit = defineEmits(['update:value'])
const checked = ref(props.value)
const updateValue = () => {
  checked.value = !checked.value
  emit('update:value', checked.value)
}
</script>
