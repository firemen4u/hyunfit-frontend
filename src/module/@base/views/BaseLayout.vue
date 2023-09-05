<template>
  <v-layout ref="app">
    <BaseHeader />
    <main class="d-flex flex-column justify-center align-center mt-16">
      <div style="width: 65%; border: solid 1px red">
        <slot></slot>
      </div>
      <BaseFooter />
    </main>
  </v-layout>
</template>

<script setup>
import { BaseFooter, BaseHeader } from '/src/module/@base/components'
</script>
