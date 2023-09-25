<template>
  <div id="ptRoom">
    <div
      class="flex justify-between items-center align-baseline mt-20 mb-3 ml-36 mr-36"
    >
      <div class="currentDate">
        <CurrentDate></CurrentDate>
      </div>
      <div class="w-76 h-11">
        <HyunfitLogoGradientSvg :size="350" />
      </div>
      <div class="currentTime">
        <CurrentTime></CurrentTime>
      </div>
    </div>
    <div id="ptCamContainer" class="flex flex-col justify-center">
      <button class="start-button" v-if="showButton" @click="startPt">
        <img src="/src/assets/images/start-button.png" />
      </button>
      <div
        id="after-join"
        class="flex justify-evenly"
        v-if="showAfterJoin"
        ref="afterJoin"
      >
        <div id="publisher"></div>
        <div id="subscriber"></div>
      </div>
    </div>
    <div id="controllerButtonContainer" class="flex justify-center">
      <div class="flex justify-start w-1/3">
        <LessoningTime
          class="ml-36 mt-7"
          v-if="showLessoningTime"
        ></LessoningTime>
      </div>
      <div class="flex justify-center align-middle w-1/3">
        <v-col cols="auto">
          <v-btn
            icon="mdi-plus"
            size="large"
            color="red"
            @click="leaveSession()"
            ><img src="/src/assets/images/phone-hangup.png" alt=""
          /></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon="mdi-plus" size="large" color="grey" @click="toggleVideo"
            ><img :src="videoImgPath" alt=""
          /></v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn icon="mdi-plus" size="large" color="grey" @click="toggleAudio"
            ><img :src="audioImgPath" alt=""
          /></v-btn>
        </v-col>
      </div>
      <div class="w-1/3"></div>
    </div>
  </div>
</template>

<script setup>
import CurrentTime from '../components/CurrentTimeComponent.vue'
import CurrentDate from '../components/CurrentDateComponent.vue'
import LessoningTime from '../components/LessoningTimeComponent.vue'
import { HyunfitLogoGradientSvg } from '@/module/@base/svg'
import { OpenVidu } from 'openvidu-browser'
import ApiClient from '/src/services/api.js'
</script>

<script>
export default {
  data() {
    return {
      OV: null,
      session: null,
      subscriber: [],
      showAfterJoin: true,
      bottonAfterJoin: true,
      isAudioMuted: false,
      videoImgPath: '/src/assets/images/Vector.png',
      audioImgPath: '/src/assets/images/microphone.png',
      showButton: true,
      showLessoningTime: false,
      personalTrainingDTO: {
        ptReservationStatus: null,
      },
    }
  },
  created() {
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  },
  methods: {
    async startPt() {
      this.showButton = false
      let userRole = localStorage.getItem('userRole')
      let sessionId = localStorage.getItem('ptSeq')
      this.joinSession(userRole, sessionId)
    },
    async getToken(currUserRole, mySessionId) {
      if (currUserRole == 'member') {
        return await this.createToken(mySessionId)
      } else {
        const sessionId = await this.createSession(mySessionId)
        return await this.createToken(sessionId)
      }
    },
    async createSession(ptSeq) {
      const response = await ApiClient.post('/openvidu/sessions', { ptSeq })
      return response.sessionId
    },
    async createToken(sessionId) {
      return ApiClient.post(
        '/openvidu/sessions/' + sessionId + '/connections',
        {}
      )
        .then(response => {
          return response.token
        })
        .catch(error => {
          this.showButton = true
          alert('아직 상담사가 상담을 시작하지 않았습니다.')
        })
    },
    joinSession(currUserRole, mySessionId) {
      this.OV = new OpenVidu()
      this.session = this.OV.initSession()
      this.session.on('streamCreated', ({ stream }) => {
        let subscriber = this.session.subscribe(stream, 'subscriber')
        this.subscriber.push(subscriber)
        this.showLessoningTime = true
        this.personalTrainingDTO.ptReservationStatus = 2
        ApiClient.put(
          '/personal-trainings/' + mySessionId,
          this.personalTrainingDTO
        )
      })
      this.session.on('exception', ({ exception }) => {
        console.warn(exception)
      })
      this.bottonAfterJoin = false
      this.getToken(currUserRole, mySessionId).then(token => {
        this.session
          .connect(token)
          .then(() => {
            let publisher = this.OV.initPublisher('publisher', {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            })
            this.mainStreamManager = publisher
            this.publisher = publisher
            this.session.publish(publisher)
            const videoElement = document.createElement('video')
            videoElement.classList.add('custom-video')
          })
          .catch(error => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message
            )
          })
      })
    },
    async toggleVideo() {
      this.videoImgPath =
        this.videoImgPath === '/src/assets/images/Vector.png'
          ? '/src/assets/images/video-off-svgrepo-com.png'
          : '/src/assets/images/Vector.png'
      this.videoImgPath === '/src/assets/images/Vector.png'
        ? this.publisher.publishVideo(true)
        : this.publisher.publishVideo(false)
    },
    async toggleAudio() {
      this.audioImgPath =
        this.audioImgPath === '/src/assets/images/microphone.png'
          ? '/src/assets/images/mute-1-svgrepo-com.png'
          : '/src/assets/images/microphone.png'

      this.audioImgPath === '/src/assets/images/microphone.png'
        ? this.publisher.publishAudio(true)
        : this.publisher.publishAudio(false)
    },
    leaveSession() {
      if (this.session) this.session.disconnect()

      this.session = undefined
      this.mainStreamManager = undefined
      this.publisher = undefined
      this.subscriber = undefined
      this.OV = undefined

      const mySessionId = localStorage.getItem('ptSeq')

      if (this.personalTrainingDTO.ptReservationStatus === 2) {
        this.personalTrainingDTO.ptReservationStatus = 3
        ApiClient.put(
          '/personal-trainings/' + mySessionId,
          this.personalTrainingDTO
        )
      } else {
        this.personalTrainingDTO.ptReservationStatus = 5
        ApiClient.put(
          '/personal-trainings/' + mySessionId,
          this.personalTrainingDTO
        )
      }
      localStorage.removeItem('ptSeq')
      window.close()
    },
    handleBeforeUnload(event) {
      try {
        this.personalTrainingDTO.ptReservationStatus = 1
        let sessionId = localStorage.getItem('ptSeq')
        ApiClient.put(
          '/personal-trainings/' + sessionId,
          this.personalTrainingDTO
        )
        localStorage.removeItem('ptSeq')
      } catch (error) {
        console.error('Error sending API request:', error)
      }
      window.removeEventListener('beforeunload', this.handleBeforeUnload)
    },
  },
}
</script>

<style>
#ptRoom {
  width: 100%;
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
  border-radius: 5%;
}
#margin {
  width: 5%;
  height: 100%;
}
video {
  width: 100%;
  border-radius: 5%;
}
#controllerButtonContainer {
  height: 15%;
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
