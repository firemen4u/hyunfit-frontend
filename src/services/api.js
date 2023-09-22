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

function instanceResolver(type) {
  if (type === 'fs') {
    return fsInstance
  }
  if (type === 'ai') {
    return aiInstance
  }
  return backendInstance
}

async function _get(url, config, instance) {
  appendAuthorization(config)
  return await instance
    .get(url, config)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

async function get(url, config = {}, type = null) {
  const instance = instanceResolver(type)
  return await _get(url, config, instance)
}

// Function to handle POST requests
async function _post(url, data, config, instance) {
  appendAuthorization(config)
  console.log(instance)
  return await instance
    .post(url, data, config)
    .then(response => response.data)
    .catch(error => {
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
      throw error
    })
}

function setTokenOnLocalStorage(token) {
  localStorage.setItem('Authorization', token)
}

function removeTokenOnLocalStorage() {
  localStorage.removeItem('Authorization')
}

const ApiClient = {
  get: async (url, config, type) => await get(url, config, type),
  post: async (url, data, config, type) => await post(url, data, config, type),
  put: (url, data, config, type) => put(url, data, config, type),
  delete: url => remove(url),
  setTokenOnLocalStorage: token => setTokenOnLocalStorage(token),
  removeTokenOnLocalStorage: () => removeTokenOnLocalStorage(),
}

export default ApiClient
