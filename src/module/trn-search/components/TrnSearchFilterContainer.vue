<template>
  <div v-if="props.checkbox">
    <v-checkbox 
      v-for="(item, index) in props.data"
      :key="index"
      :label="item.label"
      :value="item.value"
      v-model="selectedCheckBox"
      color="rgb(199, 53, 102)"
      @change="print1()"
    ></v-checkbox>
  </div>
  <div v-else>
    <v-radio-group v-model="selectedRadioBox">
      <v-radio 
        v-for="(item, index) in props.data"
        :key="index"
        :label="item.label"
        :value="item.value"
        color="rgb(199, 53, 102)"
        @change="print2()"
      >
    </v-radio>
    </v-radio-group>
  </div>
</template>
    
<script setup>
import { ref, watch } from 'vue'
import { useTrnSearchStore } from '../../../stores/trn-search';
import BaseCheckBox from '../../@base/components/BaseCheckBox.vue';
// 이거 받아서 보내줘야 하는거 생각하기
const props = defineProps({
  checkbox: Boolean,
  radiobox: Boolean,
  data: Object,
})

function print1() {
  trnSearchStore.updateLessonTypes(selectedCheckBox.value);
  console.log(selectedCheckBox.value)
}

function print2() {
  trnSearchStore.updateTrainerGender(selectedRadioBox.value);
}
const selectedCheckBox = ref([])
const selectedRadioBox = ref([])

const trnSearchStore = useTrnSearchStore();

watch(trnSearchStore.options, (newVal, oldVal) => {
  console.log("new ", newVal, "old", oldVal)
})

</script>
<style scope>

</style>
  