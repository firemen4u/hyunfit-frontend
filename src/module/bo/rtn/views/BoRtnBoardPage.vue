<template>
  <BaseContainer admin-menu>
    <BaseBodyWrapper>
      <div class="pt-10">
        <div>
          <div class="p-2">
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
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import {
  BaseRtnCardContainer,
  BaseRtnCardGroup,
} from '/src/module/@base/components'
</script>
<style></style>
