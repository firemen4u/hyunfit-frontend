<template>
  <span
    class="flex items-center whitespace-nowrap rounded-sm px-1 py-1 text-center text-[0.75em] font-bold leading-none"
    :style="{ color: getColor(), backgroundColor: getBgColor() }"
  >
    <slot></slot>
  </span>
</template>
<script setup>
const props = defineProps({
  color: String,
})

function getColor() {
  return props.color || '#737373'
}
function getBgColor() {
  return props.color ? props.color + '10' : '#73737310'
}
</script>
