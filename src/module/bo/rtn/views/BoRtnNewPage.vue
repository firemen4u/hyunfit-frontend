<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { PictureSvg } from '/src/module/@base/svg'
import { ref, onMounted, computed } from 'vue'
import BoRtnExcListContainer from '/src/module/bo/rtn/components/BoRtnExcListContainer.vue'
import { BoExcRadioButton } from '/src/module/bo/exc/components'
import { FILE_SERVER_HYUNFIT_URL } from '/src/config.js'
import BaseDivider from '@/module/@base/components/BaseDivider.vue'
import PointCoinSvg from '@/module/@base/svg/PointCoinSvg.vue'
import ExcUtils from '@/module/bo/exc/services/excUtils'
import router, { pathNames } from '@/router'

// 프로그램 타켓부위
const rtn_target_radio = [
  { label: '상체', value: 1 },
  { label: '하체', value: 2 },
  { label: '전신', value: 3 },
  { label: '유산소', value: 4 },
]

// 프로그램 난이도
const rtn_experience_level_radio = [
  { label: '초급', value: 1 },
  { label: '초중급', value: 2 },
  { label: '중급', value: 3 },
  { label: '중상급', value: 4 },
  { label: '상급', value: 5 },
]

// 프로그램 진행시간
const rtn_duration_radio = [
  { label: '10-15분', value: 1 },
  { label: '15-20분', value: 2 },
  { label: '20-25분', value: 3 },
]

// 운동 목표
const rtn_goal_radio = [
  { label: '체중관리', value: 1 },
  { label: '건강관리', value: 2 },
]

// 무릎 운동 고려
const rtn_knee_health_considered_radio = [
  { label: '예', value: 1 },
  { label: '아니오', value: 0 },
]

// 층간 소음 고려
const rtn_noise_considered_radio = [
  { label: '예', value: 1 },
  { label: '아니오', value: 0 },
]

// 오래 앉아 있는 사람
const rtn_long_sitter_radio = [
  { label: '예', value: 1 },
  { label: '아니오', value: 0 },
]

// 목 어깨 포커스
const rtn_neck_shoulder_focused_radio = [
  { label: '예', value: 1 },
  { label: '아니오', value: 0 },
]

// 허리 디스크 고려
const rtn_back_disk_considered_radio = [
  { label: '예', value: 1 },
  { label: '아니오', value: 0 },
]

//submit 시키기
const rtn_name = ref('')
const rtn_content = ref('')
const rtn_goal = ref(1)
const rtn_knee_health_considered = ref(1)
const rtn_noise_considered = ref(1)
const rtn_long_sitter = ref(1)
const rtn_neck_shoulder_focused = ref(1)
const rtn_back_disk_considered = ref(1)
const rtn_reward_point = ref(0)
const admSeq = ref(0)
const exercises = ref([]) // API로 받아온 운동 목록을 저장할 변수

const formValidator = ref(true)
const loading = ref(false)

onMounted(async () => {
  try {
    const response = await ApiClient.get('/admins/me')
    console.log('admin : ', response)
    admSeq.value = response.admSeq
    // API를 통해 운동 목록을 가져오는 함수
    await fetchExercises()
  } catch (error) {
    console.error('Failed to fetch admin data:', error)
  }
})
const fetchExercises = async () => {
  try {
    exercises.value = await ApiClient.get('/exercises') // 받아온 데이터를 exercises 변수에 저장합니다.
  } catch (error) {
    console.error('운동 목록을 불러오는 중 에러 발생:', error)
  }
}
const rtn_thumbnail_url = ref([]) // 이미지 일

// 총 칼로리 계산
const totalCalories = computed(() => {
  return Math.round(
    selectedExercises.value.reduce((acc, curr) => {
      return acc + curr.excCaloriesPerRep * curr.excSetCount
    }, 0)
  )
})

// 총 시간 계산
const totalMinutes = computed(() => {
  return Math.round(
    selectedExercises.value.reduce((acc, curr) => {
      return acc + (curr.excSetCount * curr.excTimePerSetInSec) / 60
    }, 0)
  )
})
const minutesCategory = computed(() => {
  if (totalMinutes.value <= 15) return 1
  if (totalMinutes.value <= 20) return 2
  else return 3
})
const averageDifficulty = computed(() => {
  return Math.round(
    selectedExercises.value.reduce((a, b) => a + b.excDifficulty, 0) /
      selectedExercises.value.length
  )
})

const averageTarget = computed(() => {
  let w = countOccurrences(selectedExercises.value)
  if (selectedExercises.value.length === 0) return '-'

  let category
  if (w[1] > w[2] && w[1] > w[3] && w[1] > w[4]) category = 1
  else if (w[2] > w[1] && w[2] > w[3] && w[2] > w[4]) category = 2
  else if (w[3] > w[1] && w[3] > w[2] && w[3] > w[4]) category = 3
  else if (w[4] > w[1] && w[4] > w[2] && w[4] > w[3]) category = 4
  else category = 3
  return category
})

