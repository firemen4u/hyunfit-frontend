<template>
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

  <v-stepper :items="['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']">
    <template v-slot:item.1>
      <v-card title=" " flat class="card-shape"><Step1></Step1></v-card>
    </template>

    <template v-slot:item.2>
      <v-card title=" " flat class="card-shape"><Step2></Step2></v-card>
    </template>

    <template v-slot:item.3>
      <v-card title=" " flat class="card-shape"><Step3></Step3></v-card>
    </template>

    <template v-slot:item.4>
      <v-card title=" " flat class="card-shape"><Step4></Step4></v-card>
    </template>

    <template v-slot:item.5>
      <v-card title=" " flat class="card-shape"><Step5></Step5></v-card>
    </template>
  </v-stepper>
</template>

<script>
import { VStepper } from 'vuetify/labs/VStepper'
import Step1 from '@/module/survey/components/StepOne.vue'
import Step2 from '@/module/survey/components/StepTwo.vue'
import Step3 from '@/module/survey/components/StepThree.vue'
import Step4 from '@/module/survey/components/StepFour.vue'
import Step5 from '@/module/survey/components/StepFive.vue'

export default {
  components: {
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
    }
  },
}
</script>

<style scoped>
.card-shape {
  width: 1000px;
  height: 600px;
}

#inspire .v-stepper__step#'Step 1':hover .v-stepper__step__step {
  background-color: green;
}
</style>
