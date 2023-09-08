<template>
  <div class="bottom-bar-container">
    <div class="empty-container item bg-transparent"></div>
    <div class="status-navigation-container item">
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
      <button class="buttons">
        <img src="src\assets\images\volume-high.png" />
      </button>
    </div>
    <button class="skip-button item skip">
      <p class="font-extrabold">Skip</p>
    </button>
  </div>
</template>
<script setup></script>
<style scoped>
.status-navigation-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.bottom-bar-container {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: transparent; /* 투명도 있는 흰색 배경 */
  width: 90vw;
  height: 100px;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
}
.buttons {
  margin: 10px;
  width: 20px;
  height: 20px;
}

.item {
  width: 200px;
  height: 50px;
  background-color: rgb(33, 33, 33, 0.3);
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.skip {
  padding-right: 100px;
}
</style>
