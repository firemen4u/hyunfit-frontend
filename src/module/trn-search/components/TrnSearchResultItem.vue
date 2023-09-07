<template class="conatiner px-10 flex-row" >
  <div class="card-container flex px-1">
    <v-card
      class="mx-auto flex"
      color="white"
      theme="dark"
      max-width="100%"
      title="트레이너 이름"
    >
      <v-card-subtitle title="퍼스널 트레이닝"></v-card-subtitle>
      <v-card-text class="py-2">
        회원님의 운동목적과 체형에 맞추어 더 안전하고 빠르고 재미있게 목표에
        도달할 수 있도록 최선을 다하겠습니다.
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-avatar>
          </template>

          <v-list-item-title>Evan You</v-list-item-title>

          <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>

          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">256</span>
              <span class="me-1">·</span>
              <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
              <span class="subheading">45</span>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
  <div class="card-img">
    <p>이미지</p>
  </div>
</template>
<script setup>
</script>
<style>
</style>