import ApiClient from '@/services/api'
import { FILE_SERVER_BASE_URL } from '@/config'
import TrnDetailDateUtils from '@/module/trn-detail/services/trnDetailDateUtils'

async function getReportFor(mbrSeq, startDate) {
  let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
  endDate = new Date(endDate.setMonth(endDate.getMonth() + 1))
  const params = TrnDetailDateUtils.toSearchDTO(startDate, endDate)
  return await ApiClient.get(`/members/${mbrSeq}/report`, { params: params })
}

async function getHyunfitScoreFor(mbrSeq, startDate) {
  let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
  endDate = new Date(endDate.setMonth(endDate.getMonth() + 1))
  const params = TrnDetailDateUtils.toSearchDTO(startDate, endDate)
  return await ApiClient.get(`/members/${mbrSeq}/report/event`, {
    params: params,
  })
}
async function createExerciseTargetImage(body) {
  return await ApiClient.post(
    `${FILE_SERVER_BASE_URL}/api/report/image`,
    body,
    { responseType: 'blob' },
    'fs'
  )
}
async function getMember() {
  return await ApiClient.get('/members/me')
}
export default {
  getReportFor,
  createExerciseTargetImage,
  getMember,
  getHyunfitScoreFor,
}
