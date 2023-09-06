<script setup>
// import { RouterView } from 'vue-router'

import TrnSearchPage from './module/trn-search/views/TrnSearchPage.vue';
import BasePage from '@/module/@base/views/BasePage.vue'
import MainPage from '@/module/main/views/MainPage.vue'
</script>

<template>
  <BasePage>
    <!-- <MainPage></MainPage> -->
    <TrnSearchPage></TrnSearchPage>
  </BasePage>
</template>