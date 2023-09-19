import axios from 'axios'
import { BACKEND_API_BASE_URL } from '/src/config'

let axiosInstance = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to handle GET requests
function get(url) {
  return axiosInstance
    .get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

// Function to handle POST requests
function post(url, data) {
  return axiosInstance
    .post(url, data)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

// Function to handle PUT requests
function put(url, data) {
  return axiosInstance
    .put(url, data)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

// Function to handle DELETE requests
function remove(url) {
  return axiosInstance
    .delete(url)
    .then(response => response.data)
    .catch(error => {
      throw error
    })
}

function setToken(token) {
  console.log(token)
  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '')
  }
  axiosInstance = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

const ApiClient = {
  get: url => get(url),
  post: (url, data) => post(url, data),
  put: (url, data) => put(url, data),
  delete: url => remove(url),
  setToken: token => setToken(token),
}

export default ApiClient
