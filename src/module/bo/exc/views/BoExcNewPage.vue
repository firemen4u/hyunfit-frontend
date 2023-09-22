<template>
  <BaseContainer category="admin">
    <BaseBodyWrapper>
      <div class="pt-10">
        <div class="flex justify-between">
          <div class="text-2xl font-bold">운동 등록</div>
        </div>
        <form @submit.prevent="submit">
          <div>
            <div class="exc-content-wrap">
              <div class="flex items-center">
                <p class="col-1">운동 이름</p>
                <v-text-field
                  v-model="exc_name"
                  clearable
                  maxlength="20"
                  placeholder="20자 내로 작성하세요"
                  hide-details
                  variant="solo"
                ></v-text-field>
              </div>

              <div class="flex items-center mt-4">
                <p class="col-1">운동 설명</p>
                <v-textarea
                  v-model="exc_content"
                  clearable
                  placeholder="50자 내로 작성하세요"
                  maxlength="50"
                  variant="solo"
                  single-line
                ></v-textarea>
              </div>
              <div class="flex justify-between">
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
              </div>
              <div class="flex justify-between">
                <div class="flex items-center mt-4">
                  <p class="col-1">1회당 칼로리 소모량</p>
                  <v-text-field
                    v-model="exc_calories_per_rep"
                    type="number"
                    clearable
                    placeholder="1회당 칼로리 소모량"
                    hide-details
                    variant="solo"
                    suffix="kcal"
                  ></v-text-field>
                </div>

                <div class="flex items-center mt-4">
                  <p class="col-1">지정할 세트 수</p>
                  <v-text-field
                    v-model="exc_set_count"
                    type="number"
                    clearable
                    placeholder="지정할 세트 수"
                    hide-details
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
                    hide-details
                    variant="solo"
                    suffix="회"
                  ></v-text-field>
                </div>

                <div class="flex items-center mt-4">
                  <p class="col-1">세트당 시간</p>
                  <v-text-field
                    v-model="exc_time_per_set_in_sec"
                    clearable
                    placeholder="운동에 대해 지정한 세트당 시간"
                    hide-details
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
                    hide-details
                    label="부위"
                    multiple
                    bg-color="white"
                    class=""
                  ></v-select>
                </div>
              </div>
              <div class="">
                <div class="">
                  <div v-if="selectedBodyParts.length > 0">
                    <div
                      v-for="(bodyPart, index) in selectedBodyParts"
                      :key="index"
                    >
                      <div class="flex w-full items-center mt-2 mb-2">
                        <p class="col-1">{{ bodyPart }} 가중치</p>
                        <div class="w-96">
                          <v-slider
                            v-model="
                              bodyPartWeights[target_items_mapping[bodyPart]]
                            "
                            color="#d23361"
                            track-color="pink"
                            thumb-color="red"
                            :max="100"
                            :step="10"
                            hide-details
                            show-ticks="always"
                            :label="bodyPart"
                            style="width: 800px"
                            ><template v-slot:append>
                              <v-text-field
                                v-model="
                                  bodyPartWeights[
                                    target_items_mapping[bodyPart]
                                  ]
                                "
                                hide-details
                                type="number"
                                style="width: 80px"
                                density="compact"
                                variant="outlined"
                              ></v-text-field> </template
                          ></v-slider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <hr />
              <p class="mt-8 mb-8 font-bold text-lg">운동 데이터 업로드</p>
              <div class="flex items-center mb-4">
                <CloudArrowUpSvg :size="30" color="gray" />
                <BoExcFileInput
                  v-model="files_exc_model"
                  label="모델 데이터"
                ></BoExcFileInput>
              </div>
              <div class="flex items-center mb-4">
                <PictureSvg :size="30" color="gray" />
                <BoExcFileInput
                  class="mr-4"
                  v-model="files_exc_preview"
                  label="운동 프리뷰 영상"
                ></BoExcFileInput>

                <PictureSvg :size="30" color="gray" />
                <BoExcFileInput
                  v-model="files_exc_view"
                  label="운동 영상"
                ></BoExcFileInput>
              </div>
              <div class="flex items-center mb-4">
                <PictureSvg :size="30" color="gray" />
                <BoExcFileInput
                  class="mr-4"
                  v-model="files_exc_view_row_qual"
                  label="썸네일 운동 영상"
                ></BoExcFileInput>
                <PictureSvg :size="30" color="gray" />
                <BoExcFileInput
                  v-model="files_exc_mp3"
                  label="음성파일"
                ></BoExcFileInput>
              </div>
            </div>
          </div>
          <div class="text-center mt-10 mb-10">
            <v-btn type="submit" class="bg-primary w-48 h-36">등록하기</v-btn>
          </div>
        </form>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { CloudArrowUpSvg, PictureSvg } from '/src/module/@base/svg'
