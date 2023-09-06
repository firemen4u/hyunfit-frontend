<template>
  <div class="filter-selection-container">
    <BaseChip
      v-for="option in options"
      :key="option"
      :value="option"
    ></BaseChip>
  </div>
</template>

<script setup>
import BaseChip from '../../@base/components/BaseChip.vue'
import { useTrnSearchStore } from '../../../stores/trn-search';
import { ref, computed } from 'vue'

const props = defineProps({
  radiobox: Array,
  checkbox: Array,
  value: String,
})

const trnSearchStore = useTrnSearchStore();
console.log("BaseChip" + trnSearchStore.allOptions);

// 객체를 다시 배열로 변환하는 과정
const options = computed(() => {
  const { lessonTypes, trainerGender } = trnSearchStore.allOptions;
  const lessonTypeArray = Array.isArray(lessonTypes) ? lessonTypes : [lessonTypes];
  const result = [...lessonTypeArray, trainerGender];
  return result.filter(Boolean);
});


</script>
<style scope>
.filter-selection-container {
  height:46px;
}
</style>