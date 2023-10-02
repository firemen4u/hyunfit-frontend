<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { Bar, Radar, Doughnut } from 'vue-chartjs'
import { Colors } from '/src/common'
import { ref, onMounted, watch, computed, reactive } from 'vue'
import { CircleCheckSvg, CalorieSvg, TimerSvg } from '@/module/@base/svg'
import ReportExcTimelineContainer from '@/module/report/components/ReportExcTimelineContainer.vue'
import {
  calorieChartOptions,
  scoreChartOptions,
  targetChartOptions,
} from '@/module/report/services/optionsProvider'
import ReportUiHandler from '@/module/report/services/reportUiHandler'
import ReportApi from '@/module/report/services/reportApi'
import ReportMonthPicker from '@/module/report/components/ReportMonthPicker.vue'
import BaseCircularLoader from '@/module/@base/components/BaseCircularLoader.vue'
import ExcUtils from '@/module/bo/exc/services/excUtils'
import router, { pathNames } from '@/router'

const calorieChartRef = ref(null)
const targetChartRef = ref(null)
const scoreChartRef = ref(null)

const reportPageDatePickerWrapper = ref(null)
const memberData = ref(null)
const selectedDate = ref(
  new Date(new Date().getFullYear(), new Date().getMonth())
)

const imageLoading = ref(true)
const reportLoading = ref(true)

const reportImageRef = ref(null)
const reportImageUrl = ref(null)

const responseData = ref(null)

const charts = reactive({
  score: reactive({
    ready: ref(false),
    data: ref(null),
  }),
  calorie: reactive({
    ready: ref(false),
    data: ref(null),
  }),
  target: reactive({
    ready: ref(false),
    data: ref(null),
  }),
  date: reactive({
    ready: ref(false),
    data: ref(null),
  }),
})

function divide(n, d) {
  return d === 0 ? 0 : n / d
}
function getAllDatesInMonthAsTimestamp(selectedDate) {
  const startDate = new Date(selectedDate)
  const dates = []
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1) // Month is 0-indexed, so subtract 1
  for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date).getTime()) // Push a new Date object to avoid reference issues
  }
  return dates
}

