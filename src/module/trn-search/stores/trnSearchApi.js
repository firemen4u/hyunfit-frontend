import ApiClient from '/src/services/api'

async function getTrainers(options) {
  return await ApiClient.get(`/trainers`, { params: options })
}

export default { getTrainers }
