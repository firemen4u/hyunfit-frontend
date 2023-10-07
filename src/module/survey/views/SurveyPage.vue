<script setup>
import BaseContainer from '@/module/@base/views/BaseContainer.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { VStepper, VStepperItem, VStepperWindow } from 'vuetify/labs/VStepper'
import SurveyStepperActions from '@/module/survey/components/SurveyStepperActions.vue'
import SurveyGoal from '@/module/survey/components/SurveyGoal.vue'
import SurveyLevel from '@/module/survey/components/SurveyLevel.vue'
import SurveyTarget from '@/module/survey/components/SurveyTarget.vue'
import SurveyKnowMore from '@/module/survey/components/SurveyKnowMore.vue'
import SurveyAbout from '@/module/survey/components/SurveyAbout.vue'
import ApiClient from '@/services/api'
import router, { pathNames } from '@/router'

const userData = ref(null)
onMounted(async () => {
  userData.value = await ApiClient.me()

  if (userData.value?.mbrGender) {
    memberInfo.mbrBasic.mbrGender = userData.value.mbrGender
    memberInfo.mbrBasic.mbrBirthdate = userData.value.mbrBirthdate
    memberInfo.mbrBasic.mbrHeight = userData.value.mbrHeight
    memberInfo.mbrBasic.mbrWeight = userData.value.mbrWeight

    if (memberInfo.mbrBasic.mbrHeight || memberInfo.mbrBasic.mbrWeight) {
      memberInfo.mbrBasic.consentAgreement = true
    }
    aboutDisabled.value = false
  }
})
const loading = ref(false)
const env = reactive({
  step: ref(1),
  steps: ref(5),
})

const disable = computed(() => {
  return (
    (env.step === 1 && !memberInfo.mbrExerciseGoal) ||
    (env.step === 3 && !memberInfo.mbrExerciseTarget) ||
    (env.step === 4 && knowMoreDisabled.value) ||
    (env.step === 5 && aboutDisabled.value)
  )
})
const hide = computed(() => {
  return env.step === 1 ? 'prev' : env.step === env.steps ? 'next' : undefined
})

const knowMoreDisabled = ref(true)
const aboutDisabled = ref(true)

const memberInfo = reactive({
  mbrExerciseGoal: ref(null),
  mbrExerciseExperienceLevel: ref(1),
  mbrExerciseTarget: ref(null),
  mbrMore: reactive({
    mbrKneeHealthConsidered: ref(null),
    mbrNoiseConsidered: ref(null),
    mbrNeckShoulderFocused: ref(null),
    mbrBackDiskConsidered: ref(null),
    mbrLongSitter: ref(null),
  }),
  mbrBasic: reactive({
    mbrGender: ref(1),
    mbrBirthdate: ref(''),
    mbrHeight: ref(''),
    mbrWeight: ref(''),
    consentAgreement: ref(false),
  }),
})

async function updateMemberInfo() {
  const body = {
    mbrExerciseGoal: memberInfo.mbrExerciseGoal,
    mbrExerciseTarget: memberInfo.mbrExerciseTarget,
    mbrExerciseExperienceLevel: memberInfo.mbrExerciseExperienceLevel,
    mbrKneeHealthConsidered: memberInfo.mbrMore.mbrKneeHealthConsidered,
    mbrNoiseConsidered: memberInfo.mbrMore.mbrNoiseConsidered,
    mbrNeckShoulderFocused: memberInfo.mbrMore.mbrNeckShoulderFocused,
    mbrBackDiskConsidered: memberInfo.mbrMore.mbrBackDiskConsidered,
    mbrLongSitter: memberInfo.mbrMore.mbrLongSitter,
    mbrBirthdate: memberInfo.mbrBasic.mbrBirthdate,
  }
  if (memberInfo.mbrBasic.mbrGender >= 0) {
    body.mbrGender = memberInfo.mbrBasic.mbrGender
  }
  if (memberInfo.mbrBasic.mbrHeight !== '') {
    body.mbrHeight = memberInfo.mbrBasic.mbrHeight
  }
  if (memberInfo.mbrBasic.mbrWeight !== '') {
    body.mbrWeight = memberInfo.mbrBasic.mbrWeight
  }
  loading.value = true
  await ApiClient.put('/members/' + userData.value.mbrId, body)

  setTimeout(() => {
    loading.value = false
    router.push(pathNames.mainPage)
  }, 1000)
}
</script>

<template>
  <BaseContainer nofooter>
    <div class="flex justify-center primary-background survey-container">
      <v-stepper class="survey-stepper rounded-xl mt-10" v-model="env.step">
        <template v-slot:default="{ prev, next }">
          <div
            class="v-stepper-header-container w-full flex justify-center mt-10"
          >
            <div v-for="n in env.steps" :key="`${n}-step`">
              <v-stepper-item
                :style="{ padding: 0, margin: '0 5px', zIndex: 1 }"
                :color="'#044589'"
                :complete="env.step > n"
                :value="n"
              >
              </v-stepper-item>
            </div>
          </div>
          <v-stepper-window>
            <SurveyGoal v-model="memberInfo.mbrExerciseGoal" />
            <SurveyLevel v-model="memberInfo.mbrExerciseExperienceLevel" />
            <SurveyTarget v-model="memberInfo.mbrExerciseTarget" />
            <SurveyKnowMore
              v-model="memberInfo.mbrMore"
              @update:disabled="val => (knowMoreDisabled = val)"
            />
            <SurveyAbout
              v-model="memberInfo.mbrBasic"
              :username="userData?.mbrName"
              :disabled="aboutDisabled"
              @update:disabled="val => (aboutDisabled = val)"
            />
          </v-stepper-window>
          <SurveyStepperActions
            :disable="disable"
            :hide="hide"
            @click:prev="prev"
            @click:next="next"
            @click:done="updateMemberInfo"
            :loading="loading"
          ></SurveyStepperActions>
        </template>
      </v-stepper>
    </div>
  </BaseContainer>
</template>

<style scoped>
.survey-container {
  height: 1000px;
}
.survey-stepper {
  height: 750px;
  width: 800px;
}
</style>
<style>
.v-stepper-header-container .v-stepper-item .v-avatar {
  margin: 0;
}
.stepper-window-container {
  height: 480px;
  display: flex;
  flex-direction: column; /* 내부 요소를 세로로 정렬 */
  align-items: center; /* 내부 요소를 가로로 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
  justify-content: flex-start;
  margin-top: 30px;
}
</style>
