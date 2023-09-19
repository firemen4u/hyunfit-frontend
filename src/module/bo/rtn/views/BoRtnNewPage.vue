<template lang="">
  <BaseContainer>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="boRtnNewPage-wrap mt-10 mb-10">
        <div class="flex justify-between">
          <div class="text-3xl font-bold">루틴 생성</div>
        </div>

        <div class="rtn-wrap mt-10">
          <div class="rtn-name flex items-center">
            <p class="col-1">루틴 이름</p>
            <div class="rtn-name-text">
              <v-text-field
                v-model="rtn_name"
                clearable
                maxlength="20"
                placeholder="20자 내로 작성하세요"
                hide-details
                variant="solo"
              ></v-text-field>
            </div>
          </div>

          <div class="rtn-content flex items-center mt-5">
            <p class="col-1">루틴 설명</p>
            <div class="rtn-content-text">
              <v-textarea
                class="rtn-content-text"
                v-model="rtn_content"
                clearable
                placeholder="50자 내로 작성하세요"
                maxlength="50"
                variant="solo"
                single-line
              ></v-textarea>
            </div>
          </div>

          <div class="flex rtn-thumnail items-center">
            <p class="col-1">루틴 썸네일</p>
            <div class="flex items-center">
              <PictureSvg size="30" color="gray" />
              <v-file-input
                class="rtn-thumnail-input mr-5"
                label="썸네일 이미지"
                v-model="rtn_thumbnail_url"
                prepend-icon="none"
                hide-details
                @change="previewImage"
                @click:clear="
                  imageUrl =
                    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDbEJs%2FbtsuIBwAaQ1%2FEsjbr4jpfgxrtE2KK88PNk%2Fimg.png'
                "
              ></v-file-input>
            </div>
          </div>

          <div class="flex w-full mt-4">
            <p class="col-1"></p>
            <div class="rtn-thumnail-output overflow-scroll">
              <img :src="imageUrl" alt="Image Preview" />
            </div>
          </div>

          <div class="flex items-center mt-4">
            <p class="col-1">루틴 타겟 부위</p>
            <BoExcRadioButton
              :options="rtn_target_radio"
              v-model="rtn_target"
              hide-details
            />
          </div>

          <div class="flex">
            <div class="flex items-center mt-4">
              <p class="col-1">루틴 난이도</p>
              <BoExcRadioButton
                :options="rtn_experience_level_radio"
                v-model="rtn_experience_level"
                hide-details
              />
            </div>

            <div class="flex items-center mt-4">
              <p class="col-1">루틴 진행 시간</p>
              <BoExcRadioButton
                :options="rtn_duration_radio"
                v-model="rtn_duration"
                hide-details
              />
            </div>
          </div>

          <div class="flex">
            <div class="flex items-center mt-4">
              <p class="col-1">운동 목표</p>
              <BoExcRadioButton
                :options="rtn_goal_radio"
                v-model="rtn_goal"
                hide-details
              />
            </div>

            <div class="flex items-center mt-4">
              <p class="col-1">무릎 운동 고려</p>
              <BoExcRadioButton
                :options="rtn_knee_health_considered_radio"
                v-model="rtn_knee_health_considered"
                hide-details
              />
            </div>
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
          <div class="flex items-center mt-4">
            <p class="col-1">포인트</p>
            <div class="rtn-point-text">
              <v-text-field
                v-model="rtn_reward_point"
                clearable
                placeholder="루틴 완료시 지급 포인트"
                hide-details
                type="number"
                variant="solo"
                suffix="P"
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="plus-routine mt-10">
          <BoRtnExcListContainer
            @update:show="showModal = $event"
            @update:exercises="
              exercises => (exercisesFromContainer = exercises)
            "
          />
        </div>
        <div class="flex justify-center mt-10">
          <button
            @click="sendDataToAPI"
            class="register-btn bg-primary rounded-lg"
          >
            루틴 등록하기
          </button>

          <!-- <button @click="checkData">데이터 확인</button> -->
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { PictureSvg } from '/src/module/@base/svg'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted, computed, watch } from 'vue'
import BoRtnExcListContainer from '/src/module/bo/rtn/components/BoRtnExcListContainer.vue'
import { BoExcFileInput, BoExcRadioButton } from '/src/module/bo/exc/components'
import { FILE_SERVER_TOKEN } from '/src/config.js'
import axios from 'axios'

const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/bo-excBoard' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/bo-excNew' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]

// 루틴 타켓부위
const rtn_target_radio = [
  { label: '상체', value: '1' },
  { label: '하체', value: '2' },
  { label: '전신', value: '3' },
  { label: '유산소', value: '4' },
]

// 루틴 난이도
const rtn_experience_level_radio = [
  { label: '초급', value: '1' },
  { label: '초중급', value: '2' },
  { label: '중급', value: '3' },
  { label: '중상급', value: '4' },
  { label: '상급', value: '5' },
]

// 루틴 진행시간
const rtn_duration_radio = [
  { label: '10-15분', value: '1' },
  { label: '15-20분', value: '2' },
  { label: '20-25분', value: '3' },
]

// 운동 목표
const rtn_goal_radio = [
  { label: '1번 목표', value: '1' },
  { label: '2번 목표', value: '2' },
]

