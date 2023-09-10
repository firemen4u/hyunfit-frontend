<template>
  <span class="sidebar">
    <!-- 사이드 바 헤더 -->
    <SidebarHeader :sidebarTitle="sidebarTitle" />

    <!-- 카테고리 -->
    <Category :categoryTitle="categoryTitle" />

    <!-- 서브카테고리 -->
    <Subcategory
      v-for="(subcategory, index) in subcategories"
      :key="index"
      :subcategoryTitle="subcategory.title"
      :subcategoryLink="subcategory.link"
    />
  </span>
</template>

<script setup>
import SidebarHeader from '/src/module/@base/components/BaseSideBarHeader.vue'
import Category from '/src/module/@base/components/BaseSideBarCategory.vue'
import Subcategory from '/src/module/@base/components/BaseSideBarSubcategory.vue'

const props = defineProps({
  sidebarTitle: String,
  categoryTitle: String,
  subcategories: Array, // 예시: [{ title: '서브 카테고리 1', link: '/link1' }, ...]
})
</script>

<style scoped>
/* 사이드 바 스타일링 */
.sidebar {
  width: 250px;
  top: 80px;
  margin-right: 1500px;
  background-color: #eee;
  position: fixed;
  padding: 20px;
  overflow: hidden;
}
</style>
