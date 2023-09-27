<script setup>
import SkipSvg from "@/module/@base/svg/SkipSvg.vue";

const emit = defineEmits(['click'])
</script>
<template>
  <div class="fixed z-[10] bottom-20 right-20">
    <v-btn size="x-large" style="background-color: rgba(41, 41, 41, 0.8); width: 200px;" @click="emit('click')">
      <v-icon class="icon-custom">
        <SkipSvg></SkipSvg>
      </v-icon>
      <div class="skip-text font-extrabold text-blue-50">Skip 다음</div>
    </v-btn>
  </div>
</template>

<style scoped>
.icon-custom {
  width: 10px;
  height: 10px;
  margin-right: 40px;
}


</style>
