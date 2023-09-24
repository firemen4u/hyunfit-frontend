<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { ref, onMounted } from 'vue'
import ApiClient from '/src/services/api.js'
import dateUtils from '/src/utils/date.js'
import BasePagination from '/src/module/@base/components/BasePagination.vue'

// mbrSeq 값을 할당
let memberSeq, memberTotalPoints, memberName
const mevType = '2' // 1: 칼로리, 2: 포인트
const points = ref([])

async function getMemberSeq() {
  const response = await ApiClient.get('/members/me')
  console.log(response)
  memberSeq = response.mbrSeq // 또는 mbrSeq, 필드 확인 필요
  memberTotalPoints = response.mbrTotalPoint
  memberName = response.mbrName
}

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
      <div class="">
        <!-- 컨텐츠 -->
        <div class="content mt-10">
          <p class="font-bold text-xl pl-5">{{ memberName }}님의 포인트 조회</p>
          <p>총 포인트 : {{ memberTotalPoints }}</p>
          <hr class="border-2 border-gray-400" />

          <table class="min-w-full">
            <thead>
              <tr class="border-y-2 border-solid text-2xl pt-10">
                <th>포인트 양</th>
                <th>포인트 획득 날짜</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(point, index) in points" :key="index">
                <td>{{ point.mevAmount }}</td>
                <td>
                  {{ dateUtils.timestampToFullDate(point.mevCreationDate) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
