<template>
  <v-text-field
    label="찾으시는 클래스가 있나요?"
    single-line
    hide-details
    clearable
    flat
    @keyup.enter="search"
    :disabled="loading"
    type="text"
    bg-color="#F8F8F8"
    variant="solo"
  >
    <template v-slot:append-inner>
      <button @click="search" class="p-2">
        <SearchSvg :size="30" color="#AAAAAA" />
      </button>
    </template>
  </v-text-field>
</template>

<script setup>
import SearchSvg from '@/module/@base/svg/SearchSvg.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click:search'])

function search() {
  emit('click:search')
}
</script>
<style scoped></style>
