<template>
  <div class="feedback-box">
    <div class="" style="white-space: pre-line">
      {{ feedbackContent }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feedbackContent: String,
    responsetrnName: String,
  },
  data() {
    return {}
  },
}
</script>

<style scoped></style>
