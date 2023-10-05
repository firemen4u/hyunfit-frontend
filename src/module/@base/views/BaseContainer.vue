<script setup>
import { BaseHeader, BaseFooter } from '/src/module/@base/components'
import MainFooter from '@/module/main/components/MainFooter.vue'
const props = defineProps({
  noheader: Boolean,
  nofooter: Boolean,
  category: String,
  loading: Boolean,
})
</script>
<template>
  <BaseHeader v-if="!noheader" :category="category" />

  <div ref="app" class="w-100">
    <div class="base-loader fixed mt-[64px] w-full">
      <v-progress-linear
        :active="loading"
        height="5"
        :indeterminate="loading"
        :color="'#a9dbf5'"
      ></v-progress-linear>
    </div>
    <main
      class="d-flex flex-column justify-center align-center w-100"
      :class="!noheader ? 'mt-16' : ''"
      style="contain: paint"
    >
      <slot></slot>
      <MainFooter v-if="!nofooter" />
    </main>
  </div>
</template>

<style></style>
