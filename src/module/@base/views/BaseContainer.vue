<script setup>
import { BaseHeader, BaseFooter } from '/src/module/@base/components'
const props = defineProps({
  noheader: Boolean,
  nofooter: Boolean,
})
</script>
<template>
  <BaseHeader v-if="!noheader" />
  <div ref="app" class="w-100">
    <main class="d-flex flex-column justify-center align-center mt-16 w-100">
      <slot></slot>
      <BaseFooter v-if="!nofooter" />
    </main>
  </div>
</template>
