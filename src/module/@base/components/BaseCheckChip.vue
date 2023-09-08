<template>
  <v-btn
    :ripple="false"
    variant="flat"
    height="25"
    @click="toggleChip"
    class="check-chip"
    rounded
    :color="active ? 'primary' : ''"
  >
    <div
      class="text-xs text-neutral-600 tracking-wide"
      :class="active ? 'text-white font-medium' : ''"
    >
      {{ label }}
    </div>
  </v-btn>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  label: String,
})
const active = ref(false)
const toggleChip = () => {
  active.value = !active.value
}
</script>

<style>
.check-chip {
  border: 1px solid #d23361;
}
.check-chip:hover {
  background-color: #ffffff; /* Change this to your desired hover color */
  color: #ffffff; /* Change the text color as needed */
}
.check-chip.v-btn--size-default {
  min-width: auto;
  padding: 2px 10px;
}
</style>
