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
const items = [
  { label: '상체', value: 1 },
  { label: '하체', value: 2 },
  { label: '전신', value: 3 },
  { label: '유산소', value: 4 },
]

const handleButtonClick = value => {
  // 버튼이 클릭되었을 때 실행할 로직을 작성합니다.
  console.log(`선택한 값: ${value}`)
}
</script>
