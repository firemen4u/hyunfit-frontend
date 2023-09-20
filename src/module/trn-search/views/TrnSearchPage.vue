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

let selectedLessonTypes = ref([])
let selectedGender = ref(null)
let searchKeyword = ref('')
let selectedFilterOptions = computed(() => {
  let genderOption = selectedGender.value ? [selectedGender.value] : []
  return selectedLessonTypes.value.concat(genderOption)
})

let searchOrder = ref('')

let trnSearchResults = ref([])

watch([selectedLessonTypes, selectedGender], () => {
  searchKeyword.value = ''
  search()
})
function resetFilter() {
  selectedLessonTypes.value = []
  selectedGender.value = null
  search()
}

async function search() {
  const params = {
    order: 'FIRE_SCORE',
  }
  if (selectedLessonTypes.value)
    params['trainerTypes'] = selectedLessonTypes.value.join(',')
  if (selectedGender.value)
    params['trnGender'] = TrnSearchUtils.filterCodeToGenderNum(
      selectedGender.value
    )
  if (searchKeyword.value.trim()) params['keyword'] = searchKeyword.value.trim()

  await loadData(params)
}

async function loadData(params = {}) {
  trnSearchResults.value = await TrnSearchApi.getTrainers(params)
}
onBeforeMount(() => {
  loadData()
})
</script>

<template>
  <BaseContainer>
    <BaseBodyWrapper>
      <div class="container">
        <div class="trn-search-section1">
          <p class="trn-search-title text-2xl font-extrabold">
            트레이너 만나보기
          </p>
        </div>
        <div class="trn-search-section2">
          <div class="trn-search-filter-aside">
            <TrnSearchFilterAside @reset="resetFilter">
              <TrnSearchFilterGroup
                title="레슨종류"
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
          <div class="trn-search-container">
            <TrnSearchContainer>
              <template v-slot:search-bar>
                <TrnSearchBar
                  v-model="searchKeyword"
                  @click:search="search()"
                />
              </template>
              <template v-slot:search-order-selector
                ><TrnSearchOrderSelector />
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
  </BaseContainer>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.trn-search-section1 {
  display: flex;
  margin-top: 50px;
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
  width: 30%;
  margin-right: 100px;
}
.trn-search-container {
  width: 70%;
  margin-right: 30px;
}
</style>
