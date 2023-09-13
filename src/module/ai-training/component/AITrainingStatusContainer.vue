<template>
  <div
    class="training-status-container flex flex-col absolute items-center justify-center p-2 w-40 h-60 top-4 left-4 rounded-lg"
  >
    <div
      class="set-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-2/5 mb-2 p-2 rounded-md"
    >
      <p class="set-title text-lg font-bold">SET</p>
      <div class="set-count flex flex-row p-2">
        <div
          v-for="(setStatus, index) in setStatuses"
          :key="index"
          :data-sets-status="setStatus"
          class="status setStyle"
        ></div>
      </div>
    </div>
    <div
      class="reps-count-container flex flex-col items-center justify-center bg-[#4e4e4f] text-white w-full h-3/5 rounded-md"
    >
      <span class="reps-title text-lg font-bold">Reps</span>
      <p class="resps-count text-6xl font-bold text-[#00E77B]">0</p>
      <div class="reps-remain ml-20 font-bold">/16</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const setCounts = ref(props.setCount) // 세트의 숫자
const setStatuses = ref(['past', 'future', 'future']) // 상태 값
const statusList = ref([])

const props = defineProps({
  setCount: Number,
})

// // 갯수만큼 statusList를 생성하고 초기값을 설정합니다.
// for (let i = 0; i < setCount.value; i++) {
//   statusList.value.push(i === 0 ? 'current' : 'future')
// }
// // status가 변경되면 statusList 역시 업데이트합니다.
// watch(setCount, newCount => {
//   statusList.value = Array.from({ length: newCount }, (_, index) =>
//     index === 0 ? 'current' : 'future'
//   )
// })
</script>
<style scoped>
.setStyle[data-sets-status='past'] {
  background-color: rgb(0, 231, 123);
  border-color: rgb(0, 231, 123);
}

.setStyle[data-sets-status='future'] {
  background-color: rgb(184, 184, 184);
}

.setStyle[data-sets-status='future'] {
  background-color: rgb(184, 184, 184);
}

.setStyle {
  width: 24px;
  height: 24px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 50%;
  background-color: rgb(184, 184, 184);
}
</style>
