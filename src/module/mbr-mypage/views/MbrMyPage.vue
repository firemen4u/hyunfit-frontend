<template>
  <BaseContainer>
    <BaseSideBar
      :sidebarTitle="sidebarTitle"
      :categoryTitle="mainCategory"
      :subcategories="subcategories"
    />
    <BaseBodyWrapper>
      <div class="">
        <!-- 컨텐츠 -->
        <div class="content mt-10">
          <p class="font-bold text-2xl pl-5">회원 정보 수정</p>
          <hr class="mbr-hr border-2 border-gray-400" />
          <div class="p-2 flex flex-col items-center">
            <div class="p-2 bg-white font-normal w-2/3">
              <div>
                <div class="p-2 flex h-24">
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

                <div class="p-2 flex h-24">
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

                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">생년월일</p>
                  <v-text-field
                    class="mx-atuo mb-2"
                    label="생년월일"
                    model-value="19951125"
                    variant="outlined"
                    placeholder="YYYYMMDD"
                    clearable
                    hint="YYYYMMDD 형식으로 써주세요"
                  ></v-text-field>
                  <!-- v-model 추가 해줘야한다.-->
                </div>

                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">추천 운동</p>
                  <div class="flex flex-col justify-center items-start">
                    <p class="text-gray-400 text-sm">
                      회원가입시 입력한 정보를 수정해 추천 운동을 설정할 수
                      있어요!
                    </p>
                    <button
                      class="bg-primary mt-2 p-2 pr-16 pl-16 rounded-md"
                      onclick="http://localhost:5173/survey"
                    >
                      설정하기
                    </button>
                  </div>

                  <!-- v-model 추가 해줘야한다.-->
                </div>
                <hr class="mbr-hr" />
                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">키</p>
                  <v-text-field
                    class="mb-2"
                    label="키"
                    model-value="175"
                    variant="outlined"
                    suffix="cm"
                    clearable
                    hint="소수점 첫번째 자리까지 입력할수있습니다."
                  ></v-text-field>
                  <!-- v-model 추가 해줘야한다.-->
                </div>
                <div class="p-2 flex h-24">
                  <p class="mr-2 mt-4 w-1/6">몸무게</p>
                  <v-text-field
                    class="mb-2"
                    label="몸무게"
                    model-value="75"
                    variant="outlined"
                    suffix="kg"
                    clearable
                    hint="소수점 첫번째 자리까지 입력할수있습니다."
                  ></v-text-field>
                  <!-- v-model 추가 해줘야한다.-->
                </div>
                <hr class="mbr-hr" />
                <div>
                  <div>
                    <a class="text-gray-300" href="/">회원 탈퇴하기</a>
                    <div class="flex justify-center items-center">
                      <P class="mr-4">수정된 내용을 저장하시겠어요?</P
                      ><button
                        class="bg-primary mt-2 p-2 pr-16 pl-16 rounded-md"
                        onclick="/"
                      >
                        저장하기
                      </button>
                    </div>
                  </div>
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
}
.mbr-hr {
  margin: 10px;
  margin-bottom: 15px;
}
</style>
