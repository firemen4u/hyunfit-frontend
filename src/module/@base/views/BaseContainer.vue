<script setup>
import { BaseHeader, BaseFooter } from '/src/module/@base/components'
import MainFooter from '@/module/main/components/MainFooter.vue'
const props = defineProps({
  noheader: Boolean,
  nofooter: Boolean,
  category: String,
  loading: Boolean,
})
</script>
<template>
  <BaseHeader v-if="!noheader" :category="category" />

  <div ref="app" class="w-100" :class="category ? 'bo-background' : ''">
    <div class="base-loader fixed mt-[64px] w-full z-[5]">
      <v-progress-linear
        :active="loading"
        height="5"
        :indeterminate="loading"
        :color="'#a0bbff'"
      ></v-progress-linear>
    </div>
    <main
      class="d-flex flex-column justify-center align-center w-100"
      :class="!noheader ? 'mt-16' : ''"
      style="contain: paint"
    >
      <slot></slot>
      <MainFooter v-if="!nofooter" />
    </main>
  </div>
</template>

<style>
.bo-background {
  background-image: url('https://i.etsystatic.com/29035216/r/il/7e7e20/3640388699/il_1080xN.3640388699_sg0x.jpg');
  background-size: contain;
  background-color: #2f3237;
  background-repeat: repeat-y;
  position: relative;
}

.bo-background::before {
  content: '';
  position: absolute;
  top: 70%;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 0),
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 1)
  );
}
</style>
