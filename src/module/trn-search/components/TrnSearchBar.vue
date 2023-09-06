<template>
    <v-card-text color="grey-lighten-3" class="pa-0" max-width="100%">
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="나를 위한 서비스 검색하기"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        clearable
        @click:append-inner="onClick"
        v-model="searchText"
      ></v-text-field>
    </v-card-text>
</template>

<script setup>
import { ref } from 'vue'

const loaded = ref(false);
const loading = ref(false);
const searchText = ref();

const onClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
    console.log(searchText.value);
  },);
};
</script>
<style scope>

</style>