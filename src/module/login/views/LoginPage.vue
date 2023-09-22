<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center align-middle items-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        @click="moveToMain"
        src="/src/assets/images/mainLogo.png"
      />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label
          for="email"
          class="block text-lg font-medium leading-6 text-gray-900"
          >아이디</label
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
            class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="mt-3">
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-lg font-medium leading-6 text-gray-900"
            >비밀번호</label
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
            class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
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
          class="flex mt-3 w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          @click="loginForm"
          @keyup.enter="loginForm"
        >
          Login
        </button>
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
  setup() {},
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
          this.moveToMain(localStorage.getItem('userRole'))
        })
        .catch(error => {
          console.log(error)
          alert(`로그인 실패 ${error}`)
          alert('loginfail')
        })
    },
  },
}
</script>
