<template>
  <v-radio-group class="radio-wrap" v-model="selectedValue" inline>
    <v-radio
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
      class="custom-radio"
      true-icon="mdi-check-circle"
      color="primary"
      hide-details
    >
      <template v-slot:label>
        <div class="pr-3">{{ option.label }}</div>
      </template>
    </v-radio>
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
