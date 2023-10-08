<template>
  <v-dialog class="modal" @update:modelValue="clearInput()">
    <div class="modal-inner bg-white text-center rounded-lg">
      <div class="modal-content">
        <div class="modal-wrap">
          <div class="items-center align-middle">
            <p class="text-2xl font-bold">이번 클래스는 어떠셨나요?</p>
            <div class="mt-3 mb-3">
              <div>
                <div class="d-flex flex-column align-center justify-center">
                  <BaseRating
                    icon-size="xl"
                    class="ma-2"
                    v-model="ptReviewRatings"
                  />
                </div>
                <div class="flex justify-center items-center pl-2">
                  <BaseReviewChipSelector v-model="ptReviewOptionSelected" />
                </div>
              </div>
              <div class="flex flex-col items-center mt-3 mb-3 px-4">
                <v-textarea
                  v-model="reviewText"
                  class="w-full rounded-lg"
                  variant="solo"
                  flat
                  no-resize
                  bg-color="#f4f3f6"
                  placeholder="리뷰 작성하기 &#10;트레이너와의 클래스가 어땠는지 작성해주세요!"
                ></v-textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <v-btn
          @click="confirmReview"
          color="primary"
          class="rounded-lg text-center items-center"
          size="large"
          :disabled="disabled"
        >
          리뷰 등록하기
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>
<script setup>
import { computed, ref } from 'vue'
import { BaseRating } from '/src/module/@base/components'
import ApiClient from '/src/services/api.js'
import BaseReviewChipSelector from '@/module/@base/components/BaseReviewChipSelector.vue'

const props = defineProps({
  modalActive: Object,
  responseData: Object,
  targetSeq: Number,
})
let ptReviewOptionSelected = ref([])
let ptReviewRatings = ref(null)
const reviewText = ref('')
const emits = defineEmits(['action:cancel', 'action:save'])

const clearInput = () => {
  ptReviewOptionSelected.value = []
  ptReviewRatings.value = 0
  reviewText.value = ''
}

const disabled = computed(
  () => !(reviewText.value.trim() !== '') || !ptReviewRatings.value
)

async function confirmReview() {
  try {
    const data = {
      ptSeq: props.targetSeq.value,
      ptrStickers: ptReviewOptionSelected.value.join(','),
      ptrContent: reviewText.value,
      ptrRating: ptReviewRatings.value,
    }
    await ApiClient.post(`/personal-trainings/${props.targetSeq}/review`, data)
    emits('action:save')
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}
</script>

<style scoped>
.modal {
}

.modal-inner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 670px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 32px 16px;
}

&:hover {
  color: rgb(210, 51, 97);
}
</style>
