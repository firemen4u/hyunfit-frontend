<script setup>
import StepperTitle from '@/module/survey/components/StepperTitle.vue'
import { VStepperWindowItem } from 'vuetify/labs/VStepper'
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object,
  knowMoreDisabled: Boolean,
})

const surveyQuestions = [
  '무릎 운동은 피하고 싶어요',
  '층간 소음이 신경쓰여요',
  '목과 어깨 근육을 풀어주고 싶어요',
  '앉아 있는 시간이 길어요',
  '허리에 부담이 되는 운동은 피하고 싶어요',
  '전부 해당되지 않아요',
]
const emit = defineEmits(['update:modelValue', 'update:disabled'])
const selectedOptions = ref([])
const innerValue = ref(props.modelValue)
const selected = val => selectedOptions.value.includes(val)

const updateModelValue = newVal => {
  if (!selected(5) && newVal.includes(5)) {
    newVal = [5]
  } else if (selected(5) && newVal.includes(5)) {
    const index = newVal.indexOf(5)
    if (index > -1) {
      newVal.splice(index, 1)
    }
  }

  innerValue.value.mbrKneeHealthConsidered = +newVal.includes(0)
  innerValue.value.mbrNoiseConsidered = +newVal.includes(1)
  innerValue.value.mbrNeckShoulderFocused = +newVal.includes(2)
  innerValue.value.mbrBackDiskConsidered = +newVal.includes(3)
  innerValue.value.mbrLongSitter = +newVal.includes(4)

  emit('update:modelValue', innerValue)
  emit('update:disabled', newVal.length === 0)
  selectedOptions.value = newVal
}
</script>

<template>
  <v-stepper-window-item :value="4">
    <div class="stepper-window-container">
      <StepperTitle
        title="현핏이 알고있어야 하는 점을 알려주세요!"
        subtitle="환경과 목적에 맞는 운동을 골라드릴게요! (중복 선택가능)"
      />
      <v-chip-group
        :column="true"
        :multiple="true"
        :model-value="selectedOptions"
        @update:model-value="value => updateModelValue(value)"
        class="flex justify-center"
      >
        <v-chip
          v-for="(item, idx) in surveyQuestions"
          :key="idx"
          :variant="selected(idx) ? 'flat' : 'outlined'"
          :ripple="false"
          :color="selected(idx) ? 'primary' : ''"
          :filter="true"
          :value="idx"
          class="px-3 py-5"
        >
          <div class="text-base">
            {{ item }}
          </div>
        </v-chip>
      </v-chip-group>
    </div>
  </v-stepper-window-item>
</template>

<style scoped></style>
