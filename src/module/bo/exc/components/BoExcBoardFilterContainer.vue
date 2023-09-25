<!-- BoExcBoardFilterContainer.vue -->
<template>
  <div class="flex w-[400px]">
    <button
      v-for="(item, index) in items"
      :key="index"
      @click="handleButtonClick(item.value)"
      :class="
        item.value === props.modelValue
          ? 'text-gray-800 font-bold'
          : 'text-gray-400 font-medium hover:text-gray-500'
      "
      class="block px-4 py-2 text-base cursor-pointer transition-all"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
})
const emit = defineEmits(['updateExcType'])

const items = [
  { label: '전체 목록', value: 0 },
  { label: '상체', value: 1 },
  { label: '하체', value: 2 },
  { label: '전신', value: 3 },
  { label: '유산소', value: 4 },
]

const handleButtonClick = value => {
  emit('updateExcType', value) // excType 값 변경을 알림
}
</script>
