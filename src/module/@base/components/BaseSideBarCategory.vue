<template>
  <div class="category font-bold text-lg">
    <!-- 카테고리 내용 -->
    <p class="">{{ categoryTitle }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  categoryTitle: String,
})
</script>

<style scoped>
/* 카테고리 스타일링 */
.category {
  background-color: #f0f0f0;
  padding: 10px;
}
</style>
