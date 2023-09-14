<template>
  <div class="feedback-box mt-14 mb-20">
    <div class="m-10 flex justify-center">
      {{ feedbackContent }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feedbackContent: String,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.feedback-box {
  width: 800px;
  min-height: 300px;
  height: auto;
  box-shadow: 1px 3px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
