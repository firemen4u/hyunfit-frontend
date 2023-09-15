<template>
  <div class="subcategory ml-6 pt-2 pb-2">
    <!-- 서브카테고리 내용 -->
    <p>
      <a :href="subcategoryLink">{{ subcategoryTitle }}</a>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  subcategoryTitle: String,
  subcategoryLink: String,
})
</script>

<style scoped>
/* 서브카테고리 스타일링 */
</style>
