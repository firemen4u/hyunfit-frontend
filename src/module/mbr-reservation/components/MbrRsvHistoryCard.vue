<template>
  <div class="mbr-rsv-history-card m-2 mb-5 p-2">
    <div class="flex items-center">
      <div
        class="h-10 w-10 rounded-full bg-cover mr-4"
        :style="`background-image: url('${profileImageUrl}')`"
        title="trainer profile img"
      ></div>
      <div class="flex-col">
        <div class="text-xl font-bold">{{ trainerName }}</div>
        <div class="text-base flex text-gray-500">
          <p>{{ `${day}    |    ${time}` }}</p>
        </div>
      </div>
    </div>

    <div
      class="card-in-card border border-3 border-solid border-gray-600 mt-3 p-5 rounded-md shadow-md"
    >
      <div class="flex justify-between">
        <div class="flex">
          <div>{{ type }}</div>
          <div class="ml-3">
            <BaseRating :rating="5"></BaseRating>
          </div>
        </div>
        <div>
          <MbrRsvReviewModal
            @close="toggleModal"
            :modalActive="modalActive"
          ></MbrRsvReviewModal
          ><button
            class="insert-review-modal text-primary mb-2"
            @click="toggleModal"
            type="button"
          >
            리뷰 작성 하기
          </button>
        </div>
      </div>

      <div class="flex justify-between text-gray-500">
        <div>{{ subTitle }}</div>
        <div>{{ props.ptCounts }}번째 수업 완료</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BaseRating } from '/src/module/@base/components'
import MbrRsvReviewModal from '/src/module/mbr-reservation/components/MbrRsvReviewModal.vue'
// const props = defineProps({
//   profileImageUrl: String,
//   trainerName: String,
//   day: String,
//   time: String,
//   type: String,
//   subTitle: String,
//   ptCount: Number,
// })

const props = defineProps({
  responseData : Object,
})

const showReviewModal = ref(false)

const openReviewModal = () => {
  showReviewModal.value = true
}

const closeReviewModal = () => {
  showReviewModal.value = false
}

const modalActive = ref(false)

const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
