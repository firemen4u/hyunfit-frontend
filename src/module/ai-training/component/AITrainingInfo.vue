<template>
  <div>
    <div class="ai-training-info">
      <span class="info"> </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  info: String,
})
</script>
<style scoped>
.info {
  color: transparent;
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(111deg, rgb(133, 0, 38) 8%, rgb(249, 76, 16) 93%);
  -webkit-background-clip: text; /* 텍스트에 그라데이션을 적용하기 위해 필요한 속성입니다. */
  background-clip: text;
}
</style>
