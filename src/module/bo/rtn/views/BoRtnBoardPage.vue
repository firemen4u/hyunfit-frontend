<template>
  <BaseContainer category="admin">
    <div class="w-100 flex justify-center primary-background">
      <BaseBodyWrapper>
        <div class="bg-white shadow-lg rounded-xl overflow-hidden mt-3">
          <BaseRtnCardContainer :showAdmin="true" />
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import {
  BaseRtnCardContainer,
  BaseRtnCardGroup,
} from '/src/module/@base/components'
</script>
<style></style>
