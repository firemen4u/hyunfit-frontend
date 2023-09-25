<template>
  <div class="smr-card rounded-lg">
    <div :class="'mini-color-bar-' + this.index"></div>
    <div class="card-main">
      <div class="card-header ml-7">{{ settingData.status }}</div>
      <div class="card-rate">
        <div class="gauge">
          <div class="gauge-fill" :style="{ width: gaugeWidth }"></div>
        </div>
      </div>
      <div v-if="this.index === 1" class="card-content ml-28">
        {{ settingData.output }}
      </div>
      <div v-if="this.index !== 1" class="card-content ml-36">
        {{ settingData.output }}개
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
        this.settingData = {
          status: '진행률',
          output:
            this.sendToChild.completeCnt +
            this.sendToChild.noShowCnt +
            '/' +
            (this.sendToChild.completeCnt +
              this.sendToChild.noShowCnt +
              this.sendToChild.upcomingCnt),
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
.smr-card {
  display: flex;
  flex-direction: row;
  width: 140px;
  height: 85px;
}
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
.card-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 85px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: white;
}

.card-header {
  width: 110px;
  height: 25px;
}
.card-rate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 25px;
  margin-left: 20px;
}
.gauge {
  width: 100px;
  height: 5px;
  background-color: #efefef;
  border-radius: 5px;
  overflow: hidden;
}

.gauge-fill {
  height: 5px;
  background-color: rgb(212, 217, 236);
}
.card-content {
  display: flex;
  width: 60px;
  height: 25px;
}
</style>
