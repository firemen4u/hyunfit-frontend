<template>
  <div class="main-rtn-search-combobox-container mt-5 flex">
    <v-combobox
      class="rtn-search-combobox border-red-500"
      clearable
      color="red"
      label="집중 부위"
      :items="['상체 근력', '하체 근력', '전신 근력', '유산소']"
      variant="outlined"
    ></v-combobox>
    <v-combobox
      class="rtn-search-combobox"
      clearable
      label="소요 시간"
      :items="['10~15분', '15~20분', '20~25분']"
      variant="outlined"
    ></v-combobox>
    <v-combobox
      class="rtn-search-combobox"
      clearable
      label="운동 난이도"
      :items="['초급', '초중급', '중급', '중고급', '고급']"
      variant="outlined"
    ></v-combobox>
    <button class="bg-gray-200">찾기</button>
  </div>
</template>

<script setup></script>

<style scoped>
.rtn-search-combobox {
  width: 10rem;
  margin-right: 5px;
  height: 56px;
}
</style>