import { BoExcFileInput, BoExcRadioButton } from '/src/module/bo/exc/components'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  FILE_SERVER_TOKEN,
  FILE_SERVER_HYUNFIT_URL,
  BACKEND_API_BASE_URL,
} from '/src/config.js'
import ApiClient from '/src/services/api'

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
const exc_type = ref('')
const exc_difficulty = ref('')
const exc_calories_per_rep = ref('')
const exc_time_per_set_in_sec = ref('')
const exc_set_count = ref('')
const excRepCountPerSet = ref('')

const submit = async () => {
  const exerciseTargets = selectedBodyParts.value.map(bodyPart => ({
    exctgArea: target_items_mapping[bodyPart],
    exctgWeight: bodyPartWeights.value[target_items_mapping[bodyPart]] * 0.01,
  }))
  const values = {
    excName: exc_name.value,
    admSeq: '1',
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
    const firstApiResponse = await ApiClient.post(
      `${BACKEND_API_BASE_URL}/exercises`,
      values
    )
    console.log(firstApiResponse.data)

    // exercise에 등록된 exc_seq 가져오기
    const excSeq = firstApiResponse.data.excSeq
    // header 코드
    const config = {
      headers: {
        token: FILE_SERVER_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
    }

    // 파일 업로드 함수를 만듭니다.
    const uploadFile = async (file, type) => {
      const formData = new FormData()
      // 확장자 분리 및 파일 이름 재조합
      const splitFileName = file.name.split('.')
      const extension = splitFileName.pop()
      const fileName = `${splitFileName.join('.')}_${excSeq}.${extension}`

      formData.append('file', file, fileName)
      // FormData 내용 확인
      console.log(fileName)
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
          `${FILE_SERVER_HYUNFIT_URL}/${type}`,
          formData,
          config
        )
        console.log(`Uploaded ${type}: ${secondApiResponse.data}`)
        // Promise를 반환, 성공 또는 실패를 상위 함수에게 전달
        return Promise.resolve()
      } catch (error) {
        console.log(`Failed to upload ${type}`, error)
        return Promise.reject(error)
      }
    }

    // 파일 업로드 작업을 모두 기다림
    await Promise.all([
      uploadFile(files_exc_model.value[0], 'model'),
      uploadFile(files_exc_preview.value[0], 'file'),
      uploadFile(files_exc_view.value[0], 'file'),
      uploadFile(files_exc_view_row_qual.value[0], 'file'),
      uploadFile(files_exc_mp3.value[0], 'file'),
    ])

    alert('등록 성공!')
    window.location.reload() // 페이지 새로고침
  } catch (error) {
    console.error(error)
    console.error(error.firstApiResponse.data)
    alert('등록 실패!')
  }
}
</script>

<style scoped>
.col-1 {
  width: 200px;
  margin-left: 10px;
}
.v-input__prepend {
  width: 1px;
}
.v-text-field {
  width: 300px;
}
.v-radio-group .v-input__control {
  width: 300px;
}
</style>
