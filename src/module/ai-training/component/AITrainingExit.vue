<template>
  <!-- Info -->
  <div class="ai-training-info-container">
    <div class="ai-training-info">
      <span class="info">{{ exerciseName }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  exerciseName: String,
})
</script>
<style scoped>
.info {
  color: transparent;
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(111deg, rgb(133, 0, 38) 8%, rgb(249, 76, 16) 93%);
  -webkit-background-clip: text;
  background-clip: text;
}
.ai-training-info-container {
  position: absolute;

  width: 100%;
  height: 100%;
  background-color: rgb(102, 102, 102);
}
.ai-training-info {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
}
</style>
