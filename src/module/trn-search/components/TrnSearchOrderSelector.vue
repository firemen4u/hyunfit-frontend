<script setup></script>

<template>
  <v-select
    class="w-52"
    single-line
    label="Select"
    :items="[
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Texas',
      'Wyoming',
    ]"
    variant="solo"
    append-icon="none"
    density="compact"
  >
    <template v-slot:append-inner><div /> </template>
  </v-select>
</template>

<style scoped></style>
