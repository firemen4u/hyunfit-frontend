<template>
  <BaseContainer category="admin">
    <div class="w-100 flex justify-center primary-background mb-[150px]">
      <BaseBodyWrapper>
        <div class="mt-3 bg-white shadow-lg rounded-xl overflow-hidden">
          <div class="bo-excNew-banner flex items-center px-10">
            <div>
              <p class="text-2xl font-bold text-gray-200">트레이너</p>
              <p class="text-4xl font-black mt-3 text-gray-200">
                트레이닝 등록
              </p>
            </div>
          </div>
          <form @submit.prevent="submit" class="px-[50px] mt-6">
            <div>
              <div class="exc-content-wrap">
                <div class="flex items-center">
                  <p class="col-1">운동 이름</p>
                  <v-text-field
                    counter
                    v-model="exc_name"
                    clearable
                    maxlength="25"
                    placeholder="25자 내로 작성하세요"
                    variant="solo"
                    :rules="[rules.nonEmpty]"
                  ></v-text-field>
                </div>

                <div class="flex items-center mt-4">
                  <p class="col-1">운동 설명</p>
                  <v-textarea
                    counter
                    v-model="exc_content"
                    clearable
                    placeholder="70자 내로 작성하세요"
                    maxlength="70"
                    variant="solo"
                    single-line
                    :rules="[rules.nonEmpty]"
                  ></v-textarea>
                </div>
                <div class="flex items-center mt-4">
                  <p class="col-1">운동 종류</p>
                  <BoExcRadioButton
                    :options="radioOptions1"
                    v-model="exc_type"
                    hide-details
                  />
                </div>

                <div class="flex items-center mt-4">
                  <p class="col-1">운동 난이도</p>
                  <BoExcRadioButton
                    :options="radioOptions2"
                    v-model="exc_difficulty"
                    hide-details
                  />
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center mt-4">
                    <p class="col-1">세트당 칼로리 소모량</p>
                    <v-text-field
                      v-model="exc_calories_per_rep"
                      type="number"
                      clearable
                      placeholder="1회당 칼로리 소모량"
                      variant="solo"
                      suffix="kcal"
                      :rules="[rules.gtZero]"
                    ></v-text-field>
                  </div>

                  <div class="flex items-center mt-4">
                    <p class="col-1">지정할 세트 수</p>
                    <v-text-field
                      v-model="exc_set_count"
                      type="number"
                      clearable
                      placeholder="지정할 세트 수"
                      :rules="[rules.gtZero]"
                      variant="solo"
                      suffix="set"
                    ></v-text-field>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center mt-4">
                    <p class="col-1">세트당 동작 횟수</p>
                    <v-text-field
                      v-model="excRepCountPerSet"
                      type="number"
                      clearable
                      placeholder="세트당 동작 횟수"
                      :rules="[rules.gtZero]"
                      variant="solo"
                      suffix="회"
                    ></v-text-field>
                  </div>

                  <div class="flex items-center mt-4">
                    <p class="col-1">세트당 시간</p>
                    <v-text-field
                      v-model="exc_time_per_set_in_sec"
                      type="number"
                      clearable
                      placeholder="운동에 대해 지정한 세트당 시간"
                      :rules="[rules.gtZero]"
                      variant="solo"
                      suffix="S"
                    ></v-text-field>
                  </div>
                </div>
              </div>
              <div class="exc-target-wrap">
                <div class="">
                  <div class="flex items-center mt-4">
                    <p class="col-1">운동 부위</p>
                    <v-select
                      v-model="selectedBodyParts"
                      :items="target_items"
                      chips
                      clearable
                      label="부위"
                      multiple
                      variant="solo"
                      color="primary"
                      bg-color="white"
                      :rules="[rules.hasElement]"
                    ></v-select>
                  </div>
                </div>
                <div v-if="selectedBodyParts.length > 0">
                  <div
                    v-for="(bodyPart, index) in selectedBodyParts"
                    :key="index"
                  >
                    <div class="flex w-full items-center mt-2 mb-2">
                      <p class="col-1"></p>
                      <div class="label-wrap ml-14">
                        <span class="custom-label">{{ bodyPart }}</span>
                      </div>
                      <div class="slider-wrap">
                        <v-slider
                          v-model="
                            bodyPartWeights[target_items_mapping[bodyPart]]
                          "
                          class="target-slider"
                          color="#d2336177"
                          track-color="#bbbbbb"
                          thumb-color="#d23361"
                          :max="100"
                          :step="10"
                          hide-details
                          show-ticks="always"
                          style="width: 650px"
                        >
                          <template v-slot:append>
                            <v-text-field
                              v-model="
                                bodyPartWeights[target_items_mapping[bodyPart]]
                              "
                              placeholder="0"
                              hide-details
                              type="number"
                              style="width: 80px"
                              density="compact"
                              variant="outlined"
                            ></v-text-field>
                          </template>
                        </v-slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col">
                <hr class="mt-4" />
                <p class="mt-4 mb-8 font-bold text-lg">운동 데이터 업로드</p>
                <div class="flex items-center mb-4">
                  <BoExcFileInput
                    v-model="files_exc_model"
                    label="모델 데이터(.zip)"
                    :prepend-icon="CloudArrowUpSvg"
                  ></BoExcFileInput>
                </div>
                <div class="file-input-wrap flex items-center mb-4">
                  <div class="file-input">
                    <BoExcFileInput
                      class="mr-4"
                      v-model="files_exc_preview"
                      label="운동 가이드 영상"
                      :prepend-icon="ThumbnailSvg"
                    ></BoExcFileInput>
                  </div>
                  <div class="file-input">
                    <BoExcFileInput
                      v-model="files_exc_view"
                      label="운동 영상"
                      :prepend-icon="VideoSvg"
                    ></BoExcFileInput>
                  </div>
                </div>
                <div class="file-input-wrap flex items-center mb-4">
                  <div class="file-input">
                    <BoExcFileInput
                      class="mr-4"
                      v-model="files_exc_view_row_qual"
                      label="썸네일 운동 영상"
                      :prepend-icon="PictureSvg"
                      :rules="[rules.hasFile]"
                    ></BoExcFileInput>
                  </div>
                  <div class="file-input">
                    <BoExcFileInput
                      v-model="files_exc_mp3"
                      label="운동 가이드 메시지"
                      :prepend-icon="Mp3Svg"
                      :rules="[rules.hasFile]"
                      density="comfortable"
                      :show-size="1000"
                    ></BoExcFileInput>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-10 mb-10">
              <v-btn
                type="submit"
                size="x-large"
                color="#021f3d"
                class="w-[300px] rounded-lg"
                >등록하기</v-btn
              >
            </div>
          </form>
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import {
  CloudArrowUpSvg,
  PictureSvg,
  Mp3Svg,
  ThumbnailSvg,
  VideoSvg,
} from '/src/module/@base/svg'
import { BoExcFileInput, BoExcRadioButton } from '/src/module/bo/exc/components'
import { ref, onMounted } from 'vue'
import router, { pathNames } from '@/router'

