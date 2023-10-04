<script setup>
import { BaseBodyWrapper, BaseContainer } from '@/module/@base/views'
import router, { pathNames } from '@/router'

async function toMain() {
  await router.push(pathNames.mainPage)
}
</script>

<template>
  <div class="h-[100vh] w-[100vw] flex items-center justify-center">
    <BaseContainer noheader nofooter>
      <div class="primary-background flex">
        <BaseBodyWrapper>
          <div class="flex justify-center h-full w-full items-center">
            <div class="flex flex-col bg-white shadow-lg rounded-lg">
              <div class="px-20 py-15">다시 시도하시길 바랍니다</div>
              <v-btn
                @click="toMain()"
                variant="flat"
                height="50"
                :ripple="false"
                color="#e7e7e7"
                >메인으로 가기
              </v-btn>
            </div>
          </div>
        </BaseBodyWrapper>
      </div>
    </BaseContainer>
  </div>
</template>

<style scoped></style>
