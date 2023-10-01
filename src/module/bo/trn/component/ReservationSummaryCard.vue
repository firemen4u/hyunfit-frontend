<template>
  <div class="smr-card">
    <div :class="'mini-color-bar-' + this.index"></div>
    <div class="card-main">
      <div class="card-header">
        <span class="ml-3">이달의 {{ settingData.status }}</span>
      </div>
      <div class="card-rate">
        <div class="gauge">
          <div class="gauge-fill" :style="{ width: gaugeWidth }"></div>
        </div>
      </div>
      <div class="card-cnt" v-if="this.index === 1">
        <span class="mr-3">{{ settingData.output }}</span>
      </div>
      <div class="card-cnt" v-if="this.index !== 1">
        <span class="mr-3">{{ settingData.output }}개</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sendToChild: Object,
    index: Number,
  },
  data() {
    return {
      settingData: {
        status: null,
        output: 0,
      },
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData() {
      if (this.index == 1) {
        if (
          this.sendToChild.completeCnt +
            this.sendToChild.noShowCnt +
            this.sendToChild.upcomingCnt +
            this.sendToChild.cancelCnt ===
          0
        ) {
          this.settingData = { status: '진행률', output: '0%' }
        } else {
          this.settingData = {
            status: '진행률',
            output:
              Math.round(
                ((this.sendToChild.completeCnt + this.sendToChild.noShowCnt) /
                  (this.sendToChild.completeCnt +
                    this.sendToChild.noShowCnt +
                    this.sendToChild.upcomingCnt)) *
                  100
              ) +
              '%(총 ' +
              this.sendToChild.totalCnt +
              '건)',
          }
        }
      } else if (this.index == 2) {
        this.settingData = {
          status: '노쇼',
          output: this.sendToChild.noShowCnt,
        }
      } else if (this.index == 3) {
        this.settingData = {
          status: '취소',
          output: this.sendToChild.cancelCnt,
        }
      } else if (this.index == 4) {
        this.settingData = {
          status: '예정',
          output: this.sendToChild.upcomingCnt,
        }
      } else {
        this.settingData = {
          status: '완료',
          output: this.sendToChild.completeCnt,
        }
      }
    },
  },
  computed: {
    gaugeWidth() {
      if (this.settingData.status === '진행률') {
        const total =
          this.sendToChild.completeCnt +
          this.sendToChild.noShowCnt +
          this.sendToChild.upcomingCnt
        const completed = total - this.sendToChild.upcomingCnt
        const percentage = (completed / total) * 100
        return percentage + '%'
      } else {
        const completed = this.settingData.output
        const total =
          this.sendToChild.completeCnt +
          this.sendToChild.noShowCnt +
          this.sendToChild.upcomingCnt
        const percentage = (completed / total) * 100
        return percentage + '%'
      }
    },
  },
}
</script>

<style scoped>
.mini-color-bar-1 {
  width: 6px;
  height: 85px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #aaaaaa;
}
.mini-color-bar-2 {
  width: 6px;
  height: 85px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: rgb(195, 35, 35);
}
.mini-color-bar-4 {
  width: 6px;
  height: 85px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: rgb(255, 251, 0);
}
.mini-color-bar-5 {
  width: 6px;
  height: 85px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: rgb(19, 103, 19);
}
.mini-color-bar-3 {
  width: 6px;
  height: 85px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: rgb(255, 150, 29);
}
.smr-card {
  display: flex;
  flex-direction: row;
  width: 160px;
  height: 85px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.card-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  height: 85px;
  background-color: white;
}

.card-header {
  display: flex;
  justify-self: start;
  width: 150px;
  height: 25px;
}
.card-rate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 25px;
}
.gauge {
  width: 120px;
  height: 5px;
  background-color: #efefef;
  border-radius: 5px;
  overflow: hidden;
}

.gauge-fill {
  height: 5px;
  background-color: rgb(212, 217, 236);
}
.card-cnt {
  display: flex;
  justify-content: flex-end;
  width: 150px;
  height: 25px;
}
</style>
