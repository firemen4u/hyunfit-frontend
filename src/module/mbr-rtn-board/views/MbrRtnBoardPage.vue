<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
import BaseRtnCardContainer from '/src/module/@base/components/BaseRtnCardContainer.vue'
</script>

<template>
  <BaseContainer>
    <div class="w-100 flex justify-center primary-background">
      <BaseBodyWrapper>
        <div class="bg-white shadow-lg rounded-xl overflow-hidden mt-3">
          <BaseRtnCardContainer :showMember="true" />
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<style scoped></style>
