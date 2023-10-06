<template>
  <div class="background">
    <div class="login-box">
      <div class="flex justify-center mb-10">
        <button @click="moveToMain">
          <img
            src="https://fs.hyunfit.life/api/hyunfit/file/hyunfit-logo-colored.png"
            class="w-60 h-14"
          />
        </button>
      </div>
      <div class="w-full px-10">
        <v-form @submit.prevent="submit">
          <v-text-field
            label="ID"
            variant="outlined"
            v-model="this.user.username"
            :disabled="loading"
          >
          </v-text-field>
          <v-text-field
            label="Password"
            variant="outlined"
            type="password"
            v-model="this.user.password"
            :disabled="loading"
          >
          </v-text-field>
          <v-radio-group
            v-model="selectedRole"
            hide-details
            :disabled="loading"
          >
            <div class="flex justify-between ml-4 mr-4">
              <v-radio value="member" label="Member" />
              <v-radio value="admin" label="Admin" />
              <v-radio value="trainer" label="Trainer" />
            </div>
          </v-radio-group>
          <v-btn
            type="submit"
            class="mt-8"
            color="primary"
            height="50"
            :loading="loading"
            block
            :ripple="false"
          >
            <div class="font-black text-lg">Login</div>
          </v-btn>
          <div class="h-8">
            <v-input :rules="[rules.login]">
              <template v-slot:message="{ message }"
                ><div class="text-base">{{ message }}</div>
              </template>
            </v-input>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ApiClient from '/src/services/api.js'
import { BACKEND_API_BASE_URL } from '@/config'
import router, { pathNames } from '@/router'

export default {
  data() {
    return {
      selectedRole: 'member',
      user: {
        username: null,
        password: null,
        role: null,
      },
      token: null,
      loginMessage: '',
      loading: false,
      rules: {
        login: async () => {
          if (!this.user.username || !this.user.password)
            return '아이디와 비밀번호를 전부 입력해 주세요.'
          return await axios
            .post(
              `${BACKEND_API_BASE_URL}/auth/${this.selectedRole}`,
              this.user
            )
            .then(response => {
              this.token = response.headers.get('authorization')
              ApiClient.setTokenOnLocalStorage(this.token, this.selectedRole)
              this.moveToMain(localStorage.getItem('userRoleName'))
            })
            .catch(error => {
              console.log(error)
              if (error.response.status === 404) {
                return '아이디 또는 비밀번호 오류입니다.'
              } else {
                alert(`로그인에 실패하였습니다 ${error}`)
              }
            })
        },
      },
    }
  },
  methods: {
    async submit(event) {
      this.loading = true
      const result = await event
      this.loading = false
    },
    moveToMain(userRole) {
      if (userRole === 'admin') {
        router.push(pathNames.boExcBoardPage)
      } else if (userRole === 'trainer') {
        router.push(pathNames.boTrnRsvBoardPage)
      } else {
        router.push(pathNames.mainPage)
      }
    },
    async loginForm() {
      await axios
        .post(`${BACKEND_API_BASE_URL}/auth/${this.selectedRole}`, this.user)
        .then(response => {
          this.token = response.headers.get('authorization')
          ApiClient.setTokenOnLocalStorage(this.token, this.selectedRole)
          this.moveToMain(localStorage.getItem('userRoleName'))
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.loginMessage = '아이디 또는 비밀번호 오류입니다.'
          } else {
            this.loginMessage = '아이디 또는 비밀번호 오류입니다.'
          }
        })
    },
  },
}
</script>

<style scoped>
.background {
  background-image: url('https://fs.hyunfit.life/api/hyunfit/file/jogging-banner.jpg');
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 450px;
  background-color: rgba(240, 240, 240, 0.85);
  border-radius: 10px;
}
</style>
