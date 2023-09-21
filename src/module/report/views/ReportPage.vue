<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { Bar, Line } from 'vue-chartjs'
import { Colors } from '/src/common'
import { ref, onMounted, watch, onBeforeMount } from 'vue'
import { CircleCheckSvg, CalorieSvg, TimerSvg } from '@/module/@base/svg'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
import ReportExcTimelineContainer from '@/module/report/components/ReportExcTimelineContainer.vue'
import {
  expChartOptions,
  calorieChartOptions,
} from '@/module/report/services/optionsProvider'
import ReportUiHandler from '@/module/report/services/reportUiHandler'
import ReportApi from '@/module/report/services/reportApi'
import ReportMonthPicker from '@/module/report/components/ReportMonthPicker.vue'
import TrnDetailDateUtils from '@/module/trn-detail/services/trnDetailDateUtils'

let today = new Date('December 26, 2010')
let calorieChart = ref(null)
let expChart = ref(null)
let reportPageDatePickerWrapper = ref(null)

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

const reportData = ref(null)
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

async function init() {
  const now = new Date()
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  let endDate = new Date(now.getFullYear(), now.getMonth(), 1)
  endDate = new Date(endDate.setMonth(endDate.getMonth() + 1))
  const params = TrnDetailDateUtils.toSearchDTO(startDate, endDate)
  reportData.value = await ReportApi.getReport(1, params)

  console.log(reportData.value)
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
})
const reportDate = ref('2023-09')
</script>

<template>
  <BaseContainer>
    <BaseBodyWrapper>
      reportDate: {{ reportDate }}
      <div class="report-summary-container w-full py-10 mb-2">
        <ReportMonthPicker v-model="reportDate" />
        <div class="report-title">리포트</div>
        <div class="report-summary-wrapper flex justify-between">
          <div
            class="report-summary-item h-24 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <div class="text-center font-bold">일별 기록</div>
            <div class="flex items-center justify-evenly w-full mt-2">
              <div class="flex flex-col items-center">
                <div>
                  <CircleCheckSvg :color="Colors.primary" :size="20" />
                </div>
                <div class="font-black text-lg mt-1">1/31</div>
              </div>
              <div class="flex flex-col items-center">
                <div>
                  <CalorieSvg :color="Colors.primary" :size="20" />
                </div>
                <div class="font-black text-lg mt-1">5,125</div>
              </div>
              <div class="flex flex-col items-center">
                <div>
                  <TimerSvg :color="Colors.primary" :size="20" />
                </div>
                <div class="font-black text-lg mt-1">1:31</div>
              </div>
            </div>
          </div>
          <div
            class="report-summary-item h-24 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <div class="text-center flex items-center justify-center">
              <div class="font-bold mr-2">운동 점수/랭킹</div>
              <RewardSvg :size="24" />
            </div>
            <div class="flex items-center justify-center w-full mt-2">
              <div
                class="font-black text-lg mt-1"
                :style="{ color: Colors.primary }"
              >
                320점 / 170등
              </div>
            </div>
          </div>
          <div
            class="report-summary-item h-24 rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <div class="text-center font-bold">운동 성향</div>
            <div class="flex items-center justify-evenly w-full mt-2">
              하체충
            </div>
          </div>
        </div>
      </div>
      <div class="ReportAnatomyContainer w-full py-10 mb-2">
        <div class="report-title">분석</div>
        <div class="flex items-center justify-center rounded-lg shadow-lg py-6">
          <img
            class="h-[400px]"
            src="/src/assets/images/report-human-model.png"
            alt=""
          />
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
                  @click="renderDatePicker()"
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
