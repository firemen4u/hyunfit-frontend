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
import { ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue']) // 이 부분을 추가
const { totalPages, modelValue } = defineProps(['totalPages', 'modelValue'])
const currentPage = ref(modelValue)

watch(currentPage, newVal => {
  console.log('currentPage changed:', newVal) // 로그 추가
  emits('update:modelValue', newVal)
})

// 부모 컴포넌트로부터 전달된 modelValue가 변경될 때 currentPage를 업데이트
watch(
  () => modelValue,
  newVal => {
    console.log('modelValue changed:', newVal) // 로그 추가
    currentPage.value = newVal
  }
)
</script>
