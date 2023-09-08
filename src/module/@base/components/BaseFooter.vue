<script setup>
import { BaseBodyWrapper } from '/src/module/@base/views'
import { FacebookSvg, InstagramSvg, YoutubeSvg } from '/src/module/@base/svg'
let infoData = [
  { href: '', title: '브랜드소개' },
  { href: '', title: '이용약관' },
  { href: '', title: '개인정보처리방침' },
  { href: '', title: '청소년보호정책' },
  { href: '', title: '영상기기운영방침' },
]
</script>

<template>
  <footer class="text-center flex flex-column w-100 items-center">
    <BaseBodyWrapper>
      <!-- 상단바 -->
      <div class="util flex items-center justify-between py-4 text-white">
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

          <div class="share">
            <!-- <button
              type="button"
              class="btn-youtube"
              onclick="GA_Event('PC_공통', '푸터_SNS', 'youtube'); location.href='https://www.youtube.com/channel/UCiAFKYYJOexSKyKmhEIXDEw?outUrlYn=Y'"
            >
              youtube
            </button>
            <button
              type="button"
              class="btn-facebook"
              onclick="GA_Event('PC_공통', '푸터_SNS', 'facebook'); location.href='https://www.facebook.com/tohome.official?outUrlYn=Y'"
            >
              facebook
            </button>
            <button
              type="button"
              class="btn-instagram"
              onclick="GA_Event('PC_공통', '푸터_SNS', 'instagram'); location.href='https://www.instagram.com/tohome.official?outUrlYn=Y'"
            >
              instagram
            </button> -->
          </div>
        </div>
        <!-- SNS 아이콘 -->
        <div class="icon-container flex items-center">
          <YoutubeSvg :size="30" class="ml-5" />
          <InstagramSvg :size="25" class="ml-5" />
          <FacebookSvg :size="25" class="ml-5" />
        </div>
      </div>
      <hr class="solid" />

      <div class="info flex my-8">
        <!-- 로고 -->
        <img
          src="/src/assets/images/hyunfit-logo-footer.png"
          alt=""
          class="logo object-none self-start"
        />
        <!-- 텍스트 -->
        <div class="footer-texts flex flex-column items-start ml-12 text-sm">
          <div>(주)현핏</div>
          <div class="mt-1">대표이사 : 파이어맨 4인</div>
          <div class="mt-1">주소 : 서울 종로구 창경궁로 254 코사</div>
          <div class="mt-1">전화 : 02-1234-5678</div>
          <div class="mt-1">이메일 : firemen4u@github.com</div>
          <div class="mt-1">
            사업자 등록번호 : 123-45-67890
            <button type="button" class="underline ml-1">사업자등록확인</button>
          </div>

          <div class="mt-1 mb-5">
            통신판매업자 신고번호 : 2010-파이어맨-01882
          </div>

          <div class="mt-1">
            현핏의 개별 판매자가 등록한 상품(브랜드직송) 상품에 대한 광고,
            상품주문, 배송, 환불의 의무와 책임은 각 판매자가 부담하고,
          </div>
          <div>현핏은 통신판매 중개자로서의 의무와 책임을 다합니다.</div>
          <div class="mt-5">
            고객님의 안전거래를 위해 현금결제 시 KG이니시스 구매안전 서비스를
            이용하실 수 있습니다.
            <button type="button" class="underline ml-1">
              서비스 가입사실 확인
            </button>
          </div>

          <div class="copyright mt-5 opacity-60">
            Copyright © Hyundai Department Store. All rights reserved.
            {{ new Date().getFullYear() }}
          </div>
        </div>
      </div>
    </BaseBodyWrapper>
  </footer>
</template>

<style scoped>
footer {
  background-color: #212121;
}
.logo {
  height: 2rem;
  object-fit: cover;
}
.footer-texts {
  color: #aea7a2;
}
hr.solid {
  border-top: 1px solid #747474;
}
.icon-container img {
  max-height: 20px;
}
</style>
