<template>
  <v-chip
    v-if="chip"
    class="ma-2"
    color="rgb(199, 53, 102)"
    text-color="white"
    closable
    @click:close="chip = false"
  >
    {{value}}
  </v-chip>
</template>

<script setup>
import { ref } from 'vue'
const chip = ref(true)

const props = defineProps({
  value : String,
})
</script>


<style scope>
</style>