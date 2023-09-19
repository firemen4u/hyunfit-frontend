<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center align-middle items-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        @click="this.$router.push('/')"
        src="/src/assets/images/mainLogo.png"
      />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            v-model="this.user.username"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="text-sm">
            <a href="#" class="font-semibold text-gray-900 hover:text-gray-900"
              >Forgot password?</a
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            v-model="this.user.password"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between ml-4 mr-4">
        <div>
          <input type="radio" value="member" v-model="selectedRole" />
          <label class="ml-2" for="radio1">Member</label>
        </div>
        <div>
          <input type="radio" value="admin" v-model="selectedRole" />
          <label class="ml-2" for="radio2">Admin</label>
        </div>
        <div>
          <input type="radio" value="trainer" v-model="selectedRole" />
          <label class="ml-2" for="radio3">Trainer</label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          @click="loginForm"
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
export default {
  setup() {},
  data() {
    return {
      selectedRole: '',
      user: {
        username: null,
        password: null,
        role: null,
      },
      token: null,
    }
  },
  methods: {
    async loginForm() {
      await axios
        .post('http://localhost:8080/auth/' + this.selectedRole, this.user)
        .then(response => {
          console.log('data : ', response.data)
          console.log('-----------------------', response)
          console.log('headers : ', response.headers.get('authorization'))
          this.token = response.headers.get('authorization')
          ApiClient.setToken(this.token)
          this.$router.push('/')
        })
        .catch(error => {
          alert('loginfail')
          console.error('API 요청 실패:', error)
        })

      await ApiClient.get('http://localhost:8080/' + this.selectedRole + 's/me')
    },
  },
}
</script>
