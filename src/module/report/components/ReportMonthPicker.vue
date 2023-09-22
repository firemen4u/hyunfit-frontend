<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
  },
})
const emit = defineEmits(['search'])

function onMonthChange() {
  emit('update:modelValue')
}
function search() {
  emit('search', new Date(selectedYear.value, selectedMonth.value - 1))
}
const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)

const years = [2023, 2022]
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const loading = ref(false)
</script>

<template>
  <div class="flex">
    <div class="w-32">
      <v-select
        v-model="selectedYear"
        :items="years"
        :item-title="item => item + '년'"
        :item-value="item => item"
        class="mr-1 w-32"
        variant="outlined"
        :disabled="loading"
        :size="56"
      />
    </div>

    <div class="w-32">
      <v-select
        v-model="selectedMonth"
        :items="months"
        :item-title="item => item + '월'"
        :item-value="item => item"
        variant="outlined"
        :disabled="loading"
        :size="56"
      />
    </div>
    <v-btn :size="56" :loading="loading" @click="search()">가즈아</v-btn>
  </div>
</template>

<style scoped></style>
