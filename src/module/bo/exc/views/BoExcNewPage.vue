<template lang="">
  <BaseContainer>
    <BaseSideBar
      :sidebarHeader="sidebarHeader"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="제일큰 pt-10 border-dashed border-4 border-blue-400">
        <div
          class="루틴목록이랑검색창있는div flex justify-between border-dashed border-4 border-yellow-400"
        >
          <div class="text-2xl font-bold">운동 등록</div>
        </div>
        <form @submit.prevent="submit">
          <div>
            <div
              class="exc-content-wrap border-4 border-green-400 border-dashed"
            >
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
              <div class="flex">
                <div class="flex items-center mt-4">
                  <p class="col-1">운동 종류</p>
                  <BoRadioButton :options="radioOptions1" v-model="exc_type" />
                </div>

                <div class="flex items-center mt-4">
                  <p class="col-1">운동 난이도</p>
                  <BoRadioButton
                    :options="radioOptions2"
                    v-model="exc_difficulty"
                  />
                </div>
              </div>
              <div class="flex">
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
              <div class="flex">
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
            <div
              class="exc-target-wrap border-4 border-dashed border-fuchsia-500"
            >
              <div class="">
                <div class="flex items-center mt-4">
                  <p class="col-1">운동 부위</p>
                  <v-container>
                    <v-select
                      v-model="selectedBodyParts"
                      :items="target_items"
                      chips
                      clearable
                      hide-details
                      label="부위"
                      multiple
                      bg-color="white"
                    ></v-select>
                  </v-container>
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
            <div class="flex flex-col border-4 border-dashed border-purple-600">
              파일 업로드 구간
              <div class="flex items-center mb-2">
                <CloudArrowUpSvg size="30" color="gray" />
                <BoFileInput
                  v-model="files_exc_model"
                  label="모델 데이터"
                  prependIcon="none"
                ></BoFileInput>

                <PictureSvg size="30" color="gray" />
                <BoFileInput
                  v-model="files_exc_preview"
                  label="운동 프리뷰 영상"
                ></BoFileInput>
              </div>
              <div>
                <BoFileInput
                  v-model="files_exc_view"
                  label="운동 영상"
                ></BoFileInput>
              </div>
              <div>
                <BoFileInput
                  v-model="files_exc_view_row_qual"
                  label="썸네일 운동 영상"
                ></BoFileInput>
              </div>
              <div>
                <BoFileInput
                  v-model="files_exc_mp3"
                  label="음성파일"
                ></BoFileInput>
              </div>
            </div>
          </div>
          <v-btn type="submit">등록하기</v-btn>
        </form>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import {
  BaseBodyWrapper,
  BaseContainer,
  BaseSideBar,
} from '/src/module/@base/views'
import { CloudArrowUpSvg, PictureSvg } from '/src/module/@base/svg'
import { BoFileInput, BoRadioButton } from '/src/module/bo/exc/components'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { token } from './config.js'

const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/link1' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/bo-excNew' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]

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
  { label: '헬스', value: '1' },
  { label: '요가', value: '2' },
]
// 운동 난이도
const radioOptions2 = [
  { label: '상', value: '3' },
  { label: '중', value: '2' },
  { label: '하', value: '1' },
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
    const response = await axios.post('http://localhost:8080/exercises', values)
    console.log(response.data)

    // exercise에 등록된 exc_seq 가져오기
    const excSeq = response.data.excSeq
    // header 코드
    const config = {
      headers: {
        token: token,
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
        const response = await axios.post(
          `http://ryulrudaga.com:48000/api/firemen/${type}`,
          formData,
          config
        )
        console.log(`Uploaded ${type}: ${response.data}`)
      } catch (error) {
        console.log(`Failed to upload ${type}`, error)
      }
    }

    // 각 파일을 업로드합니다.
    await uploadFile(files_exc_model.value[0], 'model')
    await uploadFile(files_exc_preview.value[0], 'file')
    await uploadFile(files_exc_view.value[0], 'file')
    await uploadFile(files_exc_view_row_qual.value[0], 'file')
    await uploadFile(files_exc_mp3.value[0], 'file')

    alert('등록 성공!')
  } catch (error) {
    console.error(error)
    console.error(error.response.data)
    alert('등록 실패!')
  }

  alert(JSON.stringify(values, null, 2))
}
</script>

<style scope>
.col-1 {
  width: 200px;
}
.v-input__prepend {
  width: 1px;
}
</style>
