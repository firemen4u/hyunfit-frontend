<script setup>
import DumbbellSvg from '@/module/@base/svg/DumbbellSvg.vue'
import RewardSvg from '@/module/@base/svg/RewardSvg.vue'
</script>

<template>
  <div class="report-exc-timeline-container my-15">
    <div class="report-title">운동 히스토리</div>
    <div
      v-for="d in 2"
      :key="d"
      class="p-4 mb-4 bg-white shadow-lg border-gray-100 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <time class="text-lg font-semibold text-gray-900 dark:text-white"
        >2023년 8월 1{{ 2 - d }}일</time
      >
      <ol
        class="relative border-l border-gray-200 dark:border-gray-700 mt-5 ml-4"
      >
        <li v-for="i in 3" :key="i" class="ml-6" :class="i < 3 ? 'mb-5' : ''">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
          >
            <DumbbellSvg :size="15" />
          </span>
          <h3
            class="flex items-center text-md font-semibold text-gray-900 dark:text-white"
          >
            <div class="mr-2">프로그램1</div>

            <span
              class="flex items-center border-1.5 border-gray-200 rounded-full text-sm font-semibold text-gray-700 px-2 py-1 mr-1"
            >
              <RewardSvg :size="14"></RewardSvg>

              <div class="text-xxs ml-0.5">경험치 150</div>
            </span>
          </h3>
          <div
            class="text-sm font-normal leading-none text-gray-400 dark:text-gray-500 my-2"
          >
            20:{{ i * 10 }} ~ 20:{{ i * 15 }}
          </div>
          <p
            v-for="j in 3"
            :key="j"
            class="mb-1 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            사이드 레터럴 레이즈{{ j }}
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped></style>
