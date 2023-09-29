<script setup>
import { VStepperWindowItem } from 'vuetify/labs/VStepper'
import StepperTitle from '@/module/survey/components/StepperTitle.vue'
import { ref } from 'vue'
const props = defineProps({
  modelValue: Number,
})
const emit = defineEmits(['update:modelValue'])

function setMbrGoal(option) {
  emit('update:modelValue', option)
}

const innerValue = ref(props.modelValue)

const imageSrc = [
  'https://fs.hyunfit.life/api/hyunfit/file/qn-1-diet.png',
  'https://fs.hyunfit.life/api/hyunfit/file/qn-1-health.png',
]
const contents = [
  { title: '체중관리', subtitle: '다이어트・몸무게 증가・체중유지' },
  { title: '건강관리', subtitle: '라이프스타일 변화・성취감' },
]
</script>

<template>
  <v-stepper-window-item :value="1">
    <div class="stepper-window-container">
      <StepperTitle
        title="현핏 트레이닝을 통해 달성하고 싶은 목표를 정해주세요!"
        subtitle="목표에 맞는 루틴을 추천드릴게요"
      />

      <v-item-group
        v-model="innerValue"
        @update:modelValue="val => setMbrGoal(val)"
      >
        <v-container class="survey-goal-card-group flex justify-between">
          <v-item
            v-for="n in 2"
            :key="n"
            :value="n"
            v-slot="{ isSelected, toggle }"
          >
            <v-card
              :ripple="false"
              class="flex rounded-lg"
              color="primary"
              @click="toggle"
              width="300"
              height="300"
              :variant="isSelected ? 'flat' : 'tonal'"
            >
              <v-img :src="imageSrc[n - 1]" height="180" cover></v-img>
              <div class="p-5 w-full flex flex-col justify-center items-start">
                <div class="font-black text-2xl">
                  {{ contents[n - 1].title }}
                </div>
                <div class="font-semibold mt-1">
                  {{ contents[n - 1].subtitle }}
                </div>
              </div>
            </v-card>
          </v-item>
        </v-container>
      </v-item-group>
    </div>
  </v-stepper-window-item>
</template>

<style scoped>
.survey-goal-card-group {
  width: 650px;
}
/* 선택된 버튼에 스타일 적용 */
.button-group .selected {
  background-color: #d23360d2;
}

/* 중앙 정렬 컨테이너 스타일 */

/* 버튼 그룹 스타일 */
.button-group {
  display: flex;
  justify-content: center; /* 내부 요소를 가로로 가운데 정렬 */
}

/* 버튼 스타일 */
.option-button {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
  border-radius: 20px;
  background-color: rgb(204, 204, 204);
}

.option-button:hover {
  background-color: #d23360d2;
}

.option-button:focus {
  background-color: #d23361;
  fill-opacity: 0.7;
  transition: opacity 0.7s; /* 투명도 트랜지션 효과 적용 */
}

/* 이미지 스타일 */
.img-cover {
  max-width: 400px;
  max-height: 200px;
  overflow: hidden;
}

.option-image {
  width: 350px;
  border-radius: 20px;
}

.option-text {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
