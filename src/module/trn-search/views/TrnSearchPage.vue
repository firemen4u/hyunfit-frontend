<script setup>
import { BaseContainer, BaseBodyWrapper } from '/src/module/@base/views'
import TrnSearchContainer from '../components/TrnSearchContainer.vue'
import TrnSearchFilterAside from '../components/TrnSearchFilterAside.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import TrnSearchFilterGroup from '@/module/trn-search/components/TrnSearchFilterGroup.vue'

import BasePagination from '@/module/@base/components/BasePagination.vue'
import TrnSearchResultContainer from '@/module/trn-search/components/TrnSearchResultContainer.vue'
import TrnSearchBar from '@/module/trn-search/components/TrnSearchBar.vue'
import TrnSearchApi from '@/module/trn-search/stores/trnSearchApi'
import TrnSearchUtils from '@/module/trn-search/services/trnSearchUtils'
import FilterChipGroup from '@/module/trn-search/components/FilterChipGroup.vue'
import TrnSearchOrderSelector from '@/module/trn-search/components/TrnSearchOrderSelector.vue'

const lessonTypeOptions = [
  { label: '퍼스널 트레이닝(PT)', value: 200 },
  { label: '필라테스', value: 201 },
  { label: '요가', value: 202 },
]

const genderOptions = [
  { label: '남자', value: 300 },
  { label: '여자', value: 301 },
  { label: '상관없음', value: 302 },
]

const searchOrderOptions = [
  { name: '추천순', option: 'FIRE_SCORE' },
  { name: '평점 높은순', option: 'RATING' },
  { name: '리뷰 많은순', option: 'REVIEW_COUNT' },
]

let selectedLessonTypes = ref([])
let selectedGender = ref(null)
let searchKeyword = ref('')
let selectedFilterOptions = computed(() => {
  let genderOption = selectedGender.value ? [selectedGender.value] : []
  return selectedLessonTypes.value.concat(genderOption)
})
const loading = ref(false)
let selectedSearchOrder = ref(searchOrderOptions[0])

let trnSearchResults = ref([])

watch([selectedLessonTypes, selectedGender], () => {
  searchKeyword.value = ''
  search()
})
function resetFilter() {
  searchKeyword.value = ''
  selectedLessonTypes.value = []
  selectedGender.value = null
  search()
}

async function search() {
  const params = {
    order: selectedSearchOrder.value.option,
  }
  if (selectedLessonTypes.value)
    params['trainerTypes'] = selectedLessonTypes.value.join(',')
  if (selectedGender.value)
    params['trnGender'] = TrnSearchUtils.filterCodeToGenderNum(
      selectedGender.value
    )
  if (searchKeyword.value.trim()) params['keyword'] = searchKeyword.value.trim()
  loading.value = true
  await loadData(params)
  setTimeout(() => {
    loading.value = false
  }, 500)
}
function updateSearchOrder(selectedOrder) {
  selectedSearchOrder.value = selectedOrder
  search()
}
async function loadData(params = {}) {
  trnSearchResults.value = await TrnSearchApi.getTrainers(params)
}
onBeforeMount(() => {
  loadData({
    order: selectedSearchOrder.value.option,
  })
})
</script>

<template>
  <BaseContainer :loading="loading">
    <div class="w-100 flex justify-center primary-background mb-[150px]">
      <BaseBodyWrapper>
        <div
          class="flex flex-col items-center bg-white shadow-lg mt-3 rounded-xl overflow-hidden"
        >
          <div class="training-class-banner py-12 px-10 mb-5">
            <p class="text-4xl font-black mt-5 text-[#021f3d]">트레이너 찾기</p>
            <p class="text-2xl font-bold mt-5 text-[#021f3d]">
              집에서도 전문 트레이너를 만나볼 수 있어요.
            </p>
          </div>
          <div class="flex justify-between px-10 mt-3 w-full">
            <div class="trn-search-filter-aside">
              <TrnSearchFilterAside @reset="resetFilter">
                <TrnSearchFilterGroup
                  title="클래스 종류"
                  :options="lessonTypeOptions"
                  v-model="selectedLessonTypes"
                  multiple
                />
                <TrnSearchFilterGroup
                  title="트레이너 성별"
                  :options="genderOptions"
                  v-model="selectedGender"
                />
              </TrnSearchFilterAside>
            </div>
            <div class="trn-search-container bg-white">
              <TrnSearchContainer>
                <template v-slot:search-bar>
                  <TrnSearchBar
                    v-model="searchKeyword"
                    @click:search="search()"
                  />
                </template>
                <template v-slot:search-order-selector
                  ><TrnSearchOrderSelector
                    :model-value="selectedSearchOrder"
                    :options="searchOrderOptions"
                    @update:modelValue="order => updateSearchOrder(order)"
                  />
                </template>
                <template v-slot:filter-chip-group>
                  <FilterChipGroup :items="selectedFilterOptions" />
                </template>
                <template v-slot:search-results>
                  <TrnSearchResultContainer :items="trnSearchResults" />
                </template>
                <template v-slot:pagination>
                  <BasePagination />
                </template>
              </TrnSearchContainer>
            </div>
          </div>
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<style scoped>
.training-class-banner {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
  height: 200px;
}

.trn-search-title {
  flex-grow: 1;
  /* border: 4px dotted red; */
  display: flex; /* Flexbox 사용 */
  padding-left: 20px;
  margin-bottom: 50px;
}
.trn-search-section2 {
  display: flex;
  flex-direction: row;
  width: 100%;
  /* border: 4px dotted black; */
  margin-bottom: 70px;
}

.trn-search-filter-aside {
  width: 240px;
  margin-right: 30px;
}
.trn-search-container {
  width: 70%;
}
</style>
