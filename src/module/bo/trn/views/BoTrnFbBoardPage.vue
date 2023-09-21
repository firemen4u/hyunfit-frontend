<template>
  <BaseContainer category="trainer" footer="false">
    <BaseBodyWrapper>
      <BaseSideBar
        :sidebarHeader="sidebarHeader"
        :categoryTitle="categoryTitle"
        :subcategories="subcategories"
      ></BaseSideBar>
      <div class="nfb-container flex justify-center">
        <div class="nfb-list-outer mb-10" ref="listOuter">
          <div class="mt-10">
            <NoFeedbackList></NoFeedbackList>
          </div>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<script setup>
import {
  BaseContainer,
  BaseBodyWrapper,
  BaseSideBar,
} from '/src/module/@base/views'
import NoFeedbackList from '../component/NoFeedbackList.vue'
</script>

<script>
export default {
  data() {
    return {
      sidebarHeader: '트레이닝',
      categoryTitle: '회원관리',
      subcategories: [
        { title: '예약현황', link: '/pt-rsv-manage' },
        { title: '피드백작성', link: '/pt-fb-manage' },
      ],
    }
  },
}
</script>

<style scoped>
.nfb-container {
  display: flex;
  flex-direction: row;
  width: 1100px;
  height: auto;
}
.nfb-list-outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  height: auto;
  background: #ffffff;
}
</style>
