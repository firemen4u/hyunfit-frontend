<script setup>
import { ref } from 'vue'
import { LeftArrowSvg, RightArrowSvg } from '@/module/@base/svg'
import ReportDateUtils from '@/module/report/services/reportDateUtils'

const props = defineProps({
  modelValue: {
    modelValue: Date,
  },
})
const emit = defineEmits(['search'])

function search(modifier) {
  const date = new Date(
    props.modelValue.getFullYear(),
    props.modelValue.getMonth() + modifier
  )
  emit('search', date)
}
</script>

<template>
  <div class="flex items-center">
    <div class="text-2xl font-black w-60">
      {{ props.modelValue.getFullYear() }}년
      {{ props.modelValue.getMonth() + 1 }}월 리포트
    </div>

    <v-btn
      :icon="LeftArrowSvg"
      variant="flat"
      color="#F9FAFB"
      @click="search(-1)"
    />
    <v-btn
      :icon="RightArrowSvg"
      variant="flat"
      color="#F9FAFB"
      @click="search(1)"
    />
  </div>
</template>

<style scoped></style>
