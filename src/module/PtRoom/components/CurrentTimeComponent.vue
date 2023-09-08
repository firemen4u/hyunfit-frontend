<template>
  <p class="font-bold text-xl text-white">{{ currentTime }}</p>
</template>

<script>
export default {
  data() {
    return {
      currentTime: '',
    }
  },
  mounted() {
    this.getCurrentDateTime()
    setInterval(() => {
      this.getCurrentDateTime()
    }, 60000)
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date()
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
      }

      this.currentTime = now.toLocaleTimeString('ko-KR', timeOptions)
    },
  },
}
</script>
