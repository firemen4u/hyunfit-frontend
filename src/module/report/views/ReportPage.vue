<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import { Bar, Line, Doughnut } from 'vue-chartjs'
import { Colors } from '/src/common'
import { ref, onMounted, watch, onBeforeMount, computed } from 'vue'
import { CircleCheckSvg, CalorieSvg, TimerSvg } from '@/module/@base/svg'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
import ReportExcTimelineContainer from '@/module/report/components/ReportExcTimelineContainer.vue'
import {
  expChartOptions,
  calorieChartOptions,
  scoreChartOptions,
} from '@/module/report/services/optionsProvider'
import ReportUiHandler from '@/module/report/services/reportUiHandler'
import ReportApi from '@/module/report/services/reportApi'
import ReportMonthPicker from '@/module/report/components/ReportMonthPicker.vue'
import TrnDetailDateUtils from '@/module/trn-detail/services/trnDetailDateUtils'
import BaseCircularLoader from '@/module/@base/components/BaseCircularLoader.vue'
import ExcUtils from '@/module/bo/exc/services/excUtils'

let today = new Date('December 26, 2010')
let calorieChart = ref(null)
let expChart = ref(null)
let scoreChart = ref(null)
let reportPageDatePickerWrapper = ref(null)
let memberData = ref(null)
let dates = ['2010-12-01', '2010-12-02', '2010-12-05', '2010-12-06']

let expChartData = {
  labels: createDateList(),
  datasets: [
    {
      label: '경험치',
      data: [
        100, 250, 400, 600, 850, 1100, 1350, 1650, 2000, 2450, 2900, 2950, 3000,
        3050, 3200, 5000, 5000, 6000, 6700, 7200, 7700, 8200, 8700, 9200, 9700,
        10200, 10700, 11200, 11700, 14200, 19200,
      ],
      pointBackgroundColor: 'rgb(255,190,210)',
      borderColor: 'rgba(210,51,97,0.57)',
      borderWidth: 2,
      pointRadius: 0,
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    },
  ],
}

let calorieChartData = {
  labels: createDateList(),
  datasets: [
    {
      label: '칼로리 소모량',
      data: [
        479, 789, 235, 621, 312, 154, 785, 374, 502, 167, 921, 443, 628, 845,
        326, 562, 198, 773, 409, 278, 690, 541, 362, 789, 216, 915, 746, 184,
        539, 672, 122,
      ],
      backgroundColor: 'rgba(245,86,132,0.8)', // Bar의 색상
      borderColor: 'rgba(210,51,97,0.57)',
      borderRadius: 10, // Bar의 border radius 설정
    },
  ],
}

const responseData = ref(null)
function createDateList() {
  const startDate = new Date('2023-08-01')
  const endDate = new Date('2023-08-31')
  const dateList = []

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const month = date.getMonth() + 1 // Month is 0-based, so add 1
    const day = date.getDate()
    dateList.push(`${month}월 ${day}일`)
  }

  return dateList
}

async function init() {}

const imageLoading = ref(false)
const reportLoading = ref(false)

const reportImageElem = ref(null)
const reportImageUrl = ref(null)
async function onLoadReport(date) {
  imageLoading.value = true
  reportLoading.value = true

  if (!memberData.value) {
    memberData.value = await ReportApi.getMember()
  }

  await loadReportData(memberData.value.mbrSeq, date)
  await loadImage()
}
async function loadReportData(mbrSeq, date) {
  responseData.value = await ReportApi.getReportFor(mbrSeq, date)
  reportLoading.value = false
}
async function loadImage() {
  if (reportImageUrl.value) URL.revokeObjectURL(reportImageUrl.value)

  let body = {}
  responseData.value.exerciseHistory.exerciseTargets.forEach(tg => {
    body[ExcUtils.mapExcAreaType(tg.targetArea)] = tg.totalCalories
  })

  let image = await ReportApi.createExerciseTargetImage(body)
  reportImageUrl.value = URL.createObjectURL(image)
  imageLoading.value = false
}

async function onDatePickerClicked() {
  ReportUiHandler.renderDatePicker(reportPageDatePickerWrapper, dates)
}
onMounted(() => {
  init()
  ReportUiHandler.renderDatePicker(reportPageDatePickerWrapper, dates)
  const watchCalorieChart = watch(
    () => calorieChart.value.chart,
    newValue => {
      if (newValue !== null) {
        calorieChart.value.chart.resize(350, 200)
        watchCalorieChart()
      }
    }
  )
  const watchExpChart = watch(
    () => expChart.value.chart,
    newValue => {
      if (newValue !== null) {
        expChart.value.chart.resize(350, 200)
        watchExpChart()
      }
    }
  )
  const watchScoreChart = watch(
    () => scoreChart.value.chart,
    newValue => {
      if (newValue !== null) {
        scoreChart.value.chart.resize(350, 140)
        watchScoreChart()
      }
    }
  )
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
    days: data.exercisedDays,
    records: data.dailyRecords,
  }
})

