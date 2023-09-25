<script setup>
import ExcUtils from '@/module/bo/exc/services/excUtils'
import BaseLabel from '@/module/@base/components/BaseLabel.vue'
defineProps({
  exercise: Object,
  rtnIdx: Number,
})
function timePerExc(exercise) {
  return Math.round((exercise.excSetCount * exercise.excTimePerSetInSec) / 60)
}
</script>

<template>
  <v-chip
    label
    color="#454545"
    variant="text"
    class="flex justify-between mb-1 select-none"
    :ripple="false"
  >
    <div class="flex items-center">
      {{ rtnIdx + 1 }}. {{ exercise.excName }}
    </div>

    <base-label color="#D23361" class="ml-2">
      {{ timePerExc(exercise) }}분, {{ ExcUtils.mapExcType(exercise.excType) }},
      {{ ExcUtils.mapDifficultyType(exercise.excDifficulty) }}
    </base-label>
  </v-chip>
</template>

<style scoped></style>
