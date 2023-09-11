<template>
  <div>
    <button @click="showDetail = true">상세 정보 표시</button>
    <ReservaionDetailModal :show="showDetail" @close="showDetail = false" />
  </div>
</template>

<script>
import ReservaionDetailModal from '/src/module/boptrsv/component/ReservationDetailModal.vue'

export default {
  components: {
    ReservaionDetailModal,
  },
  data() {
    return {
      showDetail: false,
    }
  },
}
</script>
