<template>
  <BaseContainer category="trainer" footer="false">
    <BaseBodyWrapper>
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
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import NoFeedbackList from '../component/NoFeedbackList.vue'
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
