<script setup>
import { BaseBodyWrapper } from '/src/module/@base/views'
import {
  FacebookSvg,
  InstagramSvg,
  YoutubeSvg,
  HyunfitLogoMonoSvg,
} from '/src/module/@base/svg'

let infoData = [
  { href: '', title: '브랜드소개' },
  { href: '', title: '이용약관' },
  { href: '', title: '개인정보처리방침' },
  { href: '', title: '청소년보호정책' },
  { href: '', title: '영상기기운영방침' },
]
</script>

<template>
  <footer class="text-center flex flex-col justify-center w-full items-center">
    <div class="body-wrapper">
      <!-- 상단바 -->
      <div class="util flex items-center justify-between py-4 text-gray-500">
        <!-- 텍스트 -->
        <div class="inner flex items-center">
          <a
            v-for="(info, i) in infoData"
            :key="i"
            href=""
            class="mr-4"
            :class="
              info.title === '개인정보처리방침' ? 'font-black' : 'font-medium'
            "
            >{{ info.title }}</a
          >
        </div>
        <!-- SNS 아이콘 -->
        <div class="icon-container flex items-center">
          <YoutubeSvg :size="30" class="ml-5" color="#9ca3af" />
          <InstagramSvg :size="25" class="ml-5" color="#9ca3af" />
          <FacebookSvg :size="25" class="ml-5" color="#9ca3af" />
        </div>
      </div>
      <hr class="solid" />

      <div class="info flex my-8">
        <!-- 로고 -->
        <div class="text-gray-500 flex flex-column items-start text-sm">
          <div>(주)현핏</div>
          <div class="mt-1">
            대표이사 : 파이어맨 <span class="mx-2">|</span> 주소 : 서울 종로구
            창경궁로 254 코사
          </div>
          <div class="mt-1">
            전화 : 02-1234-5678 <span class="mx-2">|</span> 이메일 :
            firemen4u@github.com
          </div>
          <div class="mt-1">
            사업자 등록번호 : 123-45-67890
            <button type="button" class="underline ml-1">사업자등록확인</button>
          </div>

          <div class="mt-1 mb-5">
            통신판매업자 신고번호 : 2010-파이어맨-01882
          </div>
          <div class="copyright mt-5 opacity-60">
            Copyright © Hyundai Department Store. All rights reserved.
            {{ new Date().getFullYear() }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.body-wrapper {
  width: 100%;
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .body-wrapper {
    width: 80%;
  }
}

@media screen and (min-width: 1200px) {
  .body-wrapper {
    width: 1100px;
  }
}
hr.solid {
  border-top: 1px solid #b0b0b0;
}
.icon-container img {
  max-height: 20px;
}
</style>