function countOccurrences(arr) {
  const counter = { 1: 0, 2: 0, 3: 0, 4: 0 }
  for (const element of arr) {
    counter[element.excType] += 1
  }
  let total = Object.keys(counter).reduce((a, b) => a + counter[b], 0)

  Object.keys(counter).forEach(it => {
    counter[it] /= total
  })
  return counter
}

const selectedExercises = ref([]) // 모달에서 받은 exercises

// 데이터 전송
const sendDataToAPI = async () => {
  // API 전송 로직
  try {
    const payload = {
      admSeq: admSeq.value,
      rtnName: rtn_name.value,
      rtnContent: rtn_content.value,
      rtnDuration: minutesCategory.value,
      rtnTarget: averageTarget.value,
      rtnExperienceLevel: averageDifficulty.value,
      rtnGoal: rtn_goal.value,
      rtnKneeHealthConsidered: rtn_knee_health_considered.value,
      rtnNoiseConsidered: rtn_noise_considered.value,
      rtnLongSitter: rtn_long_sitter.value,
      rtnNeckShoulderFocused: rtn_neck_shoulder_focused.value,
      rtnBackDiskConsidered: rtn_back_disk_considered.value,
      rtnRewardPoint: rtn_reward_point.value,
      exercises: selectedExercises.value,
    }

    // 첫 번째 API 호출
    const firstApiResponse = await ApiClient.post(
      `${BACKEND_API_BASE_URL}/routines`,
      payload
    )
    const rtnSeq = firstApiResponse.rtnSeq

    // 파일 업로드 설정
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const formData = new FormData()
    // 파일 확장자 동적으로 추출
    const file = rtn_thumbnail_url.value[0]
    const splitFileName = file.name.split('.')
    const extension = splitFileName.pop()

    // 파일 이름 동적으로 설정
    const fileName = `routine_thumbnail_${rtnSeq}.${extension}`
    formData.append('file', file, fileName)

    // 두 번째 API 호출: 파일 업로드
    const secondApiResponse = await ApiClient.post(
      FILE_SERVER_HYUNFIT_URL,
      formData,
      config
    )
    alert('등록 성공!')
  } catch (error) {
    console.error(error)
    alert('등록 실패!')
  }
}

const rules = {
  nonEmpty: value => {
    return !!value || '필수항목입니다.'
  },
  hasElement: li => {
    return !!li.length || '최소 한 개의 운동이 선택되어야 합니다.'
  },
  thumbnail: li => {
    return !!li.length || '썸네일 이미지가 선택되어야 합니다.'
  },
  gtZero: value => {
    return (value && value > 0) || '0 이상의 숫자여야 합니다'
  },
  form: value => {
    return formValid.value || '필수항목을 모두 채워주세요'
  },
}

const formValid = ref(false)
async function onSubmit() {
  if (!formValid.value) return

  const isConfirmed = window.confirm('등록하시겠습니까?')
  if (!isConfirmed) {
    return // 취소를 누르면 함수실행 안함
  }

  loading.value = true
  await sendDataToAPI()
  loading.value = false
  await router.push(pathNames.boRtnBoardPage)
}
</script>

<script>
import axios from 'axios'
import { BACKEND_API_BASE_URL } from '@/config'
import ApiClient from '@/services/api'

