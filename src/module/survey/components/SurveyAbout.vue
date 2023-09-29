<script setup>
import { ref } from 'vue'
import StepperTitle from '@/module/survey/components/StepperTitle.vue'
import { VStepperWindowItem } from 'vuetify/labs/VStepper'

const props = defineProps({
  modelValue: Object,
  username: String,
})

const innerValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'update:disabled'])

const form = ref(false)

function updateDisabled() {
  let disabled = true
  if (form.value) {
    if (
      (innerValue.value.mbrHeight || innerValue.value.mbrWeight) &&
      innerValue.value.consentAgreement
    ) {
      disabled = false
    } else if (!innerValue.value.mbrHeight && !innerValue.value.mbrWeight) {
      disabled = false
    }
  }
  emit('update:disabled', disabled)
}
const rules = {
  birthdate: value => {
    return isValidBirthdate(value) || '생년월일 8자리 숫자로 입력해주세요.'
  },
  height: value => {
    return !value || isValidHeight(value) || '유효한 숫자의 키로 입력해주세요.'
  },
  weight: value => {
    return (
      !value || isValidWeight(value) || '유효한 숫자의 몸무게로 입력해주세요.'
    )
  },
}

function isValidHeight(heightString) {
  heightString = heightString.trim()
  if (!/^\d+$/.test(heightString)) {
    return false
  }
  const height = parseInt(heightString, 10)
  const minHeight = 50
  const maxHeight = 300
  return !(isNaN(height) || height < minHeight || height > maxHeight)
}
function isValidWeight(weightString) {
  weightString = weightString.trim()
  const weight = parseFloat(weightString)
  const minWeight = 20
  const maxWeight = 500
  return !(isNaN(weight) || weight < minWeight || weight > maxWeight)
}
function isValidBirthdate(dateString) {
  if (dateString.length !== 8) {
    return false
  }
  const year = parseInt(dateString.slice(0, 4), 10)
  const month = parseInt(dateString.slice(4, 6), 10)
  const day = parseInt(dateString.slice(6, 8), 10)
  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false
  }

  const currentYear = new Date().getFullYear()
  const minYear = 1900

  if (year < minYear || year > currentYear) {
    return false
  }

  const daysInMonth = new Date(year, month, 0).getDate()

  return day <= daysInMonth
}
</script>

<template>
  <v-stepper-window-item :value="5">
    <div class="stepper-window-container">
      <StepperTitle
        :title="props.username + '님에 대해 알려주세요!'"
        subtitle="이제 다 왔어요!"
      />
      <v-form v-model="form" class="survey-about-form">
        <v-text-field
          label="생년월일"
          variant="outlined"
          placeholder="생년월일 8자리 숫자"
          clearable
          v-model="innerValue.mbrBirthdate"
          :rules="[rules.birthdate]"
          color="primary"
          style="height: 80px; margin-bottom: 4px"
          @change="updateDisabled()"
        ></v-text-field>

        <v-btn-toggle
          class="flex justify-center mb-6"
          style="width: 300px"
          v-model="innerValue.mbrGender"
          color="primary"
          mandatory
          @click="updateDisabled()"
        >
          <v-btn width="100" class="rounded" :value="1" :ripple="false"
            >여성</v-btn
          >
          <v-btn width="100" class="rounded" :value="0" :ripple="false"
            >남성</v-btn
          >
          <v-btn width="100" class="rounded" :value="-1" :ripple="false"
            >선택안함</v-btn
          >
        </v-btn-toggle>

        <!-- 키 입력 -->
        <v-text-field
          type="number"
          label="키 (선택)"
          variant="outlined"
          suffix="cm"
          clearable
          color="primary"
          placeholder="키를 숫자로 입력해 주세요"
          v-model="innerValue.mbrHeight"
          :rules="[rules.height]"
          style="height: 80px; margin-bottom: 4px"
          @update:modelValue="updateDisabled()"
          @input="updateDisabled()"
        ></v-text-field>

        <!-- 몸무게 입력 -->
        <v-text-field
          label="몸무게 (선택)"
          variant="outlined"
          suffix="kg"
          clearable
          color="primary"
          placeholder="몸무게를 숫자로 입력해 주세요"
          v-model="innerValue.mbrWeight"
          :rules="[rules.weight]"
          @update:modelValue="updateDisabled()"
          @input="updateDisabled()"
        ></v-text-field>

        <!-- 정보 수집 동의 (체크박스) -->
        <v-checkbox
          v-model="innerValue.consentAgreement"
          @update:model-value="updateDisabled()"
          color="primary"
        >
          <template v-slot:label>
            <div class="text-xs flex">
              키, 몸무게 입력시
              <p class="underline ml-1">민감정보수집</p>
              에 동의합니다
            </div>
          </template>
        </v-checkbox>
      </v-form>
    </div>
  </v-stepper-window-item>
</template>

<style scoped>
.survey-about-form {
  width: 300px;
}
</style>
<style>
.stepper-window-container input::-webkit-outer-spin-button,
.stepper-window-container input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
