<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
import MainBanner from '@/module/main/components/MainBanner.vue'
import MainRtnCard from '@/module/main/components/MainRtnCard.vue'

import MainSwipableCardContainer from '/src/module/main/components/MainSwipableCardContainer.vue'
import MainTrnCard from '/src/module/main/components/MainTrnCard.vue'
import MainFoodCard from '/src/module/main/components/MainFoodCard.vue'
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

let foods = [
  {
    title: '',
    imgSrc:
      'https://tohomeimage.thehyundai.com/PD/PDImages/O/3/7/0/O02110055073_01.png?RS=720x864',
    price: '',
    priceDiscounted: '',
  },
  {
    title: '',
    imgSrc:
      'https://tohomeimage.thehyundai.com/PD/PDImages/O/3/7/0/O02110055073_01.png?RS=720x864',
    price: '',
    priceDiscounted: '',
  },
  {
    title: '',
    imgSrc:
      'https://tohomeimage.thehyundai.com/PD/PDImages/O/3/7/0/O02110055073_01.png?RS=720x864',
    price: '',
    priceDiscounted: '',
  },
  {
    title: '',
    imgSrc:
      'https://tohomeimage.thehyundai.com/PD/PDImages/O/3/7/0/O02110055073_01.png?RS=720x864',
    price: '',
    priceDiscounted: '',
  },
  {
    title: '',
    imgSrc:
      'https://tohomeimage.thehyundai.com/PD/PDImages/O/3/7/0/O02110055073_01.png?RS=720x864',
    price: '',
    priceDiscounted: '',
  },
]
</script>

<template>
  <BaseContainer :footer="false">
    <MainBanner></MainBanner>
    <BaseBodyWrapper>
      <section class="mt-20">
        <MainSwipableCardContainer
          title="최승열님! 이런 루틴은 어떠세요?"
          count="4"
        >
          <swiper-slide v-for="(card, i) in cards" :key="i">
            <MainRtnCard
              :title="card.title"
              :src="card.src"
              card-size="lg"
            ></MainRtnCard>
          </swiper-slide>
        </MainSwipableCardContainer>
      </section>
      <section class="mt-20">
        <MainSwipableCardContainer title="지금 인기있는 트레이너" see-more>
          <swiper-slide v-for="(card, i) in cards" :key="i">
            <MainTrnCard
              color="bg-gray-50"
              :title="card.title"
              :src="card.src"
            ></MainTrnCard>
          </swiper-slide>
        </MainSwipableCardContainer>
      </section>
      <section class="mt-20">
        <MainSwipableCardContainer title="양석진님만을 위한 마약" count="4">
          <swiper-slide v-for="(food, i) in foods" :key="i">
            <MainFoodCard
              title="곤드레 단백질 쉐이크"
              :src="food.imgSrc"
              card-size="lg"
            ></MainFoodCard>
          </swiper-slide>
        </MainSwipableCardContainer>
      </section>
      <section class="mt-20"></section>
    </BaseBodyWrapper>
  </BaseContainer>
</template>

<style>
.text-container {
  max-height: 300px;
  background-image: url('/src/assets/images/exercise-thumbnail.png');
  background-repeat: repeat;
}

.test {
  /* background-color: rgba(49, 49, 49, 0.3); */
  backdrop-filter: blur(5px);
  width: 500px;
  height: 100px;
}
</style>
