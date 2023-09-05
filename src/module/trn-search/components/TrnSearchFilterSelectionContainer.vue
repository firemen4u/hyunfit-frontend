<template>
    <v-chip
      v-if="chip"
      class="ma-2"
      closable
      @click:close="chip = false"
    >
      Closable
    </v-chip>

    <v-btn
      v-if="!chip"
      close
      color="primary"
      dark
      @click="chip = true"
    >
      Reset Chip
    </v-btn>
</template>
<script setup>
import { ref } from 'vue'
const chip = ref(true);

</script>
<style scope>
    
</style>