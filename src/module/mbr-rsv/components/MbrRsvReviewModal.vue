<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal" @click="close">
      <transition name="modal-animation-inner">
        <div
          v-show="modalActive"
          class="modal-inner text-center rounded-lg"
          @click.stop
        >
          <i @click="close" class="far fa-times-circle"></i>
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
      </transition>
    </div>
  </transition>
</template>
<script setup>
import { ref } from 'vue'
import { BaseRating, BaseChipGroup } from '/src/module/@base/components'
import { ptReviewOptions } from '@/module/mbr-rsv/stores/mbrRsvCommon'
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
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
  emits('action:save')
}
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 64px 16px;

    i {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: rgb(210, 51, 97);
      }
    }
  }
}
</style>
