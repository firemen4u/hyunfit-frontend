<template>
  <BaseContainer nofooter>
    <!-- <v-stepper :items="items" style="width: 1000px">
    <template v-for="(step, index) in items" :key="index" v-slot:item="props">
      {{ index }}
      <v-card style="height: 600px" class="border">
        <v-card-title>{{ step }}</v-card-title>
        <v-card-text>
          <component :is="props.item"></component>
        </v-card-text>
      </v-card>
    </template>
  </v-stepper> -->

    <v-stepper
      :items="['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']"
      class="mt-12"
    >
      <template v-slot:item.1>
        <v-card title=" " flat class="card-shape"
          ><Step1
            :memberInfo="memberInfo"
            @updateMemberInfo="updateMemberInfo"
          ></Step1
        ></v-card>
      </template>

      <template v-slot:item.2>
        <v-card title=" " flat class="card-shape"
          ><Step2
            :memberInfo="memberInfo"
            @updateMemberInfo="updateMemberInfo"
          ></Step2
        ></v-card>
      </template>

      <template v-slot:item.3>
        <v-card title=" " flat class="card-shape"
          ><Step3
            :memberInfo="memberInfo"
            @updateMemberInfo="updateMemberInfo"
          ></Step3
        ></v-card>
      </template>

      <template v-slot:item.4>
        <v-card title=" " flat class="card-shape"
          ><Step4
            :memberInfo="memberInfo"
            @updateMemberInfo="updateMemberInfo"
          ></Step4
        ></v-card>
      </template>

      <template v-slot:item.5>
        <v-card title=" " flat class="card-shape"
          ><Step5
            :memberInfo="memberInfo"
            @updateMemberInfo="updateMemberInfo"
          ></Step5
        ></v-card>
      </template>
    </v-stepper>
    <button class="mbr-update-button mt-8 mb-8" @click="updateRequest()">
      설정완료
    </button>
  </BaseContainer>
</template>

<script>
import { VStepper } from 'vuetify/labs/VStepper'
import Step1 from '@/module/survey/components/StepOne.vue'
import Step2 from '@/module/survey/components/StepTwo.vue'
import Step3 from '@/module/survey/components/StepThree.vue'
import Step4 from '@/module/survey/components/StepFour.vue'
import Step5 from '@/module/survey/components/StepFive.vue'
import BaseContainer from '@/module/@base/views/BaseContainer.vue'
import ApiClient from '/src/services/api.js'
import router, { pathNames } from '@/router'
export default {
  components: {
    BaseContainer,
    VStepper,
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
  },
  data() {
    return {
      items: [Step1, Step2, Step3, Step4, Step5],
      memberInfo: {
        mbrGender: null,
        mbrExerciseGoal: null,
        mbrBirthdate: null,
        mbrHeight: null,
        mbrWeight: null,
        mbrExerciseExperienceLevel: null,
        mbrKneeHealthConsidered: null,
        mbrNoiseConsidered: null,
        mbrLongSitter: null,
        mbrNeckShoulderFocused: null,
        mbrBackDiskConsidered: null,
        mbrExerciseTarget: null,
        checkAgree: null,
      },
    }
  },
  methods: {
    updateMemberInfo(memberInfoFromChild) {
      this.memberInfo = memberInfoFromChild
    },
    async updateRequest() {
      if (this.memberInfo.checkAgree) {
        const responseUser = await ApiClient.get('/members/me')
        ApiClient.put('/members/' + responseUser.mbrId, this.memberInfo)
        router.push(pathNames.mainPage)
      } else {
        alert('개인정보수집에 동의해주세요')
      }
    },
  },
}
</script>

<style scoped>
.mbr-update-button {
  width: 125px;
  height: 35px;
  border-radius: 5px;
  background: #d23360d2;
  color: white;
  font-weight: 600;
}
</style>
