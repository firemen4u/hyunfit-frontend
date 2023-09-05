<template>
  <div v-if="props.checkbox">
    <v-checkbox
      class="checkbox"  color="rgb(199, 53, 102)"
      v-for="(item, index) in props.data"
      :key="index"
      :label="item.label"
      :value="item.value"
      v-model="selectedCheckItems"
    >
    </v-checkbox>
  </div>
  <div v-else>
    <v-radio-group>
      <v-radio class="radio-button" color="rgb(199, 53, 102)"
        v-for="(item, index) in props.data"
        :key="index"
        :label="item.label"
        :value="item.value"
        v-model="selectedRadioItems"
      ></v-radio>
    </v-radio-group>
  </div>
</template>
    
<script setup>
import { ref } from 'vue'

const props = defineProps({
  checkbox: Boolean,
  radiobox: Boolean,
  data: Object,
})

// 이거 받아서 보내줘야 하는거 생각하기
const selectedCheckItems = ref([])
const selectedRadioItems = ref([])

</script>
<style scope>

.radio-button{
    color:"indigo"
}

</style>
  