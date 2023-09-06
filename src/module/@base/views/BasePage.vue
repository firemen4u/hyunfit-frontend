<template>
  <v-layout ref="app" class="w-100">
    <BaseHeader />
    <main class="d-flex flex-column justify-center align-center mt-16 w-100">
      <slot></slot>
      <BaseFooter />
    </main>
  </v-layout>
</template>

<script setup>
import { BaseFooter, BaseHeader } from '/src/module/@base/components'
</script>
