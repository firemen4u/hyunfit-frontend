<template>
  <BaseContainer>
    <BaseBodyWrapper>
        <!-- 컨텐츠 -->
        <div class="content mt-10">
          <p class="font-bold text-2xl pl-5">회원 정보 수정</p>
          <hr class="mbr-hr border-2 border-gray-400" />
          <div class="p-2 flex flex-col items-center" v-if="response !== null">
            <div class="p-2 bg-white font-normal w-2/3">
              <div>
                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">이름(닉네임)</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="이름(닉네임)"
                    v-model="response.mbrName"
                    variant="outlined"
                    placeholder="이름(닉네임)"
                    clearable
                    hint="회원님의 이름/닉네임을 써주세요"
                  ></v-text-field>
                </div>

                <!-- <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">이메일</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="이메일"
                    v-model="response?"
                    variant="outlined"
                    placeholder="abcdefg@email.com"
                    clearable
                    hint="이메일 형식으로 써주세요"
                  ></v-text-field>
                </div> -->
                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">생년월일</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="생년월일"
                    variant="outlined"
                    v-model="response.mbrBirthdate"
                    placeholder="YYYYMMDD"
                    clearable
                    :hint="birthdateHint"
                    @input="validateBirthdate"
                  ></v-text-field>
                </div>
                <!-- <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">추천 운동</p>
                  <div class="flex flex-col justify-center items-start">
                    <p class="text-gray-400 text-sm">
                      회원가입시 입력한 정보를 수정해 추천 운동을 설정할 수
                      있어요!
                    </p>
                    <button
                      class="bg-primary mt-2 p-2 pr-16 pl-16 rounded-md"
                      onclick="http://localhost:5173/survey"
                    >
                      설정하기
                    </button>
                  </div>
                </div> -->
                <hr class="mbr-hr" />
                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">키</p>
                  <v-text-field
                    class="mb-2"
                    label="키"
                    v-model="response.mbrHeight"
                    variant="outlined"
                    suffix="cm"
                    clearable
                    hint="소수점 첫번째 자리까지 입력할수있습니다."
                  ></v-text-field>
                </div>
                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">몸무게</p>
                  <v-text-field
                    class="mb-2"
                    label="몸무게"
                    v-model="response.mbrWeight"
                    variant="outlined"
                    suffix="kg"
                    clearable
                    hint="소수점 첫번째 자리까지 입력할수있습니다."
                  ></v-text-field>
                </div>
                <hr class="mbr-hr" />
                <div>
                  <div>
                    <a class="text-gray-300" href="/">회원 탈퇴하기</a>
                    <div class="flex justify-center items-center">
                      <p class="mr-4">수정된 내용을 저장하시겠어요?</p>

                      <button
                        class="mt-2 p-2 pr-16 pl-16 rounded-md"
                        @click="sendData"
                        :class="{
                          'bg-primary ': isButtonActive,
                          'bg-gray-300': !isButtonActive,
                        }"
                        :disabled="!isButtonActive"
                      >
                        저장하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </BaseBodyWrapper></BaseContainer
  >
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import ApiClient from '/src/services/api.js'
import _ from 'lodash'

const response = ref(null)
let putData = {
  updateData: Object,
}

let originMbrName = null
let originBirthdate = null
let originMbrHeight = null
let originMbrWeight = null

const birthdateError = ref('')

const isButtonActive = computed(() => {
  if (response.value === null) return false
  return (
    response.value.mbrName !== originMbrName ||
    response.value.mbrBirthdate !== originBirthdate ||
    response.value.mbrHeight !== originMbrHeight ||
    response.value.mbrWeight !== originMbrWeight
  )
})

const validateBirthdate = () => {
  const regex = /^(\d{4})(\d{2})(\d{2})$/
  const year = parseInt(response.value.mbrBirthdate.slice(0, 4))
  const month = parseInt(response.value.mbrBirthdate.slice(4, 6))
  const day = parseInt(response.value.mbrBirthdate.slice(6, 8))
  const result =
    regex.test(response.value.mbrBirthdate) &&
    year >= 1900 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31

  if (!result) {
    birthdateError.value = '올바른 형식의 생년월일을 입력하세요.'
  } else {
    birthdateError.value = '' // 유효한 경우 오류 메시지를 지움
  }
}

const birthdateHint = computed(() => {
  if (birthdateError.value) {
    return birthdateError.value // 오류 메시지가 있는 경우 표시
  } else {
    return 'YYYYMMDD 형식으로 써주세요' // 오류 메시지가 없는 경우 기본 힌트 표시
  }
})

async function init() {
  response.value = await ApiClient.get('/members/me')
  console.log('데이터 도착함')
  try {
    const jsDate = new Date(response.value.mbrBirthdate)
    response.value.mbrBirthdate = jsDate
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\s|\./g, '')

    originMbrName = response.value.mbrName
    originBirthdate = response.value.mbrBirthdate
    originMbrHeight = response.value.mbrHeight
    originMbrWeight = response.value.mbrWeight
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
}

onBeforeMount(() => {
  init()
})

onMounted(async () => {
  console.log('마운트됨')
})

function sendData() {
  console.log('sendData()')
  console.log('response', response?.value)
  console.log('mbrBirthDate', response?.value.mbrBirthdate)

  const year = parseInt(response.value.mbrBirthdate.slice(0, 4))
  const month = parseInt(response.value.mbrBirthdate.slice(4, 6))
  const day = parseInt(response.value.mbrBirthdate.slice(6, 8))

  const timeStampDate = new Date(year, month, day)

  putData = _.cloneDeep(response.value)
  putData.mbrBirthdate = timeStampDate
  console.log('putData : ', putData)
  console.log('putData.updateData : ', putData.mbrBirthdate)
  console.log('response value', response.value.mbrBirthdate)

  ApiClient.put(`/members/${response?.value.mbrId}`, putData)
}
const sidebarHeader = '마이페이지'
const mainCategory = '카테고리'
const subcategories = [
  { id: 1, title: '서브 카테고리 1', link: '/link1' },
  { id: 2, title: '서브 카테고리 2', link: '/link2' },
  { id: 3, title: '서브 카테고리 3', link: '/link3' },
]
</script>

<style scoped>
.content {
  padding: 20px;
  width: 100%;
}
.mbr-hr {
  margin: 10px;
  margin-bottom: 15px;
}
</style>
