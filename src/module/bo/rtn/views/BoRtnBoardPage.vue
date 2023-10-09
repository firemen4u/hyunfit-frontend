<template>
  <BaseContainer category="admin">
    <div class="w-100 flex justify-center mb-[150px]">
      <BaseBodyWrapper>
        <div
          class="bg-white shadow-lg rounded-xl overflow-hidden mt-3 min-h-[1300px]"
        >
          <BaseRtnCardContainer :showAdmin="true" />
        </div>
      </BaseBodyWrapper>
    </div>
  </BaseContainer>
</template>
<script setup>
import { BaseBodyWrapper, BaseContainer } from '/src/module/@base/views'
import { BaseRtnCardContainer } from '/src/module/@base/components'
</script>
<script>
import axios from 'axios'
import { BACKEND_API_BASE_URL } from '@/config'
import ApiClient from '@/services/api'

export default {
  async beforeRouteEnter() {
    const user = {
      username: 'admin',
      password: '123',
    }
    await axios
      .post(`${BACKEND_API_BASE_URL}/auth/admin`, user)
      .then(response => {
        let token = response.headers.get('authorization')
        ApiClient.setTokenOnLocalStorage(token, 'admin')
      })
  },
}
</script>
