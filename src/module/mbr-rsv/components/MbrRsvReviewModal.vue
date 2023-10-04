<template>
  <v-dialog class="modal">
    <div
        class="modal-inner bg-white text-center rounded-lg"
    >
      <div class="modal-content">
        <div class="modal-wrap">
          <div class="items-center align-middle">
            <p class="text-2xl font-bold mb-6">오늘 수업은 어떠셨나요??</p>
            <div
                class="sticker-container flex justify-center items-center pl-2"
            >
              <BaseChipGroup
                  v-model="ptReviewOptionSelected"
                  :items="ptReviewOptions"
                  :disabled="false"
                  :filter="true"
                  style="width: 85%; margin-left: 50px"
              />
            </div>
            <div class="mt-3 mb-3">
              <div>
                <div class="d-flex flex-column align-center justify-center">
                  <BaseRating
                      icon-size="xl"
                      class="ma-2"
                      v-model="ptReviewRatings"
                  />
                </div>
              </div>
              <div class="flex flex-col items-center mt-3 mb-3">
                <v-textarea
                    v-model="reviewText"
                    class="w-full rounded-lg"
                    id="fd"
                    variant="solo"
                    placeholder="리뷰 작성하기 &#10;트레이너와의 수업이 어땠는지 작성해주세요!"
                ></v-textarea>
                <p v-if="showError" style="color: red">
                  리뷰를 작성해야 등록할 수 있습니다.
                </p>
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
        >
          리뷰 등록하기
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>
<script setup>
import {ref} from 'vue'
import {BaseRating, BaseChipGroup} from '/src/module/@base/components'
import {ptReviewOptions} from '@/module/mbr-rsv/stores/mbrRsvCommon'
import ApiClient from '/src/services/api.js'

const textValue = ref('') // textarea의 값을 저장할 변수
const showError = ref(false) // 오류 메시지를 표시할지 여부를 결정하는 변수

const submitReview = () => {
  // 텍스트 값이 비어 있으면 오류를 표시하고 리턴
  if (!textValue.value.trim()) {
    showError.value = true
    return
  }

  showError.value = false
  // 여기에 등록 로직을 작성하면 됩니다.
  console.log('리뷰가 등록되었습니다:', textValue.value)
}

const props = defineProps({
  modalActive: Object,
  responseData: Object,
  targetSeq: Number,
})

let ptReviewOptionSelected = ref([])
let ptReviewRatings = ref([])
const reviewText = ref('')
const emits = defineEmits(['action:cancel', 'action:save'])

const close = () => {
  ptReviewOptionSelected.value = ''
  ptReviewRatings.value = ''
  reviewText.value = ''
  emits('action:cancel')
}

async function confirmReview() {
  try {
    const data = {
      ptSeq: props.targetSeq.value,
      ptrStickers: ptReviewOptionSelected.value.join(','),
      ptrContent: reviewText.value,
      ptrRating: ptReviewRatings.value,
    }
    let result = await ApiClient.post(
        `/personal-trainings/${props.targetSeq}/review`,
        data
    )

    console.log("리뷰 result", result)
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
  emits('action:save')
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
  max-width: 640px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  padding: 64px 16px;
}

&:hover {
  color: rgb(210, 51, 97);
}
</style>
