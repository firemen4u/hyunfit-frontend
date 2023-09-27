<template>
  <div class="mbr-rsv-history-card m-2 mb-5 p-2">
    <div class="flex items-center">
      <div
          class="h-10 w-10 rounded-full bg-cover mr-4"
          :style="`background-image: url('${props.responseData.trnProfileUrl}')`"
          title="trainer profile img"
      ></div>
      <div class="flex-col">
        <div class="text-xl font-bold">
          {{ props.responseData.trnName }}
        </div>
        <div class="text-base flex text-gray-500">
          <p>
            {{
              `${dateUtil.formatDateWithOptions(
                  props.responseData.ptReservationDate,
                  {
                    month: 'numeric',
                    day: 'numeric',
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
              )}`
            }}
          </p>
        </div>
      </div>
    </div>
    <div
        class="card-in-card border border-3 border-solid border-gray-600 mt-3 p-5 rounded-md shadow-md"
    >
      <div class="flex justify-between mb-1">
        <div class="flex">
          <div class="text-xl font-extrabold">
            {{ props.responseData.trnTypeName }}
          </div>
          <div
              v-if="
              props.responseData.ptrRating != null &&
              props.responseData.ptReservationStatus == 3
            "
              class="ml-3 -z-10"
          >
            <BaseRating
                icon-size="sm"
                :modelValue="props.responseData.ptrRating"
                readonly
                class="-z-10"
            />
          </div>
        </div>
        <div v-if="props.responseData.ptrRating == null">
          <button
              class="insert-review-modal text-primary mb-2"
              @click="toggleModal"
              @close="getReviews"
              type="button"
          >
            리뷰 작성하기
          </button>
        </div>
        <div v-if="props.responseData.ptrRating != null">
          <button
              class="insert-review-modal text-primary mb-2"
              @click="toggleModal"
              @close="getReviews"
              type="button"
          >
            리뷰 상세보기
          </button>
        </div>
      </div>
      <div
          v-if="props.responseData.ptrRating == null"
          class="flex justify-between text-gray-500"
      ></div>
      <div
          v-if="
          props.responseData.ptrRating != null &&
          props.responseData.ptReservationStatus == 3
        "
          class="flex justify-between text-gray-500"
      >
        <div class="w-5/6 flex-col mt-2">
          {{ props.responseData.ptrContent }}
          <div class="mt-4 flex justify-between">
            <ReviewStickerGroup :stickers="props.responseData?.ptrStickers"/>
          </div>
        </div>
        <div class="flex flex-col justify-between">
          <div class="text-right">
            {{ props.responseData.ptCounts }}번째 수업 완료
          </div>
          <div class="self-end">
            {{
              `${dateUtil.formatDateWithOptions(
                  props.responseData.ptrCreationDate,
                  {
                    month: 'numeric',
                    day: 'numeric',
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  }
              )}`
            }}
          </div>
        </div>
      </div>
      <!-- 예약이 취소 된 경우 -->
      <div
          v-if="
          props.responseData.ptrRating != null &&
          props.responseData.ptReservationStatus == 4
        "
          class="flex justify-between text-gray-500"
      >
        <div class="w-5/6 flex-col mt-2">
          취소 사유 : {{ props.responseData.ptCancellationReason }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {BaseRating} from '/src/module/@base/components'
import dateUtil from '/src/utils/date.js'
import ApiClient from '/src/services/api.js'
import ReviewStickerGroup from '@/module/trn-detail/components/TrnDetailReviewStickerGroup.vue'

const emit = defineEmits(['toggleModal'])
const props = defineProps({
  responseData: Object,
})

let updatedReviews = ref('')

const toggleModal = () => {
  emit('toggleModal')
}

function getReviews() {
  try {
    const paramsReserved = {
      page: 1,
      order: 'desc',
      ptReservationStatus: 0,
    }
    updatedReviews.value = ApiClient.get(
        `/members/${props.responseData.mbrSeq}/personal-trainings`,
        {params: paramsReserved}
    )
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}
</script>
