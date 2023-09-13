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
            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">운동 이름</p>
              <v-text-field
                v-model="exc_name"
                clearable
                maxlength="20"
                placeholder="20자 내로 작성하세요"
                hide-details
              ></v-text-field>
            </div>

            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">운동 설명</p>
              <v-container>
                <v-textarea
                  v-model="exc_content"
                  clearable
                  placeholder="50자 내로 작성하세요"
                  maxlength="50"
                  single-line
                ></v-textarea
              ></v-container>
            </div>

            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">운동 종류</p>
              <BoRadioButton :options="radioOptions1" v-model="exc_type" />
            </div>

            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">운동 난이도</p>
              <BoRadioButton
                :options="radioOptions2"
                v-model="exc_difficulty"
              />
            </div>

            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">1회당 칼로리 소모량</p>
              <v-text-field
                v-model="exc_calories_per_rep"
                type="number"
                clearable
                placeholder="1회당 칼로리 소모량"
                hide-details
              ></v-text-field>
            </div>

            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">지정할 세트 수</p>
              <v-text-field
                v-model="exc_set_count"
                counter
                clearable
                label=""
                maxlength="20"
                placeholder="지정할 세트 수"
                hide-details
              ></v-text-field>
            </div>

            <div class="flex border-dashed border-4 border-green-400">
              <p class="col-1">운동에 대해 지정한 세트당 시간</p>
              <v-text-field
                v-model="exc_time_per_set_in_sec"
                counter
                clearable
                label=""
                maxlength="20"
                placeholder="운동에 대해 지정한 세트당 시간"
                hide-details
              ></v-text-field>
            </div>

            <div>
              <div class="flex items-center">
                <p class="col-1">운동 부위</p>
                <v-container>
                  <v-select
                    v-model="selectedBodyPart"
                    :items="items"
                    chips
                    clearable
                    hide-details
                    label="부위"
                    multiple
                    bg-color="white"
                  ></v-select
                ></v-container>
              </div>
            </div>
            <div class="w-full">
              <div class="flex w-full">
                <div v-if="selectedBodyParts.length > 0">
                  <div
                    v-for="(bodyPart, index) in selectedBodyParts"
                    :key="index"
                  >
                    <div class="flex w-full items-center mt-2 mb-2">
                      <p class="col-1">{{ bodyPart }} 가중치</p>
                      <div class="w-96">
                        <v-slider
                          v-model="bodyPartWeights[bodyPart]"
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
                              v-model="bodyPartWeights[bodyPart]"
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
            <div class="border-4 border-dashed border-purple-600">
              파일 업로드 구간
              <div>
                <BoFileInput
                  v-model="file_test"
                  label="모델 데이터"
                  prependIcon="mdi-cloud-arrow-up"
                ></BoFileInput>
              </div>
              <div>
                <BoFileInput
                  v-model="file_test"
                  label="운동 프리뷰"
                  prependIcon="mdi-video-image"
                ></BoFileInput>
              </div>
              <div>
                <BoFileInput
                  v-model="file_test"
                  label="운동 영상"
                  prependIcon="mdi-video-check"
                ></BoFileInput>
              </div>
              <div>
                <BoFileInput
                  v-model="file_test"
                  label="음성파일"
                  prependIcon="mdi-music-box-multiple-outline"
                ></BoFileInput>
              </div>
              <CloudArrowUpSvg size="24" color="blue" />
              <button @click="fileShow">click-me</button>
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
import { CloudArrowUpSvg } from '/src/module/@base/svg'
import { BoFileInput, BoRadioButton } from '/src/module/bo/exc/components'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/link1' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/bo-excNew' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]

const items = ref([
  '가슴',
  '등',
  '광배',
  '승모',
  '어깨',
  '이두',
  '삼두',
  '복근',
  '기립근',
  '대퇴사두',
  '종아리',
])
const selectedBodyParts = ref([]) // 선택한 부위를 저장할 배열
const bodyPartWeights = ref({}) // 부위별 가중치를 저장할 객체
onMounted(() => {
  console.log(selectedBodyParts.value)
  console.log(bodyPartWeights.value)
  console.log(items.value) // items 배열을 콘솔에 출력
})
//파일 데이터
const files_exc_model = ref([])
const files_exc_preview = ref([])
const files_exc_view = ref([])
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

const submit = async () => {
  const values = {
    excName: exc_name.value,
    admSeq: '1',
    excContent: exc_content.value,
    excType: exc_type.value,
    excDifficulty: exc_difficulty.value,
    excCaloriesPerRep: exc_calories_per_rep.value,
    excSetCount: 10,
    excUrl: 'hi',
    excTimePerSetInSec: exc_time_per_set_in_sec.value,
  }
  try {
    const response = await axios.post('http://localhost:8080/exercises', values)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }

  alert(JSON.stringify(values, null, 2))
}
</script>

<style scope>
.col-1 {
  width: 120px;
}
.v-input__prepend {
  width: 80px;
}
</style>