function onClickLoadReport(date) {
  selectedDate.value = date
  loadReport()
}
async function loadReport() {
  const watchCalorieChart = watch(
    () => calorieChartRef.value?.chart,
    () => {
      if (calorieChartRef.value?.chart) {
        calorieChartRef.value.chart.resize(650, 175)
        watchCalorieChart()
      }
    }
  )
  const watchTargetChart = watch(
    () => targetChartRef.value?.chart,
    () => {
      if (targetChartRef.value?.chart) {
        targetChartRef.value.chart.resize(350, 350)
        watchTargetChart()
      }
    }
  )
  const watchScoreChart = watch(
    () => scoreChartRef.value?.chart,
    () => {
      if (scoreChartRef.value?.chart) {
        scoreChartRef.value.chart.resize(300, 140)
        watchScoreChart()
      }
    }
  )
  imageLoading.value = true
  reportLoading.value = true

  charts.date.ready = false
  charts.calorie.ready = false
  charts.score.ready = false
  charts.target.ready = false

  await getReportData(memberData.value.mbrSeq, selectedDate.value)

  renderCharts()
  await getReportImage()
}
function renderCharts() {
  charts.date.data = responseData.value.exerciseHistory.exercisedDays
  ReportUiHandler.renderDatePicker(
    reportPageDatePickerWrapper,
    charts.date.data
  )
  charts.date.ready = true

  let total =
    reportData.value?.counts.excellent +
    reportData.value?.counts.good +
    reportData.value?.counts.bad

  charts.score.data = {
    labels: ['Excellent', 'Good', 'Bad'],
    datasets: [
      {
        backgroundColor: ['#185492', '#6dacee', '#afafaf'],
        data: [
          divide(reportData.value?.counts.excellent, total),
          divide(reportData.value?.counts.good, total),
          divide(reportData.value?.counts.bad, total),
        ],
      },
    ],
  }
  charts.score.ready = true

  const timestampMap = {}
  reportData.value?.records.forEach(record => {
    let d = new Date(record.day)
    let ts = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
    timestampMap[ts] = record.calories
  })
  let timestamps = getAllDatesInMonthAsTimestamp(selectedDate.value)
  charts.calorie.data = {
    labels: timestamps,
    datasets: [
      {
        label: '칼로리 소모량',
        data: timestamps.map(ts => (ts in timestampMap ? timestampMap[ts] : 0)),
        backgroundColor: 'rgba(24,84,146,0.71)', // Bar의 색상
        borderColor: '#185492',
        borderRadius: 10, // Bar의 border radius 설정
        barThickness: 8,
      },
    ],
  }
  charts.calorie.ready = true

  const targetSummaryData = {
    가슴: 0,
    등: 0,
    어깨: 0,
    코어: 0,
    하체: 0,
    팔: 0,
  }
  let totalCalories = 0
  responseData.value.exerciseHistory.exerciseTargets.forEach(tg => {
    totalCalories += tg.totalCalories
    if ([1, 7].includes(tg.targetArea)) {
      targetSummaryData.등 += tg.totalCalories
    } else if ([6, 8].includes(tg.targetArea)) {
      targetSummaryData.팔 += tg.totalCalories
    } else if ([11, 2].includes(tg.targetArea)) {
      targetSummaryData.코어 += tg.totalCalories
    } else if ([4].includes(tg.targetArea)) {
      targetSummaryData.가슴 += tg.totalCalories
    } else if ([3, 5, 12].includes(tg.targetArea)) {
      targetSummaryData.하체 += tg.totalCalories
    } else if ([9, 10, 13].includes(tg.targetArea)) {
      targetSummaryData.어깨 += tg.totalCalories
    }
  })

  charts.target.data = {
    labels: Object.keys(targetSummaryData),
    datasets: [
      {
        label: '운동량',
        backgroundColor: 'rgba(24,84,146,0.48)',
        borderColor: 'rgba(24,84,146,0.8)',
        pointBackgroundColor: '#185492',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#185492',
        data: Object.values(targetSummaryData).map(v =>
          ((v / totalCalories) * 10).toFixed(1)
        ),
      },
    ],
  }
  charts.target.ready = true
}
async function getReportData(mbrSeq, date) {
  responseData.value = await ReportApi.getReportFor(mbrSeq, date)
  reportLoading.value = false
}

async function getReportImage() {
  if (reportImageUrl.value) URL.revokeObjectURL(reportImageUrl.value)

  let body = {}
  responseData.value.exerciseHistory.exerciseTargets.forEach(tg => {
    body[ExcUtils.mapExcAreaType(tg.targetArea)] = tg.totalCalories
  })

  let image = await ReportApi.createExerciseTargetImage(body)
  reportImageUrl.value = URL.createObjectURL(image)
  imageLoading.value = false
}

function onDatePickerClicked() {
  ReportUiHandler.renderDatePicker(
    reportPageDatePickerWrapper,
    charts.date.data
  )
}
async function loadMemberData() {
  try {
    memberData.value = await ReportApi.getMember()
  } catch (e) {
    console.log('ReportPage: failed to load memberData. Please log in')
    console.log(e)
    await router.push(pathNames.loginPage)
  }
}
onMounted(async () => {
  await loadMemberData()
  if (!memberData.value) return
  await loadReport()
})
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const reportData = computed(() => {
  if (responseData.value === null) return null
  const data = responseData.value.exerciseHistory
  return {
    totalCalories: formatNumberWithCommas(data.totalCalories),
    time: {
      minutes: Math.floor(
        (parseInt(data.totalExerciseTimeSeconds) % 3600) / 60
      ),
      hours: Math.floor(parseInt(data.totalExerciseTimeSeconds) / 3600),
    },
    counts: {
      excellent: data.totalExcellentCount,
      good: data.totalGoodCount,
      bad: data.totalBadCount,
    },
    records: data.dailyRecords,
    level: 65.2,
  }
})
</script>

