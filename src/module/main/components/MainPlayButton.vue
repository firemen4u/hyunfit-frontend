<template>
  <v-btn
    height="44"
    class="bg-gray-200 border-gray-300"
    @click="loading = !loading"
  >
    <PlaySvg :size="22"></PlaySvg>
    <div class="ml-2 text-lg">운동 시작하기</div>
  </v-btn>
</template>

<script setup>
import { PlaySvg } from '@/module/@base/svg'
</script>
