<script setup>
import { LeftArrowSvg } from '@/module/@base/svg'

const props = defineProps({
  disable: Boolean,
  hide: String,
  loading: Boolean,
})

const emit = defineEmits(['click:prev', 'click:next', 'click:done'])

function prev() {
  emit('click:prev')
}
function next() {
  emit('click:next')
}
function done() {
  emit('click:done')
}
</script>

<template>
  <div
    class="survey-stepper-actions-container relative flex w-full items-center justify-center"
  >
    <div class="absolute top-0 left-[190px] w-full">
      <v-btn
        variant="tonal"
        v-if="hide !== 'prev'"
        class="stepper-actions-prev"
        :icon="LeftArrowSvg"
        @click="prev"
        density="comfortable"
        style="height: 50px; width: 50px; border-radius: 4px"
      >
      </v-btn>
    </div>
    <div class="next-btn-container flex items-center justify-center">
      <v-btn
        variant="flat"
        v-if="hide !== 'next'"
        :disabled="disable"
        @click="next"
        :ripple="false"
        style="width: 300px; height: 50px; border-radius: 6px"
      >
        <div class="">다음</div>
      </v-btn>
      <v-btn
        variant="flat"
        v-if="hide === 'next'"
        :disabled="disable"
        @click="done"
        :ripple="false"
        style="width: 300px; height: 50px; border-radius: 6px"
        :loading="loading"
      >
        <div class="">완료</div>
      </v-btn>
    </div>
  </div>
</template>

<style scoped></style>
<style>
.survey-stepper-actions-container .next-btn-container .v-btn:enabled {
  background-color: #044589;
  color: white;
  font-weight: 700;
}
</style>
