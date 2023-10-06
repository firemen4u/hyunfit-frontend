<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  predictions: Object,
})

const probability = computed(() => {
  let p = props.prediction?.probability * 100
  return p ? p : 0
})
</script>

<template>
  <div>
    {{ predictions[0]?.className.split(':')[1] }}
    <v-progress-linear
      :model-value="predictions[0].probability * 100"
      color="#00a600"
      height="25"
      rounded="5"
      rounded-bar
      ><template v-slot:default="{ value }">
        <div class="text-lg text-white font-black">{{ Math.ceil(value) }}%</div>
      </template></v-progress-linear
    >
    {{ predictions[1]?.className.split(':')[1] }}
    <v-progress-linear
      :model-value="predictions[1].probability * 100"
      color="#FF0000"
      height="25"
      rounded="5"
      rounded-bar
      ><template v-slot:default="{ value }">
        <div class="text-lg text-white font-black">{{ Math.ceil(value) }}%</div>
      </template></v-progress-linear
    >
  </div>
</template>

<style scoped></style>
