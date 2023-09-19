<script setup>
let times = [
  { displayText: '오전 7:00', value: '07:00' },
  { displayText: '오전 8:00', value: '08:00' },
  { displayText: '오전 9:00', value: '09:00' },
  { displayText: '오전 10:00', value: '10:00' },
  { displayText: '오전 11:00', value: '11:00' },
  { displayText: '오후 12:00', value: '12:00' },
  { displayText: '오후 1:00', value: '13:00' },
  { displayText: '오후 2:00', value: '14:00' },
  { displayText: '오후 3:00', value: '15:00' },
  { displayText: '오후 4:00', value: '16:00' },
  { displayText: '오후 5:00', value: '17:00' },
  { displayText: '오후 6:00', value: '18:00' },
  { displayText: '오후 7:00', value: '19:00' },
  { displayText: '오후 8:00', value: '20:00' },
  { displayText: '오후 9:00', value: '21:00' },
]

const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  reservedTimeslots: Array,
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div
    class="trn-detail-timeslot-container grid grid-cols-3 gap-y-2 justify-between justify-items-center"
  >
    <v-btn
      v-for="(t, idx) in times"
      :key="idx"
      :ripple="false"
      variant="flat"
      height="32"
      class="w-20"
      :value="t.value"
      @click="$emit('update:modelValue', t.value)"
      :color="modelValue === t.value ? 'primary' : ''"
      :disabled="props.disabled || props.reservedTimeslots?.includes(t.value)"
    >
      <div
        class="btn-content text-xs text-neutral-600 tracking-wide"
        :class="modelValue === t.value ? 'text-white font-black' : ''"
      >
        {{ t.displayText }}
      </div>
    </v-btn>
  </div>
</template>

<style>
.trn-detail-timeslot-container .v-btn.v-btn--disabled {
  color: white;
  background-color: rgba(241, 241, 241, 0.65);
}
.trn-detail-timeslot-container .v-btn.v-btn--disabled .btn-content {
  color: #b4b4b4;
}
</style>
