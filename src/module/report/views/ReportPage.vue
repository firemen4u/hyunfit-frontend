<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
</script>

<template>
  <BaseContainer>
    <BaseBodyWrapper>
      <div
        class="ReportSummaryContainer w-full py-10 mb-2 border-2 border-red-400"
      >
        <div class="report-title">리포트</div>
      </div>
      <div
        class="ReportAnatomyContainer w-full py-10 mb-2 border-2 border-red-400"
      >
        <div class="report-title">분석</div>
      </div>
      <div
        class="ReportChartContainer w-full py-10 mb-2 border-2 border-red-400"
      >
        <div class="flex justify-between">
          <div class="w-[150px] bg-red-200">
            <div class="report-title">캘린더</div>
          </div>
          <div class="w-[150px] bg-red-200">
            <div class="report-title">칼로리</div>
          </div>
          <div class="w-[150px] bg-red-200">
            <div class="report-title">경험치 변화량</div>
          </div>
        </div>
      </div>
      <div
        class="ReportRtnHistoryContainer w-full py-10 mb-2 border-2 border-red-400"
      >
        <div class="report-title">운동 히스토리</div>
        <div
          class="ReportRtnHistoryItem w-full py-5 mb-2 border-2 border-orange-400"
        >
          ReportRtnHistoryItem
        </div>
        <div
          class="ReportRtnHistoryItem w-full py-5 mb-2 border-2 border-orange-400"
        >
          ReportRtnHistoryItem
        </div>
      </div>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style scoped>
.report-title {
  font-weight: 900;

  /* text-lg */
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem /* 28px */;
}
</style>