const target_items = ref([
  '광배근',
  '기립근',
  '대퇴사두',
  '대흉근',
  '둔근',
  '삼두',
  '승모근',
  '이두근',
  '전면어깨',
  '측면어깨',
  '코어',
  '햄스트링',
  '후면어깨',
])

const target_items_mapping = {
  광배근: 1,
  기립근: 2,
  대퇴사두: 3,
  대흉근: 4,
  둔근: 5,
  삼두: 6,
  승모근: 7,
  이두근: 8,
  전면어깨: 9,
  측면어깨: 10,
  코어: 11,
  햄스트링: 12,
  후면어깨: 13,
}
const excTgArea = target_items_mapping[target_items.value]
const selectedBodyParts = ref([]) // 선택한 부위를 저장할 배열
const bodyPartWeights = ref({}) // 부위별 가중치를 저장할 객체

//파일 데이터
const files_exc_model = ref([])
const files_exc_preview = ref([])
const files_exc_view = ref([])
const files_exc_view_row_qual = ref([])
const files_exc_mp3 = ref([])

// 라디오 그룹 데이터
// 운동 종류
const radioOptions1 = [
  { label: '상체', value: '1' },
  { label: '하체', value: '2' },
  { label: '전신', value: '3' },
  { label: '유산소', value: '4' },
]
// 운동 난이도
const radioOptions2 = [
  { label: '초급', value: '1' },
  { label: '초중급', value: '2' },
  { label: '중급', value: '3' },
  { label: '중상급', value: '4' },
  { label: '상급', value: '5' },
]

//submit 시키기
const exc_name = ref('')
const exc_content = ref('')
const exc_type = ref('1')
const exc_difficulty = ref('1')
const exc_calories_per_rep = ref(0)
const exc_time_per_set_in_sec = ref(0)
const exc_set_count = ref(0)
const excRepCountPerSet = ref(0)
const admSeq = ref('1')

// 초기 데이터 로딩: 관리자 정보 가져오기
onMounted(async () => {
  try {
    const response = await ApiClient.get('/admins/me')
    console.log('admin : ', response)
    admSeq.value = response.admSeq
  } catch (error) {
    console.error('Failed to fetch admin data:', error)
  }
})

