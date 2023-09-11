<template>
  <div class="sidebar-header text-2xl">
    <!-- 사이드 바 헤더 내용 -->
    <p class="">{{ sidebarHeader }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  sidebarHeader: String,
})
</script>

<style scoped>
/* 사이드 바 헤더 스타일링 */
.sidebar-header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>
