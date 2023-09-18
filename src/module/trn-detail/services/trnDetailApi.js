import ApiClient from '/src/services/api'

async function getTrnDetail(trnId) {
  return await ApiClient.get(`/trainers/${trnId}`)
}

async function postPersonalTraining(data) {
  return await ApiClient.post('/personal-trainings', data)
}

export { getTrnDetail, postPersonalTraining }
