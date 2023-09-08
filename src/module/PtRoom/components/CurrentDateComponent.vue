<template>
  <p class="font-bold text-xl text-white">{{ currentDate }}</p>
</template>

<script>
export default {
  data() {
    return {
      currentDate: '',
    }
  },
  mounted() {
    this.getCurrentDateTime()
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date()
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

      this.currentDate = now.toLocaleDateString('ko-KR', dateOptions)
    },
  },
}
</script>
