<script setup>
import { ref } from 'vue'

let chosen = ref(null)
let times = [
  { idx: 1, displayText: '오전 7:00', actualTime: '7:00' },
  { idx: 2, displayText: '오전 8:00', actualTime: '8:00' },
  { idx: 3, displayText: '오전 9:00', actualTime: '9:00' },
  { idx: 4, displayText: '오전 10:00', actualTime: '10:00' },
  { idx: 5, displayText: '오전 11:00', actualTime: '11:00' },
  { idx: 6, displayText: '오후 12:00', actualTime: '12:00' },
  { idx: 7, displayText: '오후 1:00', actualTime: '13:00' },
  { idx: 8, displayText: '오후 2:00', actualTime: '14:00' },
  { idx: 9, displayText: '오후 3:00', actualTime: '15:00' },
  { idx: 10, displayText: '오후 4:00', actualTime: '16:00' },
  { idx: 11, displayText: '오후 5:00', actualTime: '17:00' },
  { idx: 12, displayText: '오후 6:00', actualTime: '18:00' },
  { idx: 13, displayText: '오후 7:00', actualTime: '19:00' },
  { idx: 14, displayText: '오후 8:00', actualTime: '20:00' },
  { idx: 15, displayText: '오후 9:00', actualTime: '21:00' },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-y-2 justify-between justify-items-center">
    <div v-for="t in times" :key="t.idx">
      <v-btn
        :ripple="false"
        variant="flat"
        height="32"
        class="w-20"
        @click="chosen = t.idx"
        :color="chosen === t.idx ? 'primary' : ''"
      >
        <div
          class="text-xs text-neutral-600 tracking-wide"
          :class="chosen === t.idx ? 'text-white font-black' : ''"
        >
          {{ t.displayText }}
        </div>
      </v-btn>
    </div>
  </div>
</template>

<style scoped></style>
