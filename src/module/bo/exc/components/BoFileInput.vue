<template>
  <v-file-input
    v-model="files"
    color="#d23361"
    counter
    :label="label"
    :prepend-icon="prependIcon"
    variant="solo"
    show-size="1000"
  >
    <template v-slot:selection="{ fileNames }">
      <template v-for="(fileName, index) in fileNames" :key="fileName">
        <v-chip
          v-if="index < 2"
          color="#d23361"
          label
          size="small"
          class="me-2"
        >
          {{ fileName }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="text-overline text-grey-darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </template>
  </v-file-input>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  label: String,
  prependIcon: String,
})

const files = ref([])
</script>
<style scoped>
.v-input__details > .v-icon,
.v-input__prepend > .v-icon,
.v-input__append > .v-icon {
  font-size: 299px;
  opacity: var(--v-medium-emphasis-opacity);
}
</style>

