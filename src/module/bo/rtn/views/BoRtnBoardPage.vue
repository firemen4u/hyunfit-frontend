<template>
  <BaseContainer admin-menu>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="제일큰 pt-10">
        <div>
          <div class="p-2 border-dashed border-4 border-yellow-400">
            <div class="">
              <BaseRtnCardContainer />
            </div>
          </div>
          <BasePagination />
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import {
  BaseBodyWrapper,
  BaseContainer,
  BaseSideBar,
} from '/src/module/@base/views'
import {
  BaseRtnCardContainer,
  BaseRtnCardGroup,
} from '/src/module/@base/components'

const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/link1' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/link3' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]
</script>
<style></style>
