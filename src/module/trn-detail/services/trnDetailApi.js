import ApiClient from '/src/services/api'

async function getTrnDetail(trnId) {
  return await ApiClient.get(`/trainers/${trnId}`)
}

async function postPersonalTraining(data) {
  return await ApiClient.post('/personal-trainings', data)
}

async function getTrnFullyReservedDays(trnId, params) {
  return await ApiClient.get(`/trainers/${trnId}/fully-reserved-days`, {
    params: params,
  })
}

async function getTrnAllReservedTimeslots(trnId, params) {
  return await ApiClient.get(`/trainers/${trnId}/all-reserved-timeslots`, {
    params: params,
  })
}

export {
  getTrnDetail,
  postPersonalTraining,
  getTrnFullyReservedDays,
  getTrnAllReservedTimeslots,
}
