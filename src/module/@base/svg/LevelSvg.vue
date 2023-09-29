<template>
  <svg
    :height="size"
    :width="size"
    viewBox="0 0 48 48"
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
        d="M24 42L4 18.5L9.69488 6L38.3051 6L44 18.5L24 42Z"
        fill="#ee3f3f"
        stroke="#1e1e1e"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M32 18L24 27L16 18"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: Number,
})
</script>
