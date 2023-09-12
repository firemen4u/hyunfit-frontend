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
        <div>
          <div class="flex border-dashed border-4 border-green-400">
            <p class="col-1">운동 이름</p>
            <v-text-field
              counter
              clearable
              label=""
              maxlength="20"
              placeholder="20자 내로 작성하세요"
              hide-details
            ></v-text-field>
          </div>

          <div class="flex border-dashed border-4 border-green-400">
            <p class="col-1">운동 설명</p>
            <v-container>
              <v-textarea
                counter
                clearable
                label=""
                placeholder="50자 내로 작성하세요"
                maxlength="50"
                single-line
              ></v-textarea
            ></v-container>
          </div>
          <div>
            <div class="flex items-center">
              <p class="col-1">운동 부위</p>
              <v-container>
                <v-select
                  v-model="selectedBodyParts"
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
            <button @click="fileShow">click-me</button>
          </div>
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
import BasePagination from '/src/module/@base/components/BasePagination.vue'
const sidebarHeader = '관리페이지'
const mainCategory = 'AI 트레이닝'
const subcategories = [
  { id: 1, title: '운동 관리', link: '/link1' },
  { id: 2, title: '루틴 관리', link: '/bo-rtnboard' },
  { id: 3, title: '운동 등록', link: '/bo-excNew' },
  { id: 4, title: '루틴 등록', link: '/link4' },
]
import { ref, onMounted } from 'vue'

const items = ref(['가슴', '등', '어깨', '팔'])
const selectedBodyParts = ref([]) // 선택한 부위를 저장할 배열
const bodyPartWeights = ref({}) // 부위별 가중치를 저장할 객체
onMounted(() => {
  console.log(selectedBodyParts.value)
  console.log(bodyPartWeights.value)
  console.log(items.value) // items 배열을 콘솔에 출력
})
const files_exc_model = ref([])
const files_exc_preview = ref([])
const files_exc_view = ref([])
const files_exc_mp3 = ref([])
const file_test = ref([])

import BoFileInput from '/src/module/bo/exc/components/BoFileInput.vue'

const fileShow = () => {
  console.log('클릭미')
  console.log(file_test.value)
  console.log(files_exc_model.value)
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
