<script setup>
import { LeftArrowSvg, RightArrowSvg } from '@/module/@base/svg'
import ReportDateUtils from '@/module/report/services/reportDateUtils'
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: new Date().toISOString().slice(0, 7),
  },
})
const emit = defineEmits(['update:modelValue'])

function onMonthChange(dateStr, increment) {
  let date = ReportDateUtils.adjustMonth(dateStr, increment)
  emit('update:modelValue', ReportDateUtils.formatDateYYYYMM(date))
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
        class="mr-1 w-32"
        variant="outlined"
        :disabled="loading"
      />
    </div>

    <div class="w-32">
      <v-select
        v-model="selectedMonth"
        :items="months"
        :item-title="item => item + '월'"
        variant="outlined"
        :disabled="loading"
      />
    </div>
    <v-btn :loading="loading" @click="loading = true" />
  </div>
</template>

<style scoped></style>