// 무릎 운동 고려
const rtn_knee_health_considered_radio = [
  { label: '예', value: '1' },
  { label: '아니오', value: '2' },
]

// 층간 소음 고려
const rtn_noise_considered_radio = [
  { label: '예', value: '1' },
  { label: '아니오', value: '2' },
]

// 오래 앉아 있는 사람
const rtn_long_sitter_radio = [
  { label: '예', value: '1' },
  { label: '아니오', value: '2' },
]

// 목 어깨 포커스
const rtn_neck_shoulder_focused_radio = [
  { label: '예', value: '1' },
  { label: '아니오', value: '2' },
]

// 허리 디스크 고려
const rtn_back_disk_considered_radio = [
  { label: '예', value: '1' },
  { label: '아니오', value: '2' },
]

//submit 시키기
const rtn_name = ref('')
const rtn_content = ref('')
const rtn_duration = ref('')
const rtn_goal = ref('')
const rtn_target = ref('')
const rtn_experience_level = ref('')
const rtn_knee_health_considered = ref('')
const rtn_noise_considered = ref('')
const rtn_long_sitter = ref('')
const rtn_neck_shoulder_focused = ref('')
const rtn_back_disk_considered = ref('')
const rtn_reward_point = ref('')

const rtn_thumbnail_url = ref('') // 이미지 파일
const imageUrl = ref(
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDbEJs%2FbtsuIBwAaQ1%2FEsjbr4jpfgxrtE2KK88PNk%2Fimg.png'
) // 이미지 미리보기 URL을 저장할 ref 변수

// 파일 미리보기를 생성하는 함수
const previewImage = () => {
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    imageUrl.value = reader.result
  })
  if (rtn_thumbnail_url.value && rtn_thumbnail_url.value[0]) {
    reader.readAsDataURL(rtn_thumbnail_url.value[0])
  }
}

const exercisesFromContainer = ref([]) // 모달에서 받은 exercises

const updateExercises = updatedExercises => {
  exercisesFromContainer.value = updatedExercises
}

// 데이터 전송
const sendDataToAPI = async () => {
  // API 전송 로직
  try {
    const payload = {
      admSeq: '1',
      rtnName: rtn_name.value,
      rtnContent: rtn_content.value,
      rtnDuration: rtn_duration.value,
      rtnGoal: rtn_goal.value,
      rtnTarget: rtn_target.value,
      rtnExperienceLevel: rtn_experience_level.value,
      rtnKneeHealthConsidered: rtn_knee_health_considered.value,
      rtnNoiseConsidered: rtn_noise_considered.value,
      rtnLongSitter: rtn_long_sitter.value,
      rtnNeckShoulderFocused: rtn_neck_shoulder_focused.value,
      rtnBackDiskConsidered: rtn_back_disk_considered.value,
      rtnRewardPoint: rtn_reward_point.value,
      exercises: exercisesFromContainer.value,
    }

    // 첫 번째 API 호출
    const firstApiResponse = await axios.post(
      'http://localhost:8080/routines',
      payload
    )
    const rtnSeq = firstApiResponse.data.rtnSeq

    console.log(`Received rtnSeq: ${rtnSeq}`)

    // 파일 업로드 설정
    const config = {
      headers: {
        token: FILE_SERVER_TOKEN, // 이 변수를 미리 설정해야 합니다.
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
    console.log(fileName)

    // 두 번째 API 호출: 파일 업로드
    const secondApiResponse = await axios.post(
      'http://ryulrudaga.com:48000/api/firemen/file',
      formData,
      config
    )

    console.log('Data sent to API:', JSON.stringify(payload, null, 2)) // 콘솔에 로깅
    console.log(`File upload success: ${secondApiResponse.data}`)
    alert('등록 성공!')
    window.location.reload() // 페이지 새로고침
  } catch (error) {
    console.error(error)
    alert('등록 실패!')
  }
}
function checkData() {
  const dataToCheck = {
    rtn_name: rtn_name.value,
    rtn_content: rtn_content.value,
    rtn_duration: rtn_duration.value,
    rtn_goal: rtn_goal.value,
    rtn_target: rtn_target.value,
    rtn_experience_level: rtn_experience_level.value,
    rtn_knee_health_considered: rtn_knee_health_considered.value,
    rtn_noise_considered: rtn_noise_considered.value,
    rtn_long_sitter: rtn_long_sitter.value,
    rtn_neck_shoulder_focused: rtn_neck_shoulder_focused.value,
    rtn_back_disk_considered: rtn_back_disk_considered.value,
    rtn_reward_point: rtn_reward_point.value,
    exercises: exercisesFromContainer.value,
  }
  console.log('입력된 데이터:', dataToCheck)
  console.log(JSON.stringify(dataToCheck, null, 2))
}
</script>
<style scoped>
.rtn-name-text {
  width: 730px;
}
.rtn-content-text {
  width: 730px;
}
.rtn-point-text {
  width: 300px;
}
.rtn-thumnail-input {
  width: 700px;
  height: 100px;
}
.rtn-thumnail-output {
  width: 300px;
  height: 250px;
}
.rtn-thumnail-output img {
  width: 100%;
}
.col-1 {
  width: 200px;
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
