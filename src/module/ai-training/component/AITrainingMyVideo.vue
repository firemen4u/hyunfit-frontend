<template>
  <div
    class="my-video bg-orange-200"
    :class="props.myVideoStatus === 'FULL' ? 'w-full' : 'w-1/2'"
  ></div>
</template>
<script setup>
console.log('myVideo : ' + props.myVideoStatus)
const props = defineProps({
  myVideoStatus: Number,
})

console.log('In My Video : ' + props.myVideoStatus)
</script>
<style scoped></style>
