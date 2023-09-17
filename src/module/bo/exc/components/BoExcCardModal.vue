<!-- ExcInfoModal.vue -->
<template>
  <div v-if="show" class="modal" @click="closeModal">
    <div class="modal-content relative" @click.stop>
      <button @click="closeModal" class="absolute right-4 top-2">Close</button>
      <div>
        <img
          class="exc-img mt-4 rounded-md"
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdAJq71%2FbtsteQJsEa7%2FntSCTKbwomKjVIpQusuLwk%2Fimg.jpg"
        />
      </div>
      <div class="modal-sub-wrap">
        <p>excName</p>
        <p>:</p>
        <p>{{ exercise.excName }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excContent</p>
        <p>:</p>
        <p>{{ exercise.excContent }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excType</p>
        <p>:</p>
        <p>{{ exercise.excType }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excDifficulty</p>
        <p>:</p>
        <p>{{ exercise.excDifficulty }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excCaloriesPerRep</p>
        <p>:</p>
        <p>{{ exercise.excCaloriesPerRep }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excNaexcSetCountme</p>
        <p>:</p>
        <p>{{ exercise.excSetCount }}</p>
      </div>
      <div class="modal-sub-wrap flex">
        <p>excRepCountPerSet</p>
        <p>:</p>
        <p>{{ exercise.excRepCountPerSet }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excTimePerSetInSec</p>
        <p>:</p>
        <p>{{ exercise.excTimePerSetInSec }}</p>
      </div>
      <div class="modal-sub-wrap">
        <p>excCreatedDate</p>
        <p>:</p>
        <p>{{ exercise.excCreatedDate }}</p>
      </div>
      <div class="modal-sub-wrap justify-end">
        <p></p>
        <button class="mr-4 rounded-lg">수정</button>
        <button class="mr-0 rounded-lg">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['show', 'exercise'])
const emit = defineEmits([])

const closeModal = () => {
  emit('update:show', false)
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검정색 배경 */
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.modal-content {
  margin-top: 150px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px; /* 원하는 너비로 설정 */
  height: 600px;
  text-align: center;
}
.modal-sub-wrap {
  display: flex;
}
.modal-sub-wrap button {
  background-color: rgb(163, 163, 163);
  padding: 4px;
  color: white;
  display: none;
}
.modal-sub-wrap :first-child {
  text-align: start;
  width: 180px;
  margin-right: 10px;
}
</style>
