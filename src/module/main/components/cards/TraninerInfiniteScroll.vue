<script setup></script>

<template>
  <div
    class="w-full inline-flex overflow-hidden flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]"
  >
    <ul
      class="infinite-belt flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none"
    >
      <img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://fs.hyunfit.life/api/hyunfit/file/trn_8_profile.jpg"
        alt=""
      />
      <img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://cdn.ize.co.kr/news/photo/202308/57801_72226_175.jpg"
        alt=""
      />
      <img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://i.namu.wiki/i/0FfQ8I_qGESJFVtCr-eNlqFK15ych8RUD5vz27DcE3ZS6fX7B0m8YrTTASPE1aVG-bTEYMaTuC_RNUkzwvi-dQ.webp"
        alt=""
      /><img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://img.sbs.co.kr/newsnet/etv/upload/2021/06/17/30000695831.jpg"
        alt=""
      />
    </ul>
    <ul
      aria-hidden="true"
      class="infinite-belt flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none"
    >
      <img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://fs.hyunfit.life/api/hyunfit/file/trn_8_profile.jpg"
        alt=""
      />
      <img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://cdn.ize.co.kr/news/photo/202308/57801_72226_175.jpg"
        alt=""
      />
      <img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://i.namu.wiki/i/0FfQ8I_qGESJFVtCr-eNlqFK15ych8RUD5vz27DcE3ZS6fX7B0m8YrTTASPE1aVG-bTEYMaTuC_RNUkzwvi-dQ.webp"
        alt=""
      /><img
        class="rounded-full h-24 w-24 object-cover mr-5 border-[2px] border-[#ced1d9] border-solid"
        src="https://img.sbs.co.kr/newsnet/etv/upload/2021/06/17/30000695831.jpg"
        alt=""
      />
    </ul>
  </div>
</template>

<style scoped>
.infinite-belt {
  animation: infinite-scroll 25s linear infinite;
}

@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
