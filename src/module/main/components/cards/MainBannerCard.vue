<script setup></script>

<template>
  <div class="banner-background">
    <div class="banner-contents flex flex-col items-baseline mt-8 mr-8">
      <div class="flex items-baseline">
        <div class="mb-2 flex font-semibold">
          <div
            class="font-bold text-[40px] leading-[46px] text-white bg-[#15493d] px-2 rounded mr-1"
          >
            현대
          </div>
        </div>
        <div class="font-bold text-[28px] banner-text">
          인들의 피트니스를 책임지는,
        </div>
        <div class="text-[54px] font-black ml-2 text-[#0d1851]">현핏</div>
      </div>
      <div class="text-xl font-bold">
        AI 분석으로 건강도 챙기고 포인트도 챙기고
      </div>
    </div>

    <!--    <div class="mascot">-->
    <!--      <img-->
    <!--        class="w-[80px]"-->
    <!--        src="https://fs.hyunfit.life/api/hyunfit/file/rend_0001.svg"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<style scoped>
.banner-background {
  background-position-y: -140px;
  transform: scaleX(-1);
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/jogging-banner.jpg');
  //background-image: url('https://www.futurefit.co.uk/wp-content/uploads/2019/08/shutterstock_1557078476-1500x1000.jpg');
  background-size: cover;
  height: 100%;
  width: 100%;
}
.banner-contents {
  transform: scaleX(-1);
}
</style>
