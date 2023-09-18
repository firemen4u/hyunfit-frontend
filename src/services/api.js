import axios from 'axios'
import { BACKEND_API_BASE_URL } from '/src/config'

let axiosInstance = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Function to handle GET requests
async function get(url) {
  return await axiosInstance
    .get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

// Function to handle POST requests
async function post(url, data) {
  return await axiosInstance
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
  axiosInstance = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

const ApiClient = {
  get: async url => await get(url),
  post: async (url, data) => await post(url, data),
  put: (url, data) => put(url, data),
  delete: url => remove(url),
  setToken: token => setToken(token),
}

export default ApiClient
