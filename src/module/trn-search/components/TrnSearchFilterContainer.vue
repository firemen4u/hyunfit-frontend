<template>
  <div v-if="props.checkbox">
    <v-checkbox
      class="checkbox"  color="rgb(199, 53, 102)"
      v-for="(item, index) in props.data"
      :key="index"
      :label="item.label"
      :value="item.value"
      v-model="selectedCheckBox"
      @change="print1()"
    >
    </v-checkbox>
  </div>
  <div v-else>
    <v-radio-group v-model="selectedRadioBox">
      <v-radio color="rgb(199, 53, 102)"
        v-for="(item, index) in props.data"
        :key="index"
        :label="item.label"
        :value="item.value"
        @change="print2()"
      ></v-radio>
    </v-radio-group>
  </div>
</template>
    
<script setup>
import { ref, watch } from 'vue'
import { useTrnSearchStore } from '../../../stores/trn-search';

// 이거 받아서 보내줘야 하는거 생각하기
const props = defineProps({
  checkbox: Boolean,
  radiobox: Boolean,
  data: Object,
})

function print1() {
  trnSearchStore.updateLessonTypes(selectedCheckBox.value);
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
  