export default {
  async beforeRouteEnter() {
    const user = {
      username: 'admin',
      password: '123',
    }
    await axios
      .post(`${BACKEND_API_BASE_URL}/auth/admin`, user)
      .then(response => {
        let token = response.headers.get('authorization')
        ApiClient.setTokenOnLocalStorage(token, 'admin')
      })
  },
}
</script>
<template>
  <BaseContainer category="admin">
    <div class="w-100 flex justify-center mb-[150px]">
      <BaseBodyWrapper>
        <v-form
          :disabled="loading"
          class="mt-3 bg-white shadow-lg rounded-xl overflow-hidden"
          v-model="formValid"
          @submit.prevent="onSubmit"
        >
          <div class="bo-rtnNew-banner flex items-center px-10">
            <div class="text-4xl font-black text-[#021f3d]">
              <div>
                <p class="text-2xl font-bold text-gray-200">트레이너</p>
                <p class="text-4xl font-black mt-3 text-gray-200">
                  트레이닝 프로그램 등록
                </p>
              </div>
            </div>
          </div>
          <div class="rtnNew-contents-wrap px-[50px]">
            <div class="my-4">
              <p class="col-1 font-bold text-xl mb-3">프로그램 이름</p>
              <div class="">
                <v-text-field
                  counter
                  v-model="rtn_name"
                  clearable
                  maxlength="20"
                  placeholder="20자 내로 작성하세요"
                  variant="solo"
                  :rules="[rules.nonEmpty]"
                ></v-text-field>
              </div>
            </div>
            <div class="mb-5">
              <p class="col-1 font-bold text-xl mb-3">프로그램 설명</p>
              <div class="rtn-content flex items-start">
                <v-textarea
                  counter
                  v-model="rtn_content"
                  placeholder="100자 내로 작성하세요"
                  maxlength="100"
                  variant="solo"
                  :rules="[rules.nonEmpty]"
                ></v-textarea>
              </div>
            </div>
            <div class="mb-5">
              <BoRtnExcListContainer
                v-model="selectedExercises"
                :exercises="exercises"
              >
                <template v-slot:input-validator>
                  <v-input
                    v-model="selectedExercises"
                    :rules="[rules.hasElement]"
                  >
                  </v-input>
                </template>
                <template v-slot:totalMinutes>{{ totalMinutes }} </template>
                <template v-slot:averageTarget
                  >{{ ExcUtils.mapExcType(averageTarget) }}
                </template>
                <template v-slot:averageDifficulty>
                  {{ ExcUtils.mapDifficultyType(averageDifficulty) }}
                </template>
                <template v-slot:totalCalories>{{ totalCalories }} </template>
              </BoRtnExcListContainer>
            </div>

            <BaseDivider class="my-10" />
            <div><p class="col-1 font-bold text-xl">프로그램 설정</p></div>
            <div class="flex items-center mt-4">
              <p class="col-1">운동 목표</p>
              <BoExcRadioButton
                :options="rtn_goal_radio"
                v-model="rtn_goal"
                hide-details
              />
            </div>
            <div class="flex justify-between">
              <div class="flex items-center mt-5">
                <p class="col-1 mb-5">프로그램 썸네일</p>
                <div class="w-[400px]">
                  <v-file-input
                    :show-size="1000"
                    variant="solo"
                    label="썸네일 이미지 파일"
                    class="ml-2"
                    v-model="rtn_thumbnail_url"
                    :prepend-icon="PictureSvg"
                    :rules="[rules.thumbnail]"
                    density="comfortable"
                  >
                    <template v-slot:selection="{ fileNames }">
                      <div
                        class="overflow-hidden overflow-ellipsis whitespace-nowrap"
                      >
                        {{ fileNames[0] }}
                      </div>
                    </template>
                  </v-file-input>
                </div>
              </div>
              <div class="flex items-center mt-5">
                <p class="mr-10 mb-5">포인트</p>
                <div class="w-[300px]">
                  <v-text-field
                    v-model="rtn_reward_point"
                    class="ml-2"
                    label="완료시 포인트 지급량"
                    type="number"
                    variant="solo"
                    suffix="P"
                    single-line
                    :prepend-icon="PointCoinSvg"
                    :rules="[rules.gtZero]"
                    density="comfortable"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <BaseDivider class="my-10" />
            <div><p class="col-1 font-bold text-xl">사용자 맞춤</p></div>
            <div class="flex items-center mt-4">
              <p class="col-1">무릎 운동 고려</p>
              <BoExcRadioButton
                :options="rtn_knee_health_considered_radio"
                v-model="rtn_knee_health_considered"
                hide-details
              />
            </div>
            <div class="flex">
              <div class="flex">
                <div class="flex items-center mt-4">
                  <p class="col-1">층간 소음 고려</p>
                  <BoExcRadioButton
                    :options="rtn_noise_considered_radio"
                    v-model="rtn_noise_considered"
                    hide-details
                  />
                </div>
              </div>
              <div class="flex items-center mt-4">
                <p class="col-1">오래 앉아 있는 사람</p>
                <BoExcRadioButton
                  :options="rtn_long_sitter_radio"
                  v-model="rtn_long_sitter"
                  hide-details
                />
              </div>
            </div>
            <div class="flex">
              <div class="flex items-center mt-4">
                <p class="col-1">목 어깨 포커스</p>
                <BoExcRadioButton
                  :options="rtn_neck_shoulder_focused_radio"
                  v-model="rtn_neck_shoulder_focused"
                  hide-details
                />
              </div>

              <div class="flex items-center mt-4">
                <p class="col-1">허리 디스크 고려</p>
                <BoExcRadioButton
                  :options="rtn_back_disk_considered_radio"
                  v-model="rtn_back_disk_considered"
                  hide-details
                />
              </div>
            </div>

            <div class="flex flex-col items-center justify-center mt-20">
              <v-btn
                class="w-[300px]"
                type="submit"
                color="#021f3d"
                size="x-large"
                :loading="loading"
              >
                등록하기
              </v-btn>
              <div>
                <v-input v-model="formValidator"> </v-input>
              </div>
            </div>
          </div>
        </v-form>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<style scoped>
.bo-rtnNew-banner {
  //background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  background-color: #2f3237;
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
  height: 200px;
}
.col-1 {
  width: 150px;
  margin-left: 10px;
}
.v-input__prepend {
  width: 1px;
}

.v-radio-group .v-input__control {
  width: 300px;
}

.register-btn {
  width: 200px;
  height: 40px;
}
</style>
