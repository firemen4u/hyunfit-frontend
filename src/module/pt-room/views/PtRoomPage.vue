<template>
  <div id="ptRoom">
    <div
      class="flex justify-center items-center align-baseline mt-20 mb-3 ml-36 mr-36"
    ></div>
    <div id="ptCamContainer" class="flex flex-col justify-center">
      <button v-if="!joined" class="start-button" @click="startPt">
        <img src="/src/assets/images/start-button.png" />
      </button>
      <div
        v-show="joined"
        id="after-join"
        class="flex justify-center"
        ref="afterJoin"
      >
        <div id="publisher" class="mr-10"></div>
        <div id="subscriber"></div>
      </div>
    </div>
    <div id="controllerButtonContainer" class="flex justify-center mt-14">
      <div class="flex justify-start w-1/3">
        <HyunfitLogoMonoVer2Svg
          color="#ffffff"
          class="ml-20 mt-7"
          :size="120"
        />
        <LessoningTime class="ml-2 mt-6" v-if="joined"></LessoningTime>
      </div>
      <div class="flex justify-center align-middle w-1/3">
        <v-col cols="auto">
          <v-btn size="large" color="red" @click="beforeLeave()"
            ><img src="/src/assets/images/phone-hangup.png" alt=""
          /></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            size="large"
            :color="controller.video ? 'grey' : 'red'"
            :ripple="false"
            @click="toggleVideo"
            ><img
              class="w-6 h-6"
              :src="controller.video ? paths.videoOn : paths.videoOff"
              alt=""
          /></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            size="large"
            :color="controller.audio ? 'grey' : 'red'"
            :ripple="false"
            @click="toggleAudio"
            ><img
              class="w-6 h-6"
              :src="controller.audio ? paths.audioOn : paths.audioOff"
              alt=""
          /></v-btn>
        </v-col>
      </div>
      <div class="w-1/3"></div>
    </div>
  </div>
</template>

<script setup>
import LessoningTime from '../components/LessoningTimeComponent.vue'
import { OpenVidu } from 'openvidu-browser'
import ApiClient from '/src/services/api.js'
import HyunfitLogoMonoVer2Svg from '@/module/@base/svg/HyunfitLogoMonoVer2Svg.vue'
import { onBeforeMount, reactive, ref } from 'vue'

const paths = {
  videoOn: 'https://fs.hyunfit.life/api/hyunfit/file/meeting-video-on.png',
  videoOff: 'https://fs.hyunfit.life/api/hyunfit/file/meeting-video-off.png',
  audioOn:
    'https://fs.hyunfit.life/api/hyunfit/file/meeting-microphone-off.png',
  audioOff:
    'https://fs.hyunfit.life/api/hyunfit/file/meeting-microphone-on.png',
}

const joined = ref(false)

const OV = ref(null)
const session = ref(null)
const subscriber = ref([])
const publisher = ref(null)

const controller = reactive({
  video: ref(true),
  audio: ref(true),
})

