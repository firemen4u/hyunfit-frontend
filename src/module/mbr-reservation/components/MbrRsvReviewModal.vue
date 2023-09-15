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
          <!-- Modal Content -->
          <div class="modal-content">
            <div class="modal-wrap">
              <div class="items-center align-middle">
                <p class="text-2xl font-bold mb-6">오늘 수업은 어떠셨나요??</p>
                <div class="sticker-container">
                  <BaseCheckChip
                    class="mr-2 mb-2"
                    v-for="(option, index) in options"
                    :key="index"
                    :label="option"
                  />
                </div>
                <div class="mt-5 mb-3">
                  <div>
                    <div class="d-flex flex-column align-center justify-center">
                      <v-rating
                        v-model="rating"
                        class="ma-2"
                        density="compact"
                        hover
                      ></v-rating>
                    </div>
                  </div>
                  <div class="flex flex-col items-center mt-3 mb-3">
                    <textarea
                      v-model="reviewText"
                      class="w-full h-48 rounded-lg border-solid border-2 border-gray-300 p-4"
                      id="fd"
                      placeholder="리뷰 작성하기 &#10;트레이너와의 수업이 어땠는지 작성해주세요!"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <slot />
          <button @click="submit" type="button" class="rounded-lg">
            리뷰 등록하기
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<!-- <script>
export default {
  props: ['modalActive'],
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }
    const submit = () => {
      // 처리할 로직을 여기에 추가
      emit('submit')
    }
    return { close, submit }
  },
}
</script> -->

<script setup>
import { ref } from 'vue'
import BaseCheckChip from '@/module/@base/components/BaseCheckChip.vue'
</script>

<script>
export default {
  props: ['modalActive', 'cardData'], // cardData 프로퍼티 추가
  data() {
    return {
      options: [
        '운동이 처음이에요',
        '살을 빼고 싶어요',
        '코어를 강화하고 싶어요',
        '부상 이력이 있어요',
        '식단 조언도 함께 받고 싶어요',
      ],
    }
  },
  setup(props, { emit }) {
    const close = () => {
      // 모달이 닫힐 때 reviewText 초기화
      reviewText.value = ''
      emit('close')
    }

    const submit = () => {
      // 모달을 닫기 전에 카드에 있는 정보를 가져옴
      const cardInfo = {
        // trainerName: props.cardData.trainerName,
        // memberName: props.cardData.memberName,
        // reviewRating: props.cardData.reviewRating,
        reviewText: reviewText.value,
      }

      // 카드 정보를 콘솔에 출력
      console.log('Card Information:', cardInfo)

      // 모달을 닫음
      emit('close')

      // 모달이 닫힐 때 reviewText 초기화
      reviewText.value = ''
    }
    const reviewText = ref('')

    return { close, submit, reviewText }
  },
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
        color: crimson;
      }
    }

    button {
      padding: 20px 30px;
      border: none;
      font-size: 16px;
      background-color: crimson;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
