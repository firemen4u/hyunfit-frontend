<script setup>
import RefreshSvg from '@/module/@base/svg/RefreshSvg.vue'

const emit = defineEmits(['reset'])
function resetFilter(e) {
  e.target.closest('button').classList.add('clicked')
  emit('reset')
  setTimeout(() => {
    e.target.closest('button').classList.remove('clicked')
  }, 300)
}
</script>
<template>
  <div class="container">
    <div class="flex justify-between mb-5 items-end">
      <p class="font-bold text-lg">필터</p>
      <button
        class="reset-btn text-sm flex items-center px-2"
        @click="resetFilter"
      >
        <span class="mr-1 text-gray-600">초기화</span>
        <RefreshSvg size="14" color="#4B5563" />
      </button>
    </div>
    <slot></slot>
  </div>
</template>
<style scoped>
.reset-btn {
  opacity: 50%;
  transition: opacity 0.2s ease-in-out;
}
.reset-btn:hover {
  opacity: 100%;
}
.reset-btn.clicked {
  animation: clickAnimation 0.3s ease; /* 애니메이션 적용 */
  transform-origin: center;
}

@keyframes clickAnimation {
  0% {
    transform: scale(1); /* 초기 크기 */
  }
  50% {
    transform: scale(0.9); /* 0.1 작아짐 */
  }
  100% {
    transform: scale(1); /* 원래 크기로 복원 */
  }
}
</style>
