<template>
  <div class="rating">
    <template v-for="i in maxStars" :key="i">
      <span
        class="star"
        @mouseenter="hover(i)"
        @click="rate(i)"
        @mouseleave="reset"
      >
        <svg
          class="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            v-if="i <= currentRating"
            d="M12 2c-.1 0-.2 0-.3.1l-7.2 2.1-1.9-6.5c-.1-.4-.6-.6-1-.5-.4.1-.6.6-.5 1l1.9 6.5-7.2 2.1c-.4.1-.6.6-.5 1s.6.6 1 .5l7.5-2.2 7.5 2.2c.2.1.5.1.7.1.3 0 .6-.1.9-.2.4-.1.7-.5.8-.9.1-.4-.1-.8-.5-1l-1.9-6.5 7.2-2.1c.4-.1.7-.5.8-.9.1-.4-.1-.8-.5-1-.2-.1-.5-.1-.7-.1z"
          />
          <path
            v-else
            d="M22.1 8.3l-7.2-2.1-1.9-6.5c-.1-.4-.6-.6-1-.5s-.6.6-.5 1l1.9 6.5-7.2 2.1c-.4.1-.6.6-.5 1s.6.6 1 .5l7.5-2.2 7.5 2.2c.2.1.5.1.7.1.3 0 .6-.1.9-.2.4-.1.7-.5.8-.9.1-.4-.1-.8-.5-1z"
          />
        </svg>
      </span>
    </template>
    <p>하이</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const maxStars = 5
const currentRating = ref(0)

const rate = rating => {
  currentRating.value = rating
}

const hover = rating => {
  currentRating.value = rating
}

const reset = () => {
  if (currentRating.value === 0) return
  currentRating.value = 0
}
</script>

<style scoped>
.rating {
  display: flex;
  cursor: pointer;
}

.star {
  margin: 0.2rem;
}

.star svg {
  transition: fill 0.2s;
}

.star:hover svg,
.star:hover ~ .star svg {
  fill: gold;
}
</style>
