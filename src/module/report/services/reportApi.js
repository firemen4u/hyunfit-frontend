import ApiClient from '@/services/api'

async function getReport(mbrSeq, params) {
  return await ApiClient.get(`/members/${mbrSeq}/report`, { params: params })
}

export default {
  getReport,
}
