<template>
  <v-stepper-window-item :value="3">
    <div class="stepper-window-container">
      <StepperTitle
        title="원하는 운동 구성을 선택해주세요!"
        subtitle="원하시는 운동 구성으로 추천해드릴게요"
      />
      <v-item-group
        mandatory
        v-model="innerValue"
        @update:model-value="value => setValue(value + 1)"
      >
        <v-container>
          <v-item
            v-for="(question, index) in surveyQuestions"
            :key="index"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="flex mb-3"
              :ripple="false"
              @click="toggle"
              :rounded="'full'"
              :variant="isSelected ? 'flat' : 'outlined'"
            >
              <v-scroll-y-transition>
                <div class="flex px-4 py-3">
                  <RadioSelectedSvg
                    v-if="isSelected"
                    :size="24"
                    color="#ffffff"
                  />
                  <RadioDefaultSvg
                    v-if="!isSelected"
                    :size="24"
                    color="#1E293B"
                  />
                  <div class="ml-2" :class="isSelected ? '' : 'text-slate-800'">
                    {{ question }}
                  </div>
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-container>
      </v-item-group>
    </div>
  </v-stepper-window-item>
</template>

<script setup>
import StepperTitle from '@/module/survey/components/StepperTitle.vue'
import { VStepperWindowItem } from 'vuetify/labs/VStepper'
import { ref } from 'vue'
import RadioSelectedSvg from '@/module/@base/svg/RadioSelectedSvg.vue'
import RadioDefaultSvg from '@/module/@base/svg/RadioDefaultSvg.vue'

const props = defineProps({
  modelValue: Number,
})
const innerValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])
const surveyQuestions = [
  '상체 근력 및 유산소 운동',
  '하체 근력 및 유산소 운동',
  '상/하체 근력 및 유산소 운동',
  '서킷트레이닝(전체 유산소 운동)',
]
function setValue(option) {
  emit('update:modelValue', option)
}
</script>

<style scoped></style>