const scoreData = computed(() => {
  let total =
    reportData.value?.counts.excellent +
    reportData.value?.counts.good +
    reportData.value?.counts.bad
  return {
    labels: ['Excellent', 'Good', 'Ok'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [
          reportData.value?.counts.excellent / total,
          reportData.value?.counts.good / total,
          reportData.value?.counts.bad / total,
        ],
      },
    ],
  }
})
</script>

<template>
  <BaseContainer>
    <BaseBodyWrapper>
      {{ reportData }}

      <!--       reportDate: {{ reportData }}-->
      <div class="report-summary-container w-full py-10 mb-2">
        <ReportMonthPicker @search="date => onLoadReport(date)" />
        <div class="report-title">리포트</div>
        <div class="report-summary-wrapper flex justify-between">
          <div
            class="report-summary-item h-44 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <div class="text-center font-bold text-lg mb-2">이번 달 기록</div>
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
                      {{ reportData?.days.length }}
                    </div>
                    <div class="font-semibold text-neutral-700">일 출석</div>
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
                    <div class="font-semibold text-sm ml-1 text-neutral-700">
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
            class="report-summary-item h-44 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <div class="text-center flex items-center justify-center">
              <div class="font-bold text-lg mr-2">휙득한 Hfit-Point</div>
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
                  <div class="ml-1 font-semibold">point</div>
                </div>
              </div>
            </base-circular-loader>
          </div>
          <div
            class="report-summary-item h-44 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <div class="text-center font-bold"></div>
            <base-circular-loader
              class="h-16"
              :loading="reportLoading"
              :size="30"
            >
              <Doughnut
                ref="scoreChart"
                :data="scoreData"
                :options="scoreChartOptions"
              />
              <!--              <div class="flex items-center justify-space-evenly w-full mt-2">-->
              <!--                <div-->
              <!--                  class="flex justify-center w-full"-->
              <!--                  :style="{ color: Colors.primary }"-->
              <!--                >-->
              <!--                  <div class="font-black text-2xl mt-2">ABCD</div>-->
              <!--                </div>-->
              <!--              </div>-->
            </base-circular-loader>
          </div>
        </div>
      </div>
      <div class="ReportAnatomyContainer w-full py-10 mb-2">
        <div class="report-title">분석</div>
        <div
          class="flex items-center justify-center rounded-lg shadow-lg py-6 h-[400px]"
        >
          <base-circular-loader
            :loading="imageLoading"
            :size="30"
            class="h-full"
          >
            <img
              ref="reportImageElem"
              :src="reportImageUrl"
              class="h-[350px]"
              alt=""
            />
          </base-circular-loader>
        </div>
      </div>
      <div class="ReportChartContainer w-full py-10 mb-2">
        <div class="flex justify-between">
          <div class="report-chart-item">
            <div class="report-title">캘린더</div>
            <div
              class="report-chart rounded-lg shadow-lg report-page-date-picker-wrapper py-2 px-3 flex items-center"
              ref="reportPageDatePickerWrapper"
            >
              <v-locale-provider locale="ko">
                <v-date-picker
                  v-model="today"
                  class="report-page-date-picker"
                  hide-actions
                  max-width="100%"
                  color="#D23361"
                  :elevation="0"
                  @click="onDatePickerClicked()"
                />
              </v-locale-provider>
            </div>
          </div>
          <div class="report-chart-item">
            <div class="report-title">칼로리</div>
            <div class="report-chart rounded-lg shadow-lg">
              <Bar
                ref="calorieChart"
                :options="calorieChartOptions"
                :data="calorieChartData"
              ></Bar>
            </div>
          </div>
          <div class="report-chart-item">
            <div class="report-title">경험치 변화량</div>
            <div class="report-chart rounded-lg shadow-lg">
              <Line
                ref="expChart"
                :options="expChartOptions"
                :data="expChartData"
              ></Line>
            </div>
          </div>
        </div>
      </div>
      <ReportExcTimelineContainer />
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style>
.report-chart-item,
.report-summary-item {
  width: 350px;
}
.report-title {
  font-weight: 900;
  /* text-lg */
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
  margin-bottom: 16px;
}
.report-chart {
  height: 200px;
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
.report-chart
  .v-btn.v-btn--icon.bg-transparent.v-btn--density-default.v-btn--size-default.v-btn--variant-flat {
  background-color: #f1f1f1 !important; /* 활성 색상 설정 */
}
/* 활성 상태일 때의 스타일을 정의합니다. */
.report-chart
  .v-btn.v-btn--active.v-btn--icon.v-btn--density-default.v-btn--size-default.v-btn--variant-flat {
  background-color: #d23361 !important; /* 활성 색상 설정 */
}
.report-chart
  .v-btn.v-btn--icon.bg-exercised.v-btn--density-default.v-btn--size-default.v-btn--variant-flat {
  background-color: #f686a6 !important; /* 활성 색상 설정 */
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
