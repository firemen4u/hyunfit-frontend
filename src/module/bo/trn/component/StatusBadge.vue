<script setup>
const props = defineProps({
  status: String,
})

function statusColor(status) {
  switch (status) {
    case '예정':
      return 'bg-blue-100 text-blue-800'
    case '진행중':
      return 'bg-yellow-100 text-yellow-800'
    case '미완료':
      return 'bg-yellow-100 text-yellow-800'
    case '완료':
      return 'bg-green-100 text-green-800'
    case '취소':
      return 'bg-red-100 text-red-800'
    case '노쇼':
      return 'bg-gray-100 text-gray-800'
    default:
      return ''
  }
}
</script>

<template>
  <span
    class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
    :class="statusColor(status)"
  >
    {{ status }}
  </span>
</template>

<style scoped></style>
