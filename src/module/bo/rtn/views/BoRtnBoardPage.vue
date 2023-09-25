<template>
  <div class="bg-gray-50 w-full">
    <BaseContainer category="admin">
      <BaseBodyWrapper>
        <div class="pt-10">
          <div class="p-2">
            <div class="">
              <BaseRtnCardContainer :showAdmin="true" />
            </div>
          </div>
          <BasePagination />
        </div>
      </BaseBodyWrapper>
    </BaseContainer>
  </div>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import {
  BaseRtnCardContainer,
  BaseRtnCardGroup,
} from '/src/module/@base/components'
</script>
<style></style>
