<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  labels: Array,
  score: Number,
  predictions: Array,
})
//
// const probability = computed(() => {
//   let p = props.prediction?.probability * 100
//   return p ? p : 0
// })
</script>

<template>
  <div>
    <div class="text-center text-black font-black text-2xl mb-2">
      인식률: {{ Math.round(score * 100) }}%
    </div>
    <div class="text-lg font-bold mb-1">{{ labels[0]?.split(':')[1] }}</div>
    <v-progress-linear
      :model-value="predictions[0] ? predictions[0]?.probability * 100 : 0"
      color="#00a600"
      height="25"
      rounded="5"
      rounded-bar
      ><template v-slot:default="{ value }">
        <div class="text-lg text-white font-black">{{ Math.ceil(value) }}%</div>
      </template></v-progress-linear
    >
    <div class="text-lg font-bold mt-3 mb-1">
      {{ labels[1]?.split(':')[1] }}
    </div>
    <v-progress-linear
      :model-value="predictions[1] ? predictions[1]?.probability * 100 : 0"
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
