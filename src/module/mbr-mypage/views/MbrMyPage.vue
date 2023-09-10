<template>
  <BaseContainer>
    <BaseSideBar
      :sidebarTitle="sidebarTitle"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="flex">
        <!-- 컨텐츠 -->
        <div class="content">
          <p class="font-bold text-2xl">회원 정보 수정</p>
          <div class="p-2 bg-white flex flex-col items-center">
            <div class="p-2 bg-gray-500 font-normal w-2/3">
              <div>
                <div class="border-4 border-dashed border-yellow-300 p-2 flex">
                  <p class="mr-2 mt-4 w-1/6">이름(닉네임)</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="이름(닉네임)"
                    model-value="김진우"
                    variant="outlined"
                    placeholder="이름(닉네임)"
                    clearable
                    hint="회원님의 이름/닉네임을 써주세요"
                  ></v-text-field>
                  <!-- v-model 추가 해줘야한다.-->
                </div>

                <div class="bg-blue-300 p-2 flex">
                  <p class="mr-2 mt-4 w-1/6">이메일</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="이메일"
                    model-value="jinwoo@jjang.com"
                    variant="outlined"
                    placeholder="abcdefg@email.com"
                    clearable
                    hint="이메일 형식으로 써주세요"
                  ></v-text-field>
                  <!-- v-model 추가 해줘야한다.-->
                </div>

                <div class="bg-blue-300 p-2 flex">
                  <p class="mr-2 mt-4 w-1/6">생년월일</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="생년월일"
                    variant="outlined"
                    placeholder="YYYYMMDD"
                    clearable
                    hint="YYYYMMDD 형식으로 써주세요"
                  ></v-text-field>
                  <!-- v-model 추가 해줘야한다.-->
                </div>

                <div class="bg-blue-300 p-2 flex">
                  <p class="mr-2 mt-4 w-1/6">추천 운동</p>
                  <div>
                    <p>
                      회원가입시 입력한 정보를 수정해 추천 운동을 설정할 수
                      있어요!
                    </p>
                    <button>버튼</button>
                  </div>
                  <!-- v-model 추가 해줘야한다.-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBodyWrapper></BaseContainer
  >
</template>

<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import BaseSideBar from '/src/module/@base/views/BaseSideBar.vue'
const sidebarTitle = '사이드 바 헤더'
const mainCategory = '카테고리'
const subcategories = [
  { id: 1, title: '서브 카테고리 1', link: '/link1' },
  { id: 2, title: '서브 카테고리 2', link: '/link2' },
  { id: 3, title: '서브 카테고리 3', link: '/link3' },
]
</script>

<style scoped>
.content {
  padding: 20px;
  width: 100%;
  height: 1000px;
  background-color: red;
}
</style>
