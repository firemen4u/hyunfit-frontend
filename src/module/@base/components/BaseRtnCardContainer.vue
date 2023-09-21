// ParentComponent.vue

<template>
  <div class="all-content-wrap bg-black">
    <div class="rtn-board-header-wrap">
      <div class="rtn-board-header flex justify-between">
        <div>루틴 목록</div>
        <div>
          <input
            type="text"
            v-model="searchTerm"
            placeholder="루틴 검색..."
            class="border p-2 rounded"
          />
        </div>
      </div>
    </div>
    <div>
      <!-- BaseRtnCardGroup 컴포넌트에 props로 routines 전달 -->
      <BaseRtnCardGroup :routines="filteredRoutines" />
    </div>
  </div>
</template>

<script>
import BaseRtnCardGroup from '/src/module/@base/components/BaseRtnCardGroup.vue' // 자식 컴포넌트 임포트
import ApiClient from '/src/services/api' // ApiClient 임포트

export default {
  components: {
    BaseRtnCardGroup, // 자식 컴포넌트 등록
  },
  data() {
    return {
      routines: [], // API 결과를 저장할 배열
      searchTerm: '', // 추가: 검색어를 저장할 변수
    }
  },
  computed: {
    // 추가: 검색어에 따라 루틴을 필터링
    filteredRoutines() {
      return this.routines.filter(routine =>
        routine.rtnName.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    },
  },
  async mounted() {
    try {
      // API 호출
      this.routines = await ApiClient.get('/routines') // API의 경로를 입력해주세요
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error)
    }
  },
}
</script>