const personalTrainingDTO = {
  ptReservationStatus: null,
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

async function startPt() {
  let userRole = localStorage.getItem('userRoleName')
  let sessionId = localStorage.getItem('ptSeq')
  await joinSession(userRole, sessionId)
}

async function getToken(currUserRole, mySessionId) {
  if (currUserRole === 'member') {
    return await createToken(mySessionId)
  } else {
    const sessionId = await createSession(mySessionId)
    return await createToken(sessionId)
  }
}

async function createSession(ptSeq) {
  const response = await ApiClient.post('/openvidu/sessions', { ptSeq })
  return response.sessionId
}

async function createToken(sessionId) {
  try {
    const res = await ApiClient.post(
      '/openvidu/sessions/' + sessionId + '/connections',
      {}
    )
    return res.token
  } catch (e) {
    if (e.response.status === 404) {
      alert('아직 상담사가 상담을 시작하지 않았습니다.\n잠시만 기다려주세요!')
    } else {
      alert(`오류가 발생했습니다.  ${e}`)
    }
  }
}

async function joinSession(currUserRole, mySessionId) {
  OV.value = new OpenVidu()
  OV.value.enableProdMode()
  session.value = OV.value.initSession()
  session.value.on('streamCreated', ({ stream }) => {
    let sub = session.value.subscribe(stream, 'subscriber')
    subscriber.value.push(sub)
    personalTrainingDTO.ptReservationStatus = 2
    ApiClient.put('/personal-trainings/' + mySessionId, personalTrainingDTO)
  })

  session.value.on('exception', ({ exception }) => {
    console.warn('OpenVidu warning', exception)
  })

  getToken(currUserRole, mySessionId).then(token => {
    session.value
      .connect(token)
      .then(() => {
        publisher.value = OV.value.initPublisher('publisher', {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: controller.audio,
          publishVideo: controller.video,
          resolution: '',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        })
        session.value.publish(publisher.value)
        const videoElement = document.createElement('video')
        videoElement.classList.add('custom-video')
        joined.value = true
      })
      .catch(error => {
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message
        )
      })
  })
}
async function toggleVideo() {
  if (!publisher.value?.publishVideo) return
  controller.video = !controller.video
  await publisher.value.publishVideo(controller.video)
}
async function toggleAudio() {
  if (!publisher.value?.publishAudio) return
  controller.audio = !controller.audio
  await publisher.value.publishAudio(controller.audio)
}
function beforeLeave() {
  const confirmMessage = '상담을 종료하시겠습니까?'
  if (window.confirm(confirmMessage)) {
    leaveSession()
  }
}
async function leaveSession() {
  if (session.value) session.value.disconnect()

  session.value = undefined
  publisher.value = undefined
  subscriber.value = undefined
  OV.value = undefined

  const mySessionId = localStorage.getItem('ptSeq')

  if (personalTrainingDTO.ptReservationStatus === 2) {
    personalTrainingDTO.ptReservationStatus = 3
  } else {
    personalTrainingDTO.ptReservationStatus = 5
  }
  try {
    await ApiClient.put(
      '/personal-trainings/' + mySessionId,
      personalTrainingDTO
    )
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
  localStorage.removeItem('ptSeq')
  window.opener.location.reload()
  window.close()
}

async function handleBeforeUnload(event) {
  try {
    personalTrainingDTO.ptReservationStatus = 1
    let sessionId = localStorage.getItem('ptSeq')
    await ApiClient.put('/personal-trainings/' + sessionId, personalTrainingDTO)
    localStorage.removeItem('ptSeq')
  } catch (error) {
    console.error('API 요청 실패:', error)
  }
  window.removeEventListener('beforeunload', handleBeforeUnload)
}
</script>

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      OV: null,-->
<!--      session: null,-->
<!--      subscriber: [],-->
<!--      joined: true,-->
<!--      isAudioMuted: false,-->
<!--      videoImgPath: '/src/assets/images/Vector.png',-->
<!--      audioImgPath: '/src/assets/images/microphone.png',-->
<!--      showStartButton: true,-->
<!--      showLessonTime: false,-->
<!--      personalTrainingDTO: {-->
<!--        ptReservationStatus: null,-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    window.addEventListener('beforeunload', this.handleBeforeUnload)-->
<!--  },-->
<!--  methods: {-->
<!--    async startPt() {-->
<!--      let userRole = localStorage.getItem('userRoleName')-->
<!--      let sessionId = localStorage.getItem('ptSeq')-->
<!--      this.joinSession(userRole, sessionId)-->
<!--    },-->
<!--    async getToken(currUserRole, mySessionId) {-->
<!--      if (currUserRole == 'member') {-->
<!--        return await this.createToken(mySessionId)-->
<!--      } else {-->
<!--        const sessionId = await this.createSession(mySessionId)-->
<!--        return await this.createToken(sessionId)-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<style scoped>
#ptRoom {
  width: 100vw;
  height: 100vh;
  background-color: black;
}
#ptCamContainer {
  height: 70%;
}
#after-join {
  display: flex;
  flex-direction: row;
}
#publisher,
#subscriber {
  width: 45%;
  border-radius: 1%;
}
#margin {
  width: 5%;
  height: 100%;
}
video {
  width: 100%;
  border-radius: 50px;
}
#controllerButtonContainer {
  position: relative;
  text-align: center;
}
.start-button {
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>
