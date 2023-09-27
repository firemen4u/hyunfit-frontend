<script setup>
import { BaseHeader, BaseFooter } from '/src/module/@base/components'
const props = defineProps({
  noheader: Boolean,
  nofooter: Boolean,
  category: String,
})
</script>
<template>
  <BaseHeader v-if="!noheader" :category="category" />

  <div ref="app" class="w-100">
    <main
      class="d-flex flex-column justify-center align-center mt-16 w-100 overflow-y-hidden"
    >
      <slot></slot>
      <BaseFooter v-if="!nofooter" />
    </main>
  </div>
</template>
