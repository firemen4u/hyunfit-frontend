<template>
  <BaseContainer admin-menu>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="제일큰 pt-10">
        <div class="루틴목록이랑검색창있는div flex justify-between">
          <div>루틴 목록</div>
          <div>검색창</div>
        </div>
        <div>
          <div
            class="flex justify-between border-dashed border-4 border-yellow-400"
          >
            <p>운동 루틴 1</p>
            <div><button>수정</button><button>삭제</button></div>
          </div>
          <div class="bg-red p-2 border-dashed border-4 border-yellow-400">
            루틴 하나 씩 들어가는 곳
            <div>카드 하나씩 들어가는 곳 <BoExcCard /></div>
          </div>
          <BasePagination />
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import {
  BoExcCard,
  BoExcBoardFilterContainer,
} from '/src/module/bo/exc/components'
const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/link1' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/link3' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]
</script>
<style lang=""></style>
