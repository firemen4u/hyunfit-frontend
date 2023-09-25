<!-- BoExcBoardFilterContainer.vue -->
<template>
  <div class="w-full h-20">
    <button
      v-for="(item, index) in items"
      :key="index"
      @click="handleButtonClick(item.value)"
      class="w-24 mr-10 hover:text-lg focus-within:font-bold focus:text-lg"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits([])

const items = [
  { label: '전체 목록', value: null },
  { label: '상체', value: 1 },
  { label: '하체', value: 2 },
  { label: '전신', value: 3 },
  { label: '유산소', value: 4 },
]

const handleButtonClick = value => {
  console.log('Button clicked:', value) // 로그 추가
  emit('updateExcType', value) // excType 값 변경을 알림
}
</script>
