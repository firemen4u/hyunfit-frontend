<script setup>
import { BaseHeader, BaseFooter } from '/src/module/@base/components'
const props = defineProps({
  header: Boolean,
  footer: Boolean,
})

let hasHeader = props.header ? props.header : true
let hasFooter = props.footer ? props.footer : true
</script>
<template>
  <v-layout ref="app" class="w-100">
    <BaseHeader />
    <main class="d-flex flex-column justify-center align-center mt-16 w-100">
      <slot></slot>
      <BaseFooter />
    </main>
  </v-layout>
</template>
