<template>
  <svg
    fill="#000000"
    height="200px"
    width="200px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 60 60"
    xml:space="preserve"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path
          d="M56,43.832c-0.43-4.107-3.853-7.332-7.954-7.332c-2.565,0-4.984,1.286-6.479,3.402c-0.292-0.051-0.588-0.076-0.884-0.076 c-2.32,0-4.381,1.577-5.066,3.813C33.709,44.77,32.5,46.88,32.5,49.142c0,3.506,2.785,6.358,6.208,6.358h10.774 c0.063,0,0.124-0.004,0.172-0.008c0.062,0.004,0.124,0.008,0.188,0.008h4.31c3.225,0,5.849-2.687,5.849-5.989 C60,46.911,58.358,44.638,56,43.832z M54.151,53.5L49.8,53.497l-0.186-0.006L38.708,53.5c-2.32,0-4.208-1.955-4.208-4.358 c0-1.666,0.948-3.21,2.417-3.935l0.435-0.214l0.102-0.475c0.331-1.56,1.689-2.692,3.229-2.692c0.344,0,0.687,0.057,1.019,0.169 l0.777,0.261l0.409-0.711c1.096-1.906,3.023-3.045,5.158-3.045c3.265,0,5.955,2.747,5.999,6.123l0.011,0.813l0.799,0.155 C56.677,45.946,58,47.594,58,49.511C58,51.71,56.273,53.5,54.151,53.5z"
        ></path>
        <path
          d="M25.537,19.656c-0.31-0.195-0.698-0.208-1.019-0.033C24.199,19.799,24,20.135,24,20.5v14c0,0.365,0.199,0.701,0.519,0.877 C24.669,35.459,24.835,35.5,25,35.5c0.187,0,0.373-0.053,0.537-0.156l11-7C36.825,28.16,37,27.842,37,27.5s-0.175-0.66-0.463-0.844 L25.537,19.656z M26,32.679V22.321l8.138,5.179L26,32.679z"
        ></path>
        <path
          d="M26,48.5H12v-10v-11v-11v-10h34v10v11c0,0.553,0.447,1,1,1h9v6c0,0.553,0.447,1,1,1s1-0.447,1-1v-7v-11v-11 c0-0.553-0.447-1-1-1H47H11H1c-0.553,0-1,0.447-1,1v11v11v11v11c0,0.553,0.447,1,1,1h10h15c0.553,0,1-0.447,1-1 S26.553,48.5,26,48.5z M10,26.5H2v-9h8V26.5z M2,28.5h8v9H2V28.5z M48,26.5v-9h8v9H48z M56,6.5v9h-8v-9H56z M2,6.5h8v9H2V6.5z M2,48.5v-9h8v9H2z"
        ></path>
      </g>
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
