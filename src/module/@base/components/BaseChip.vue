<template>
  <v-chip
    v-if="chip"
    class="mr-1"
    color="rgb(199, 53, 102)"
    text-color="white"
    @click:close="chip = false"
  >
    {{ value }}
  </v-chip>
</template>

<script setup>
import { ref } from 'vue'
const chip = ref(true)

const props = defineProps({
  value: String,
})
</script>
