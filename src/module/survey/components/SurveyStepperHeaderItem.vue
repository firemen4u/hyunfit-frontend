<script setup>
import {
  RadioCompletedSvg,
  RadioDefaultSvg,
  RadioSelectedSvg,
} from '@/module/@base/svg'
const emit = defineEmits(['group:selected'])
const props = defineProps({
  complete: Boolean,
  edit: Boolean,
  value: Number,
})
</script>

<template>
  <div>
    <RadioDefaultSvg v-if="!complete && !edit" />
    <RadioSelectedSvg v-if="edit" />
    <RadioCompletedSvg v-if="complete" />
  </div>
</template>

<style scoped></style>
