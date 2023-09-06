<template>
  <div class="card-container my-6 relative">
    <div class="pl-1 text-2xl font-extrabold">
      {{ title }}
    </div>
    <swiper
      :slidesPerView="5"
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
<script setup>
import { Swiper } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
// import required modules
import { Navigation, Pagination } from 'swiper/modules'

defineProps({
  title: String,
})

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
