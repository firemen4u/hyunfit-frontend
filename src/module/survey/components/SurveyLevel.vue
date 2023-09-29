<template>
  <v-stepper-window-item :value="2">
    <div class="stepper-window-container">
      <StepperTitle
        title="현핏에게 사원님의 체력을 알려주세요!"
        subtitle="체력을 고려한 운동을 추천드릴게요"
      />
      <!-- 설문조사 표 -->
      <div class="survey-level-slider w-[500px] px-10 mt-20">
        <v-slider
          :model-value="modelValue"
          @update:model-value="v => setValue(v)"
          :thumbLabel="true"
          color="#044589"
          track-color="#bababa"
          thumb-size="24"
          track-fill-color="#044589bb"
          step="1"
          :min="1"
          :max="5"
          show-ticks="always"
          tick-size="5"
          track-size="12"
          rounded
          hide-details
        >
          <template v-slot:thumb-label="{ modelValue }">
            <div class="w-12 h-full text-gray-800 text-sm">
              {{ levels[modelValue - 1] }}
            </div>
          </template>
          <template v-slot:tick-label="{ tick }">
            <div
              v-if="tick.value % 2"
              class="w-20 h-12 z-[2] absolute left-[-35px] text-wrap text-sm pt-4 text-gray-500 font-semibold"
            >
              {{ getHint(tick.value) }}
            </div>
          </template>
        </v-slider>
      </div>
    </div>
  </v-stepper-window-item>
</template>

<script setup>
import { VStepperWindowItem } from 'vuetify/labs/VStepper'
import StepperTitle from '@/module/survey/components/StepperTitle.vue'
const props = defineProps({
  modelValue: Number,
})
const emit = defineEmits(['update:modelValue'])
const levels = ['초급', '초~중급', '중급', '중~고급', '고급']
function setValue(option) {
  emit('update:modelValue', option)
}
function getHint(v) {
  if (v < 3) return '홈 트레이닝 초심자에요!'
  if (v < 5) return '기초 체력은 자신있어요!'
  return '근력 운동도 문제없어요!'
}
</script>

<style>
.survey-level-slider .v-slider-track {
}
.survey-level-slider .v-slider-thumb__label {
  background-color: rgb(243, 244, 246);
  margin-bottom: 10px;
}
.survey-level-slider .v-slider-thumb__label:before {
  color: rgb(243, 244, 246);
}
</style>