<template>
  <BaseContainer>
    <div class="primary-background">
      <BaseBodyWrapper>
        <div
          class="flex flex-col items-center bg-gray-50 shadow-lg mt-3 rounded-xl overflow-hidden"
        >
          <div class="training-class-banner py-12 px-10">
            <p class="text-4xl font-black mt-5 text-[#021f3d]">
              트레이닝 리포트
            </p>
            <p class="text-2xl font-bold mt-5 text-[#021f3d]">
              운동 기록을 한눈에 확인해보세요.
            </p>
          </div>
          <div class="px-10 w-full">
            <div class="report-summary-container mt-6 mb-2">
              <ReportMonthPicker
                :model-value="selectedDate"
                @search="d => onClickLoadReport(d)"
              />
              <div class="report-summary-wrapper flex justify-between my-5">
                <div
                  class="report-summary-item bg-white h-40 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <div class="report-title text-center mb-2 mt-3">
                    이번 달 기록
                  </div>
                  <base-circular-loader
                    class="h-16"
                    :loading="reportLoading"
                    :size="30"
                  >
                    <div
                      class="flex items-center h-16 justify-space-evenly w-full mt-2"
                    >
                      <div class="flex flex-col items-center w-28">
                        <div>
                          <CircleCheckSvg :color="Colors.primary" :size="24" />
                        </div>
                        <div class="flex items-baseline font-semibold">
                          <div class="font-black text-lg">
                            {{ charts.date.data?.length }}
                          </div>
                          <div class="font-semibold text-neutral-700">
                            일 출석
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col items-center w-28">
                        <div>
                          <CalorieSvg :color="Colors.primary" :size="24" />
                        </div>
                        <div class="flex items-baseline">
                          <div class="font-black text-lg">
                            {{ reportData?.totalCalories }}
                          </div>
                          <div
                            class="font-semibold text-sm ml-1 text-neutral-700"
                          >
                            kcal
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-col items-center w-28">
                        <div>
                          <TimerSvg :color="Colors.primary" :size="24" />
                        </div>
                        <div class="flex">
                          <div
                            v-if="reportData?.time.hours"
                            class="flex items-baseline"
                          >
                            <div class="font-black text-lg">
                              {{ reportData?.time.hours }}
                            </div>
                            <div class="font-semibold mr-1 text-neutral-700">
                              시간
                            </div>
                          </div>
                          <div class="flex items-baseline">
                            <div class="font-black text-lg">
                              {{ reportData?.time.minutes }}
                            </div>
                            <div class="font-semibold text-neutral-700">분</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </base-circular-loader>
                </div>
                <div
                  class="report-summary-item h-40 bg-white rounded-lg shadow-lg flex flex-col items-center"
                >
                  <div class="report-title text-center mb-2 mt-3">
                    HyunFit 스코어
                  </div>

                  <base-circular-loader
                    class="h-16"
                    :loading="reportLoading"
                    :size="30"
                  >
                    <div
                      class="flex items-center h-16 justify-space-evenly w-full mt-2"
                    >
                      <div
                        class="flex items-baseline justify-center w-full mt-2"
                        :style="{ color: Colors.primary }"
                      >
                        <div class="font-black text-2xl">
                          {{ reportData?.totalCalories }}
                        </div>
                        <div class="ml-1 font-semibold">P</div>
                      </div>
                    </div>
                  </base-circular-loader>
                </div>
                <div
                  class="report-summary-item h-40 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center"
                >
                  <div class="text-center font-bold"></div>
                  <base-circular-loader
                    class="h-16"
                    :loading="!charts.score.ready"
                    :size="30"
                  >
                    <Doughnut
                      v-if="charts.score.ready"
                      ref="scoreChartRef"
                      :data="charts.score?.data"
                      :options="scoreChartOptions"
                    />
                  </base-circular-loader>
                </div>
              </div>
            </div>
            <div
              class="ReportAnatomyContainer mt-5 mb-2 grid grid-cols-2 gap-[25px] w-full"
            >
              <div class="ReportAnatomyImage">
                <div
                  class="flex flex-col items-center bg-white justify-center rounded-lg shadow-lg py-3 h-[420px]"
                >
                  <div class="report-title">분석</div>
                  <base-circular-loader :loading="imageLoading" :size="30">
                    <img
                      ref="reportImageRef"
                      :src="reportImageUrl"
                      class="h-[350px]"
                      alt=""
                    />
                  </base-circular-loader>
                </div>
              </div>
              <div class="ReportTargetChart">
                <div
                  class="flex flex-col items-center bg-white justify-center rounded-lg shadow-lg py-3 h-[420px]"
                >
                  <div class="report-title">부위별 차트</div>
                  <base-circular-loader
                    :loading="imageLoading"
                    :size="30"
                    class="h-full"
                  >
                    <Radar
                      v-if="charts.target.ready"
                      ref="targetChartRef"
                      :options="targetChartOptions"
                      :data="charts.target.data"
                    />
                  </base-circular-loader>
                </div>
              </div>
            </div>
            <div class="ReportChartContainer w-full mt-5 mb-2">
              <div class="flex justify-between">
                <div class="report-chart-item">
                  <div
                    class="report-chart flex flex-col bg-white rounded-lg shadow-lg report-page-date-picker-wrapper py-2 px-3 items-center"
                    ref="reportPageDatePickerWrapper"
                  >
                    <div class="report-title">캘린더</div>
                    <v-locale-provider locale="ko">
                      <v-date-picker
                        v-model="selectedDate"
                        :display-date="selectedDate"
                        class="report-page-date-picker"
                        hide-actions
                        max-width="100%"
                        color="#185492"
                        :elevation="0"
                        title=""
                        header=""
                        @click="onDatePickerClicked()"
                      />
                    </v-locale-provider>
                  </div>
                </div>
                <div class="report-chart-item-col-2">
                  <div
                    class="report-chart flex flex-col items-center bg-white rounded-lg shadow-lg py-2 px-3"
                  >
                    <div class="report-title">칼로리</div>
                    <Bar
                      v-if="charts.calorie.ready"
                      ref="calorieChartRef"
                      :options="calorieChartOptions"
                      :data="charts.calorie?.data"
                    ></Bar>
                  </div>
                </div>
              </div>
            </div>
            <ReportExcTimelineContainer />
          </div>
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>

