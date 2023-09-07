<template>
  <div
    class="mbr-rsv-container border-solid border-4 border-red-400 w-full h-full"
  >
    <div
      class="mbr-rsv-banner-container border-solid border-4 border-blue-400 h-1/3 overflow-hidden relative"
    >
      <div class="banner-img w-full">
        <img
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FLmK30%2FbtstpDVKWjo%2FK4PSNMpfTmkccfOWoB6Ao1%2Fimg.jpg"
          alt="Option 1"
          class="option-image w-full"
        />
      </div>
      <div
        class="banner-img-cover w-full h-full bg-black absolute top-0 opacity-50"
      >
        <div class="banner-img-cover-text flex-col align-middle">
          <p>나의 트레이닝 스케쥴</p>
          <p>더 강해지는 나만의 길, 함께 달려요!</p>
        </div>
      </div>
    </div>

    <div
      class="mbr-rsv-upcomming-rsv-container border-solid border-4 border-green-400"
    >
      <div
        class="mbr-rsv-upcomming-rsv-item border-solid border-4 border-b-lime-500"
      >
        카드 위치
        <template>
          <div></div>
        </template>
      </div>
    </div>

    <div
      class="mbr-rsv-history-contaioner border-solid border-4 border-orange-400"
    >
      <div class="mbr-rsv-history-item">
        <div>지난 예약</div>
        지난 예약 아이템 들어오는 곳
        <template class="border-solid border-4 border-orange-400">
          <div></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
