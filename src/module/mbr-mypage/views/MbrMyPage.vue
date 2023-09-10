<template>
  <BaseContainer>
    <BaseSideBar
      :sidebarTitle="sidebarTitle"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="flex">
        <!-- 컨텐츠 -->
        <div class="content">
          <div>
            <div>
              <div>hihi</div>
            </div>
          </div>
        </div>
      </div>
    </BaseBodyWrapper></BaseContainer
  >
</template>

<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/component/@base/views/BaseSideBar.vue'
const sidebarTitle = '사이드 바 헤더'
const mainCategory = '카테고리'
const subcategories = [
  { id: 1, title: '서브 카테고리 1', link: '/link1' },
  { id: 2, title: '서브 카테고리 2', link: '/link2' },
  { id: 3, title: '서브 카테고리 3', link: '/link3' },
]
</script>

<style scoped>
.content {
  padding: 20px;
  width: 100%;
  height: 1000px;
  background-color: red;
}
</style>
