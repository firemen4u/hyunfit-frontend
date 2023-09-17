<!-- BasePagination.vue -->
<template>
  <div class="text-center">
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue'

const emits = defineEmits(['update:modelValue']) // 이 부분을 추가
const { totalPages, modelValue } = defineProps(['totalPages', 'modelValue'])
const currentPage = ref(modelValue)

watch(currentPage, newVal => {
  emits('update:modelValue', newVal) // 이 부분도 수정
})
</script>
