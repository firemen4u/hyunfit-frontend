<template>
  <div class="base-body-wrapper">
    <slot></slot>
  </div>
</template>

<style>
.base-body-wrapper {
  width: 100%;
  min-height: 100vh;
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .base-body-wrapper {
    width: 80%;
    min-height: 100vh;
  }
}

/* 큰 화면(데스크톱)에 대한 스타일 */
@media screen and (min-width: 1200px) {
  .base-body-wrapper {
    width: 1100px;
    min-height: 100vh;
  }
}
</style>