<style>
.training-class-banner {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/rm222-mind-14.svg');
  width: 100%;
  background-size: cover;
  background-position-y: -20px;
  height: 200px;
}

.report-chart-item,
.report-summary-item {
  width: 325px;
}
.report-chart-item-col-2,
.report-summary-item-col-2 {
  width: 670px;
}
.report-title {
  font-weight: 900;
  /* text-lg */
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  margin-bottom: 16px;
}
.report-chart {
  height: 240px;
}
.report-summary-container .shadow {
  -moz-box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

.report-page-date-picker-wrapper .report-page-date-picker {
}
.report-page-date-picker-wrapper .v-date-picker-controls {
  display: none;
}
.report-page-date-picker-wrapper .v-picker-title {
  display: none;
}
.report-page-date-picker-wrapper .v-date-picker-header {
  display: none;
}
.report-page-date-picker .v-btn--icon {
  border-radius: 30%;
}
.report-page-date-picker .v-btn__content {
  color: rgba(0, 0, 0, 0);
}
.report-chart.v-btn.v-btn--icon.v-btn--variant-outlined,
.report-chart
  .v-btn.v-btn--icon.bg-transparent.v-btn--density-default.v-btn--size-default {
  background-color: #f1f1f1 !important; /* 활성 색상 설정 */
}
/* 활성 상태일 때의 스타일을 정의합니다. */
.report-chart
  .v-btn.v-btn--active.v-btn--icon.v-btn--density-default.v-btn--size-default.v-btn--variant-flat {
  background-color: #185492 !important; /* 활성 색상 설정 */
}
.report-chart
  .v-btn.v-btn--icon.bg-exercised.v-btn--density-default.v-btn--size-default.v-btn--variant-flat {
  background-color: #185492 !important; /* 활성 색상 설정 */
  opacity: 0.8;
}
.report-page-date-picker .v-date-picker-month {
  padding: 12px;
}
.report-page-date-picker .v-date-picker-month__day {
  height: auto;
  width: auto;
}

.report-page-date-picker .v-date-picker-month__day .v-btn {
  height: 20px;
  width: 20px;
}
.report-page-date-picker .v-date-picker-month {
  min-width: auto;
}
</style>
