<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { ref, onMounted, computed } from 'vue'
import ApiClient from '/src/services/api.js'
import dateUtils from '/src/utils/date.js'
import BasePagination from '/src/module/@base/components/BasePagination.vue'

// mbrSeq 값을 할당
let memberSeq, memberTotalPoints, memberName
const mevType = '2' // 1: 칼로리, 2: 포인트
const points = ref([])
const perPage = 10
const currentPage = ref(1)

async function getMemberSeq() {
  const response = await ApiClient.get('/members/me')
  console.log(response)
  memberSeq = response.mbrSeq // 또는 mbrSeq, 필드 확인 필요
  memberTotalPoints = response.mbrTotalPoint
  memberName = response.mbrName
}

const totalPages = computed(() => Math.ceil(points.value.length / perPage))
const slicedPoints = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return points.value.slice(start, end)
})

onMounted(async () => {
  await getMemberSeq()
  try {
    console.log(memberSeq, memberTotalPoints)
    const response = await ApiClient.get(
      `/member-event/${memberSeq}/${mevType}`
    )
    points.value = response
    console.log(points.value)
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
})
</script>

<template>
  <BaseContainer>
    <BaseBodyWrapper>
      <!-- 컨텐츠 -->
      <div class="content mt-10">
        <p class="font-bold text-2xl pl-5">포인트 조회</p>
        <div class="px-10">
          <div
            class="flex text-lg bg-primary p-4 pl-10 rounded-t-lg my-5 text-white items-center"
          >
            <p class="font-bold">{{ memberName }}님</p>
            <p>의 포인트 :</p>
            <p class="text-xl font-bold ml-10">{{ memberTotalPoints }}</p>
          </div>
          <table class="min-w-full border-separate border-spacing-y-5">
            <thead>
              <tr class="text-xl pt-10">
                <th>포인트</th>
                <th>적립 날짜</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(point, index) in slicedPoints" :key="index">
                <td>+ {{ point.mevAmount }} P</td>
                <td>
                  {{ dateUtils.timestampToFullDate(point.mevCreationDate) }}
                </td>
              </tr>
            </tbody>
          </table>
          <BasePagination
            :totalPages="totalPages"
            v-model="currentPage"
            @update:modelValue="currentPage = $event"
            class="mt-5 mb-10"
          />
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style scoped>
.mbr-hr {
  margin: 10px;
  margin-bottom: 15px;
}
</style>
