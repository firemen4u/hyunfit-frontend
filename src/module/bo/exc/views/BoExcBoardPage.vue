<template lang="">
  <BaseContainer>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="제일큰 pt-10">
        <div class="운동목록이랑검색창있는div flex justify-between">
          <div>운동 목록</div>
          <div>검색창</div>
        </div>
        <div class="border-4 border-black border-dashed">
          <BoExcBoardFilterContainer class="flex justify-between" />
          <div class="w-full border-dashed border-4 border-yellow-400">
            <div v-if="exercises.length > 0" class="flex flex-wrap">
              <div v-for="exercise in exercises" :key="exercise.excSeq">
                <BoExcCard :exercise="exercise" />
              </div>
            </div>
            <div v-else>데이터를 불러오는 중입니다...</div>
          </div>

          <BasePagination />
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import {
  BoExcCard,
  BoExcBoardFilterContainer,
} from '/src/module/bo/exc/components'
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { defineProps, ref, onMounted } from 'vue'

const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/bo-excBoard' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/bo-excNew' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]

const exercises = ref([]) // API로 받아온 운동 목록을 저장할 변수

// API를 통해 운동 목록을 가져오는 함수
const fetchExercises = async () => {
  try {
    const response = await fetch('http://localhost:8080/exercises') // API 엔드포인트를 설정하세요.
    const data = await response.json()
    exercises.value = data // 받아온 데이터를 exercises 변수에 저장합니다.
  } catch (error) {
    console.error('운동 목록을 불러오는 중 에러 발생:', error)
  }
}

// 컴포넌트가 마운트된 후 API로부터 데이터를 가져옵니다.
onMounted(() => {
  fetchExercises()
})
</script>
<style lang=""></style>
