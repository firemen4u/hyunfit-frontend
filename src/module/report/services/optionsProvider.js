import ReportDateUtils from '@/module/report/services/reportDateUtils'

const expChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        font: {
          size: 10,
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  layout: {
    padding: {
      bottom: 5,
      left: 5,
      right: 16,
      top: 16,
    },
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      display: false, // 범례 숨김
    },
  },
}

function formatToPercentString(number) {
  return ` ${Math.round(number * 100)}%`
}
// https://stackblitz.com/github/apertureless/vue-chartjs/tree/main/sandboxes/radar?file=src%2FApp.vue
// https://www.chartjs.org/docs/latest/configuration/tooltip.html#tooltip-callbacks
const scoreChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'chartArea',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        useBorderRadius: true,
        borderRadius: 500,
      },
    },

    tooltip: {
      callbacks: {
        label: function (context) {
          return formatToPercentString(context.raw)
        },
      },
    },
  },
}
const calorieChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      // display: false,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 10,
        },
        callback: function (val, idx) {
          return new Date(this.getLabelForValue(val)).getDate()
        },
        color: '#565656',
      },
    },
    y: {
      // display: false,
      // beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
  layout: {
    padding: {
      bottom: 5,
      left: 5,
      right: 16,
      top: 16,
    },
  },
  plugins: {
    legend: {
      display: false, // 범례 숨김
    },
    tooltip: {
      callbacks: {
        title: item => ReportDateUtils.timestampToFullDate(item[0].label),
      },
    },
  },
}

export { expChartOptions, calorieChartOptions, scoreChartOptions }
