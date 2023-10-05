<template>
  <div class="background">
    <div class="login-box">
      <div class="flex justify-center">
        <button @click="moveToMain">
          <img
            src="https://fs.hyunfit.life/api/hyunfit/file/hyunfit-logo-colored.png"
            class="w-60 h-14"
          />
        </button>
      </div>
      <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <label
            for="email"
            class="block text-lg font-medium leading-6 text-black"
            >ID</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              v-model="this.user.username"
              @keyup.enter="loginForm"
              class="block w-full rounded-md border-0 p-2 text-black shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="mt-3">
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-lg font-medium leading-6 text-black"
              >PW</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              v-model="this.user.password"
              @keyup.enter="loginForm"
              class="block w-full rounded-md border-0 p-2 text-black shadow-sm ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <v-radio-group v-model="selectedRole" class="mt-3">
          <div class="flex justify-between ml-4 mr-4">
            <v-radio value="member" label="Member" />
            <v-radio value="admin" label="Admin" />
            <v-radio value="trainer" label="Trainer" />
          </div>
        </v-radio-group>
        <div>
          <button
            type="submit"
            class="flex mt-3 w-full justify-center rounded-md bg-[#132377] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#132377] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#132377]"
            @click="loginForm"
            @keyup.enter="loginForm"
          >
            Login
          </button>
        </div>
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
    }
  },
  methods: {
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
          alert(`로그인 실패 ${error}`)
          alert('loginfail')
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
