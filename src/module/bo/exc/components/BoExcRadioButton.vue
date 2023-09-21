<template>
  <v-radio-group class="radio-wrap" v-model="selectedValue" inline>
    <v-radio
      v-for="(option, index) in options"
      :key="index"
      :label="option.label"
      :value="option.value"
      class="custom-radio"
      hide-details
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  options: Array,
})

const selectedValue = ref(null)
</script>
<style scoped>
.radio-wrap {
  width: 300px;
}
</style>