const submit = async () => {
  let errorMessage = ''

  if (!exc_name.value) errorMessage = '운동 이름을 입력하세요.'
  else if (!exc_content.value) errorMessage = '운동 설명을 입력하세요.'
  else if (!exc_type.value) errorMessage = '운동 종류를 선택하세요.'
  else if (!exc_difficulty.value) errorMessage = '운동 난이도를 선택하세요.'
  else if (exc_calories_per_rep.value <= 0)
    errorMessage = '세트당 칼로리 소모량을 입력하세요.'
  else if (exc_set_count.value <= 0)
    errorMessage = '지정할 세트 수를 입력하세요.'
  else if (excRepCountPerSet.value <= 0)
    errorMessage = '세트당 동작 횟수를 입력하세요.'
  else if (exc_time_per_set_in_sec.value <= 0)
    errorMessage = '세트당 시간을 입력하세요.'
  else if (!selectedBodyParts.value.length)
    errorMessage = '운동 부위를 선택하세요.'
  else if (!files_exc_model.value.length)
    errorMessage = '모델 데이터를 업로드하세요.'
  else if (!files_exc_preview.value.length)
    errorMessage = '운동 가이드 영상을 업로드하세요.'
  else if (!files_exc_view.value.length)
    errorMessage = '운동 영상을 업로드하세요.'
  else if (!files_exc_view_row_qual.value.length)
    errorMessage = '썸네일 운동 영상을 업로드하세요.'
  else if (!files_exc_mp3.value.length)
    errorMessage = '운동 가이드 메시지를 업로드하세요.'

  if (errorMessage) {
    alert(errorMessage)
    return
  }

  const isConfirmed = window.confirm('등록하시겠습니까?')
  if (!isConfirmed) {
    return // 취소를 누르면 함수실행 안함
  }

  const exerciseTargets = selectedBodyParts.value.map(bodyPart => ({
    exctgArea: target_items_mapping[bodyPart],
    exctgWeight: bodyPartWeights.value[target_items_mapping[bodyPart]] * 0.01,
  }))
  const values = {
    excName: exc_name.value,
    admSeq: admSeq.value,
    excContent: exc_content.value,
    excType: exc_type.value,
    excDifficulty: exc_difficulty.value,
    excCaloriesPerRep: exc_calories_per_rep.value,
    excSetCount: exc_set_count.value,
    excRepCountPerSet: excRepCountPerSet.value,
    excTimePerSetInSec: exc_time_per_set_in_sec.value,
    exerciseTargets,
  }

  try {
    // exercise 등록하는 api 호출
    const firstApiResponse = await ApiClient.post('/exercises', values)
    console.log(firstApiResponse)

    // exercise에 등록된 exc_seq 가져오기
    const excSeq = firstApiResponse.excSeq
    // header 코드
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    // 파일 업로드 함수를 만듭니다.
    const uploadFile = async (file, type, customName) => {
      const formData = new FormData()
      // 확장자 분리 및 파일 이름 재조합
      const splitFileName = file.name.split('.')
      const extension = splitFileName.pop()

      const fileNameMapping = {
        model: `ai_model_${excSeq}.${extension}`,
        preview: `preview_video_${excSeq}.${extension}`,
        view: `exercise_video_${excSeq}.${extension}`,
        view_row_qual: `low_quality_preview_video_${excSeq}.${extension}`,
        mp3: `guide_message_${excSeq}.${extension}`,
      }
      const fileName = customName
        ? `${customName}_${excSeq}.${extension}`
        : `${splitFileName.join('.')}_${excSeq}.${extension}`

      formData.append('file', file, fileName)
      // FormData 내용 확인
      console.log('파일명 : ', fileName)
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
        if (pair[1] instanceof File) {
          console.log('File Details:')
          console.log('Name: ', pair[1].name)
          console.log('Size: ', pair[1].size)
          console.log('Type: ', pair[1].type)
        }
      }
      try {
        const secondApiResponse = await ApiClient.post(
          `/api/hyunfit/${type}`,
          formData,
          config,
          'fs'
        )
        console.log(`Uploaded ${type}: ${secondApiResponse}`)
        // Promise를 반환, 성공 또는 실패를 상위 함수에게 전달
        return Promise.resolve()
      } catch (error) {
        console.log(`Failed to upload ${type}`, error)
        return Promise.reject(error)
      }
    }

    // 파일 업로드 작업을 모두 기다림
    await Promise.all([
      uploadFile(files_exc_model.value[0], 'model', 'ai_model'),
      uploadFile(files_exc_preview.value[0], 'file', 'preview_video'),
      uploadFile(files_exc_view.value[0], 'file', 'exercise_video'),
      uploadFile(
        files_exc_view_row_qual.value[0],
        'file',
        'low_quality_preview_video'
      ),
      uploadFile(files_exc_mp3.value[0], 'file', 'guide_message'),
    ])

    alert('등록 성공!')
    router.push(pathNames.boExcBoardPage)
  } catch (error) {
    console.error(error)
    console.error(error.response.data)
    alert('등록 실패!')
  }
}
const rules = {
  nonEmpty: value => {
    return !!value || '필수항목입니다.'
  },
  hasElement: li => {
    return !!li.length || '최소 한 개의 운동 부위가 선택되어야 합니다.'
  },
  hasFile: li => {
    return !!li.length || '데이터가 입력되어야 합니다.'
  },
  gtZero: value => {
    return (value && value > 0) || '값이 0보다 커야 합니다.'
  },
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
<style scoped>
.col-1 {
  width: 150px;
  margin-left: 10px;
  margin-bottom: 13px;
}
.v-text-field {
  width: 330px;
}
.v-radio-group .v-input__control {
  width: 300px;
}
.file-input-wrap {
  display: flex;
  justify-content: space-between;
}
.file-input {
  width: 550px;
}
.label-wrap {
  width: 150px;
}
.bo-excNew-banner {
  //background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  background-color: #434a54;
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
  height: 200px;
}
</style>
