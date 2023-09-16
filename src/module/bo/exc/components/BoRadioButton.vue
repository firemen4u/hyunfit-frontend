<template>
  <v-radio-group v-model="selectedValue" inline>
    <v-radio
      v-for="(option, index) in options"
      :key="index"
      :label="option.label"
      :value="option.value"
      class="custom-radio"
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  options: Array,
})

const selectedValue = ref(null)
</script>
<style scoped>
.custom-radio {
}
</style>
