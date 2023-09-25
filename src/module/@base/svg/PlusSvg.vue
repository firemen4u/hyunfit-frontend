<template>
  <svg
    :height="size"
    :width="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M4 12H20M12 4V20"
        :stroke="getColor()"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
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
