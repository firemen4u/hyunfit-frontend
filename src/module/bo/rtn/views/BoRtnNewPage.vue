<template lang="">
  <BaseContainer>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="flex justify-between">
        <div class="text-3xl font-bold">루틴 생성</div>
      </div>

      <div class="rtn-wrap border-4 border-dashed border-blue-500">
        <div class="rtn-name">
          <p class="col-1">루틴 이름</p>
          <v-text-field
            v-model="rtn_name"
            clearable
            maxlength="20"
            placeholder="20자 내로 작성하세요"
            hide-details
            variant="solo"
          ></v-text-field>
        </div>

        <div class="rtn-content">
          <p class="col-1">루틴 설명</p>
          <v-textarea
            v-model="rtn_content"
            clearable
            placeholder="50자 내로 작성하세요"
            maxlength="50"
            variant="solo"
            single-line
          ></v-textarea>
        </div>

        <div class="rtn-thumnail">
          <p>루틴 썸네일</p>
          <div>
            <v-file-input
              label="File input"
              v-model="rtn_thumbnail_url"
              @change="previewImage"
              @click:clear="imageUrl = null"
            ></v-file-input>
            <div v-if="imageUrl">
              <img :src="imageUrl" alt="Image Preview" width="200" />
            </div>
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

        <div class="flex items-center mt-4">
          <p class="col-1">층간 소음 고려</p>
          <BoExcRadioButton
            :options="rtn_noise_considered_radio"
            v-model="rtn_noise_considered"
            hide-details
          />
        </div>

        <div class="flex items-center mt-4">
          <p class="col-1">오래 앉아 있는 사람</p>
          <BoExcRadioButton
            :options="rtn_long_sitter_radio"
            v-model="rtn_long_sitter"
            hide-details
          />
        </div>

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

        <div class="flex items-center mt-4">
          <p class="col-1">포인트</p>
          <v-text-field
            v-model="rtn_reward_point"
            clearable
            placeholder="루틴 완료시 지급 포인트"
            hide-details
            variant="solo"
            suffix="P"
          ></v-text-field>
        </div>
      </div>

      <div class="border-4 border-dashed border-green-500">
        <button @click="toggleModal">운동 목록 보기</button>

        <BoRtnExcListModal
          v-if="showModal"
          @update:show="showModal = $event"
          @update:exercises="updateExercises"
        />
      </div>

      <div><button @click="sendDataToAPI">루틴 등록하기 버튼</button></div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted, computed, watch } from 'vue'
import BoRtnExcListModal from '/src/module/bo/rtn/components/BoRtnExcListModal.vue'
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
// 운동 목록 모달 보여주는 곳
const showModal = ref(false)
const toggleModal = () => {
  showModal.value = !showModal.value
}

const rtn_thumbnail_url = ref('') // 이미지 파일
const imageUrl = ref(null) // 이미지 미리보기 URL을 저장할 ref 변수

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

const exercisesFromModal = ref([]) // 모달에서 받은 exercises

const updateExercises = updatedExercises => {
  exercisesFromModal.value = updatedExercises
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
      exercises: exercisesFromModal.value,
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
</script>
<style scoped></style>
