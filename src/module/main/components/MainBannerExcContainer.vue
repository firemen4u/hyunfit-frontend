<template>
  <div class="main-banner-exc-container overflow-y-auto">
    <div v-for="n in 12" :key="n" class="mb-2 w-100 rounded-lg">
      <div class="flex exc-vertical-card rounded-lg">
        <div class="p-4">
          <div class="text-white font-semibold">사이드레터럴레이즈</div>
          <div class="flex items-center text-center text-xs text-gray-400">
            <div>30초</div>
            <div>•</div>
            <div>3세트</div>
          </div>
          <div class="text-sm text-gray-200 mt-1">
            팔을 옆으로 쭉 뻗어 올려 어깨 라인과 어깨 근육 강화에 도움을 줍니다
          </div>
        </div>
        <img
          src="/src/assets/images/exercise-thumbnail.png"
          alt=""
          class="rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
/* Firefox */
.main-banner-exc-container {
  scrollbar-width: thin;
  scrollbar-color: transparent;
}
/* Chrome, Edge, and Safari */
.main-banner-exc-container::-webkit-scrollbar {
  width: 15px;
}

.main-banner-exc-container::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 15px;
}

.main-banner-exc-container::-webkit-scrollbar-thumb {
  background-color: #656565;
  border-radius: 15px;
  background-clip: content-box;
  border: 5px solid transparent;
}
.main-banner-exc-container {
  height: 22rem;
  width: 32rem;
}
.exc-vertical-card {
  background-color: rgba(48, 48, 48, 0.4);
  backdrop-filter: blur(10px);
}
</style>
