<template>
  <div class="fixed bottom-20 left-50 flex items-center justify-center w-full">
    <div class="rounded overflow-hidden">
      <v-btn
        class="item"
        :color="debugMode ? 'red' : ''"
        @click="emit('event:toggleDebug')"
        rounded="0"
        size="large"
      >
        <div class="text-white">Debug</div>
      </v-btn>
      <v-btn class="item" rounded="0" size="large">
        <v-icon class="button">
          <SoundSvg></SoundSvg>
        </v-icon>
      </v-btn>
      <v-btn
        class="item"
        :color="pauseTime ? 'red' : ''"
        @click="emit('event:pause')"
        rounded="0"
        size="large"
      >
        <v-icon class="button">
          <PauseSvg></PauseSvg>
        </v-icon>
      </v-btn>
      <v-btn class="item" @click="dialog = true" rounded="0" size="large">
        <v-icon class="button">
          <ExitSvg width="24" height="24" />
        </v-icon>
      </v-btn>
    </div>
  </div>

  <v-dialog v-model="dialog" width="400px">
    <v-card
      class="flex flex-col justify-center items-center p-20 bg-[rgba(0,0,0,0.4)]]"
    >
      <div>
        <v-icon style="margin: 20px; font-size: 100px">
          <AIExitSvg></AIExitSvg>
        </v-icon>
      </div>
      <div>
        <div class="text-h6 font-weight-bold text-center">
          정말로 종료하시겠습니까?<br />
        </div>
        <div class="text-h8 font-weight-medium m-4">
          지금까지 진행하신 운동 기록이 삭제될 수 있습니다. 정말로
          종료하시겠습니까?
        </div>
      </div>
      <v-card-actions class="flex w-full flex-row justify-end">
        <v-btn color="primary" @click="dialog = false">취소하기</v-btn>
        <v-btn color="primary" @click="clickExit()">종료하기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import ExitSvg from '@/module/@base/svg/ExitSvg.vue'
import PauseSvg from '@/module/@base/svg/PauseSvg.vue'
import SoundSvg from '@/module/@base/svg/SoundSvg.vue'
import { ref } from 'vue'
import AIExitSvg from '@/module/@base/svg/WarningSvg.vue'

const props = defineProps({
  pauseTime: Boolean,
  debugMode: Boolean,
})

const emit = defineEmits([
  'event:sound',
  'event:pause',
  'event:exit',
  'event:toggleDebug',
])

import router, { pathNames } from '@/router'

const goToMainPage = () => {
  router.push(pathNames.mainPage)
}

function clickExit() {
  console.log('click')
  emit('event:exit')
  goToMainPage()
}

const dialog = ref(false)
</script>
<style scoped>
.button {
  font-size: 24px;
  border-color: white;
}

.item {
  background-color: rgba(41, 41, 41, 0.8);
  border-color: white;
}
</style>
