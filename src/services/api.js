import axios from 'axios'
import { BACKEND_API_BASE_URL } from '/src/config'

let axiosInstance = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function appendAuthorization(config) {
  let authorization = localStorage.getItem('Authorization')
  if (config.headers === undefined) {
    config['headers'] = {}
  }
  config.headers['Authorization'] = authorization
}

async function get(url, config = {}) {
  appendAuthorization(config)
  return await axiosInstance
    .get(url, config)
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(error => {
      throw error
    })
}

// Function to handle POST requests
async function post(url, data, config = {}) {
  appendAuthorization(config)
  return await axiosInstance
    .post(url, data, config)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

// Function to handle PUT requests
function put(url, data, config = {}) {
  appendAuthorization(config)
  console.log(config)
  return axiosInstance
    .put(url, data, config)
    .then(response => {
      response.data
    })
    .catch(error => {
      throw error
    })
}

// Function to handle DELETE requests
function remove(url, config = {}) {
  appendAuthorization(config)
  return axiosInstance
    .delete(url, config)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

function setTokenOnLocalStorage(token) {
  localStorage.setItem('Authorization', token)
}

function removeTokenOnLocalStorage(token) {
  localStorage.removeItem('Authorization', token)
}

const ApiClient = {
  get: async (url, config) => await get(url, config),
  post: async (url, data) => await post(url, data),
  put: (url, data, config) => put(url, data, config),
  delete: url => remove(url),
  setTokenOnLocalStorage: token => setTokenOnLocalStorage(token),
  removeTokenOnLocalStorage: token => removeTokenOnLocalStorage(token),
}

export default ApiClient
