import axios from 'axios'
import {
  AI_SERVER_BASE_URL,
  BACKEND_API_BASE_URL,
  FILE_SERVER_BASE_URL,
} from '/src/config'

const backendInstance = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
const aiInstance = axios.create({
  baseURL: AI_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
const fsInstance = axios.create({
  baseURL: FILE_SERVER_BASE_URL,
})

function appendAuthorization(config) {
  let authorization = localStorage.getItem('Authorization')
  if (config.headers === undefined) {
    config['headers'] = {}
  }
  config.headers['Authorization'] = authorization
}
function printError(error) {
  if (error.response) {
    console.error('Axios 오류:', error.response.status)
    console.error('Axios 응답 데이터:', error.response.data)
  } else {
    console.error('Axios 서버 응답 없음:', error.message)
  }
  console.log('요청 URL: ', error.config.baseURL + error.config.url)
}
function instanceResolver(type) {
  if (type === 'fs') {
    return fsInstance
  }
  if (type === 'ai') {
    return aiInstance
  }
  return backendInstance
}

async function get(url, config = {}, type = null) {
  const instance = instanceResolver(type)
  return await _get(url, config, instance)
}
async function _get(url, config = {}, instance) {
  appendAuthorization(config)
  return await instance
    .get(url, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      printError(error)
      throw error
    })
}

// Function to handle POST requests
async function _post(url, data, config, instance) {
  appendAuthorization(config)
  return await instance
    .post(url, data, config)
    .then(response => response.data)
    .catch(error => {
      printError(error)
      throw error
    })
}
async function post(url, data, config = {}, type) {
  const instance = instanceResolver(type)
  return await _post(url, data, config, instance)
}

async function _put(url, data, config, instance) {
  appendAuthorization(config)
  return await instance
    .put(url, data, config)
    .then(response => response.data)
    .catch(error => {
      printError(error)
      throw error
    })
}
// Function to handle PUT requests
async function put(url, data, config = {}, type) {
  const instance = instanceResolver(type)
  return await _put(url, data, config, instance)
}

// Function to handle DELETE requests
function remove(url, config = {}, type) {
  appendAuthorization(config)
  const instance = instanceResolver(type)
  return instance
    .delete(url, config)
    .then(response => response.data)
    .catch(error => {
      printError(error)
      throw error
    })
}

function setTokenOnLocalStorage(token, userRole) {
  localStorage.setItem('Authorization', token)
  localStorage.setItem('userRoleName', userRole)
}

function removeTokenOnLocalStorage() {
  localStorage.removeItem('Authorization')
  localStorage.removeItem('userRoleName')
}

async function me() {
  let role = localStorage.getItem('userRoleName')
  if (role === null) return null
  return get(`/${role}s/me`)
}

const ApiClient = {
  get: async (url, config, type) => await get(url, config, type),
  post: async (url, data, config, type) => await post(url, data, config, type),
  put: (url, data, config, type) => put(url, data, config, type),
  delete: url => remove(url),
  setTokenOnLocalStorage: (token, userRole) =>
    setTokenOnLocalStorage(token, userRole),
  removeTokenOnLocalStorage: () => removeTokenOnLocalStorage(),
  me: () => me(),
}

export default ApiClient
