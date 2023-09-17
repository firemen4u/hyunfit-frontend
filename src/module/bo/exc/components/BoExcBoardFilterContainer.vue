<!-- BoExcBoardFilterContainer.vue -->
<template>
  <div>
    <button
      v-for="(item, index) in items"
      :key="index"
      @click="handleButtonClick(item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits([])

const items = [
  { label: '전체 목록', value: null },
  { label: '상체', value: 1 },
  { label: '하체', value: 2 },
  { label: '전신', value: 3 },
  { label: '유산소', value: 4 },
]

const handleButtonClick = value => {
  emit('updateExcType', value) // excType 값 변경을 알림
}
</script>
