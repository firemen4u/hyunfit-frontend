<template>
  <p class="font-bold text-xl text-white">{{ formattedTime }}</p>
</template>

<script>
export default {
  data() {
    return {
      ressoningTime: 0,
    }
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.ressoningTime / 3600)
      const minutes = Math.floor((this.ressoningTime % 3600) / 60)
      const seconds = this.ressoningTime % 60

      const formattedHours = hours.toString().padStart(2, '0')
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    },
  },
  mounted() {
    setInterval(() => {
      this.ressoningTime += 1
    }, 1000)
  },
}
</script>
