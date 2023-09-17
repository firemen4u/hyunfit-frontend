import ApiClient from '/src/services/api'

async function getTrnDetail(trnId) {
  return await ApiClient.get(`/trainers/${trnId}`)
}

export { getTrnDetail }
