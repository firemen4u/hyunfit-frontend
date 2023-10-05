<template>
  <div class="mbr-rsv-history-card mb-10">
    <div class="flex items-center">
      <div
        class="h-14 w-14 rounded-full bg-cover ml-1 mr-4 cursor-pointer"
        :style="`background-image: url('${props.responseData.trnProfileUrl}')`"
        title="trainer profile img"
        @click="gotoTrnDetail(responseData.trnId)"
      ></div>
      <div class="flex-col">
        <div class="flex items-baseline justify-between">
          <div
            class="text-xl font-black hover:underline hover:cursor-pointer mr-2"
            @click="gotoTrnDetail(responseData.trnId)"
          >
            {{ props.responseData.trnName }}
          </div>
          <div class="text-gray-600">
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
          </div>
        </div>
        <div v-if="responseData.ptReservationStatus == 3" class="text-gray-600">
          {{ props.responseData.ptCounts }}번째 클래스 완료
        </div>
        <div v-else class="text-[#800000]">
          <div v-if="responseData.ptReservationStatus == 4">취소한 클래스</div>
          <div v-if="responseData.ptReservationStatus == 5">결석한 클래스</div>
        </div>
      </div>
    </div>

    <div
      v-if="responseData.ptReservationStatus == 3"
      class="card-in-card bg-white mt-3 p-5 rounded-md border"
    >
      <div v-if="props.responseData.ptrRating != null" class="">
        <div class="flex justify-between mb-1">
          <div class="flex">
            <div v-if="props.responseData.ptrRating" class="flex flex-col">
              <div class="font-bold text-lg">
                {{ props.responseData.trnTypeName }}
              </div>
              <div class="flex">
                <BaseRating
                  class="mr-2"
                  icon-size="sm"
                  :modelValue="props.responseData.ptrRating"
                  readonly
                />
                <div class="text-lg text-gray-600">
                  {{
                    `${dateUtil.formatDateWithOptions(
                      props.responseData.ptrCreationDate,
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour12: false,
                      }
                    )}`
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="
            props.responseData.ptrRating != null &&
            props.responseData.ptReservationStatus == 3
          "
          class="flex justify-between text-gray-500"
        >
          <div class="flex-col mt-2">
            {{ props.responseData.ptrContent }}
            <div class="mt-4 flex justify-between">
              <BaseReviewStickerGroup
                :stickers="props.responseData?.ptrStickers"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <v-btn
          @click="toggleModal"
          @close="getReviews"
          color="primary"
          :ripple="false"
          variant="text"
          size="large"
        >
          <div>리뷰 작성하기</div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BaseRating } from '/src/module/@base/components'
import dateUtil from '/src/utils/date.js'
import ApiClient from '/src/services/api.js'
import BaseReviewStickerGroup from '@/module/@base/components/BaseReviewStickerGroup.vue'
import router, { pathNames } from '@/router'

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
      { params: paramsReserved }
    )
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}
async function gotoTrnDetail(trnId) {
  await router.push(pathNames.trnDetailPage.with({ trnId }))
}
</script>
