<script setup>
import { ref, watch } from 'vue'
import { SearchSvg } from '@/module/@base/svg'

let combobox_data = [
  {
    label: '집중 부위',
    items: ['상체 근력', '하체 근력', '전신 근력', '유산소'],
  },
  {
    label: '소요 시간',
    items: ['10~15분', '15~20분', '20~25분'],
  },
  {
    label: '운동 난이도',
    items: ['초급', '초중급', '중급', '중고급', '고급'],
  },
]

let loading = ref(false)

watch(loading, _ => {
  if (!loading.value) return
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template>
  <div class="main-rtn-search-combobox-container mt-5 flex">
    <v-combobox
      v-for="(data, i) in combobox_data"
      :key="i"
      class="h-14 w-36 mr-2"
      color="primary"
      :label="data.label"
      :items="data.items"
      variant="outlined"
    ></v-combobox>

    <div class="text-center">
      <v-btn
        :loading="loading"
        size="56"
        class="bg-gray-200 h-14 w-14 border-gray-300"
        @click="loading = !loading"
        variant="outlined"
      >
        <SearchSvg :size="25"></SearchSvg>
        <template v-slot:loader>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </template>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.v-btn--variant-outlined {
  border: thin solid rgba(0, 0, 0, 0.38);
}
.v-btn--variant-outlined:hover {
  border: thin solid rgba(0, 0, 0, 1);
}
</style>
