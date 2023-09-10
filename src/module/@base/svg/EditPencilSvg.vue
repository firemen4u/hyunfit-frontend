<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" focusable="false">
    <path
      d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"
      :fill="getColor()"
    ></path>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: Number,
  color: String,
})

function getColor() {
  if (props.color) {
    return props.color
  } else return '#000000'
}
</script>
