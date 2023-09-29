import ApiClient from '@/services/api'

async function getRecommendations(member) {
  try {
    return await ApiClient.post('/recommendations', member, {}, 'ai')
  } catch (e) {
    console.log(e)
  }
}

async function getOneRoutine(rtnSeq) {
  return await ApiClient.get(`/routines/${rtnSeq}`)
}
export default {
  getRecommendations,
  getOneRoutine,
}
