<script setup>
import { Swiper } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
// import required modules
import { Navigation, Pagination } from 'swiper/modules'
import router, { pathNames } from '@/router'

const props = defineProps({
  title: String,
  count: String,
  seeMore: Boolean,
})

let numCardsPerPage = 5
if (props.count) {
  numCardsPerPage = props.count
}
let seed = Math.floor(Math.random() * 10000000)
let modules = [Navigation, Pagination]
let pagination = {
  el: `.swiper-pagination${seed}`,
  clickable: true,
  dynamicBullets: true,
}
let navigation = {
  nextEl: `.swiper-button-next${seed}`,
  prevEl: `.swiper-button-prev${seed}`,
}
</script>

<template>
  <div class="card-container relative">
    <div class="flex justify-between">
      <div class="pl-1 text-2xl font-extrabold">
        {{ title }}
      </div>
      <div
        v-if="seeMore"
        class="self-end cursor-pointer"
        @click="router.push(pathNames.trnSearch)"
      >
        전체보기
      </div>
    </div>
    <swiper
      :slidesPerView="numCardsPerPage"
      :spaceBetween="10"
      :pagination="pagination"
      :navigation="navigation"
      :modules="modules"
      class="mySwiper px-1"
    >
      <slot></slot>
    </swiper>
    <div
      class="swiper-button-next swiper-navBtn elevation-3"
      :class="['swiper-button-next' + seed]"
    ></div>
    <div
      class="swiper-button-prev swiper-navBtn elevation-3"
      :class="['swiper-button-prev' + seed]"
    ></div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<style>
.relative {
  position: relative;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  display: none;
}
.swiper-button-next {
  position: absolute;
  left: 98%;
  top: 55%;
}
.swiper-button-prev {
  position: absolute;
  left: -1%;
  top: 55%;
}
.swiper-navBtn {
  color: #000;
  height: 32px;
  width: 32px;
  background: #ffffff;
  border-radius: 50%;
}
.swiper-navBtn::before,
.swiper-navBtn::after {
  font-size: 12px;
}
.swiper-pagination-bullet {
  background-color: #000;
}
@media screen and (max-width: 768px) {
  .swiper-navBtn {
    display: none;
  }
}
</style>
