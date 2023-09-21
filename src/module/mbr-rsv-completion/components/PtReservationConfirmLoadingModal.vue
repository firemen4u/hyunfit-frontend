<script setup>
const props = defineProps({
  failureReason: String,
})
const emit = defineEmits(['click:ok'])

function ok() {
  closing = true
  emit('click:ok')
  setTimeout(() => {
    closing = false
  }, 500)
}
let closing = false
</script>

<template>
  <v-dialog :scrim="false" persistent width="auto">
    <v-card color="primary" v-if="failureReason === '' && !closing">
      <v-progress-linear indeterminate color="white" class="mb-0" />
      <div class="px-10 py-4">예약중이에요... 잠시만 기다려주세요!</div>
    </v-card>
    <v-card
      class="shake px-6 py-4 flex flex-col justify-center items-center"
      color="warning"
      v-else
    >
      <div>예약에 실패했습니다.</div>
      <div>같은 증상이 반복될 시 관리자에게 문의바랍니다.</div>
      <div class="mt-2">{{ failureReason }}</div>
      <v-btn @click="ok" class="w-full mt-3"
        ><div class="text-black">확인</div></v-btn
      >
    </v-card>
  </v-dialog>
</template>

<style scoped>
.shake {
  animation: shake 150ms 2 linear;
  -moz-animation: shake 150ms 2 linear;
  -webkit-animation: shake 150ms 2 linear;
  -o-animation: shake 150ms 2 linear;
}

@keyframes shake {
  0% {
    transform: translate(3px, 0);
  }
  50% {
    transform: translate(-3px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@-moz-keyframes shake {
  0% {
    -moz-transform: translate(3px, 0);
  }
  50% {
    -moz-transform: translate(-3px, 0);
  }
  100% {
    -moz-transform: translate(0, 0);
  }
}

@-webkit-keyframes shake {
  0% {
    -webkit-transform: translate(3px, 0);
  }
  50% {
    -webkit-transform: translate(-3px, 0);
  }
  100% {
    -webkit-transform: translate(0, 0);
  }
}

@-ms-keyframes shake {
  0% {
    -ms-transform: translate(3px, 0);
  }
  50% {
    -ms-transform: translate(-3px, 0);
  }
  100% {
    -ms-transform: translate(0, 0);
  }
}

@-o-keyframes shake {
  0% {
    -o-transform: translate(3px, 0);
  }
  50% {
    -o-transform: translate(-3px, 0);
  }
  100% {
    -o-transform: translate(0, 0);
  }
}
</style>
