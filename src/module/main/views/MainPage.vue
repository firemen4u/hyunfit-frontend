<script setup>
import BaseContainer from '@/module/@base/views/BaseContainer.vue'
import MainBanner from '@/module/main/components/MainBanner.vue'
import MainRtnCard from '@/module/main/components/MainRtnCard.vue'

import MainSwipableCardContainer from '/src/module/main/components/MainSwipableCardContainer.vue'
import MainTrnCard from '/src/module/main/components/MainTrnCard.vue'
import { SwiperSlide } from 'swiper/vue'
import MainRtnSearchCombobox from '@/module/main/components/MainRtnSearchCombobox.vue'

let cards = [
  {
    title: 'Pre-fab homes',
    src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    flex: 4,
  },
  {
    title: 'Favorite road trips',
    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    flex: 4,
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
  },
  {
    title: 'Pre-fab homes',
    src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    flex: 4,
  },
  {
    title: 'Favorite road trips',
    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    flex: 4,
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
  },
  {
    title: 'Pre-fab homes',
    src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    flex: 4,
  },
  {
    title: 'Favorite road trips',
    src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
    flex: 4,
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
  },
  {
    title: 'Best airlines',
    src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
    flex: 4,
  },
]
</script>

<template>
  <MainBanner></MainBanner>
  <MainRtnSearchCombobox></MainRtnSearchCombobox>
  <BaseContainer>
    <section>
      <MainSwipableCardContainer title="나만의 운동 루틴">
        <swiper-slide v-for="(card, i) in cards" :key="i">
          <MainRtnCard :title="card.title" :src="card.src"></MainRtnCard>
        </swiper-slide>
      </MainSwipableCardContainer>
    </section>
    <section>
      <MainSwipableCardContainer title="최승열님! 이런 루틴은 어떠세요?">
        <swiper-slide v-for="(card, i) in cards" :key="i">
          <MainRtnCard :title="card.title" :src="card.src"></MainRtnCard>
        </swiper-slide>
      </MainSwipableCardContainer>
    </section>
    <section>
      <MainSwipableCardContainer title="지금 인기있는 트레이너">
        <swiper-slide v-for="(card, i) in cards" :key="i">
          <MainTrnCard
            color="bg-gray-50"
            :title="card.title"
            :src="card.src"
          ></MainTrnCard>
        </swiper-slide>
      </MainSwipableCardContainer>
    </section>
  </BaseContainer>
</template>

<style></style>
