import ReportDateUtils from '@/module/report/services/reportDateUtils'

const targetChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
    r: {
      beginAtZero: true,
      max: 10, // Set the maximum value on the radar chart
      min: 0, // Set the minimum value on the radar chart
      ticks: {
        stepSize: 2,
      },
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
const scoreChartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'chartArea',
      labels: {
        usePointStyle: true,
        boxHeight: 6,
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
          size: 12,
        },
        callback: function (val, idx) {
          return new Date(this.getLabelForValue(val)).getDate()
        },
        color: '#565656',
      },
    },
    y: {
      display: false,
      // beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 5,
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
  interaction: {
    intersect: false,
  },
}

export { calorieChartOptions, scoreChartOptions, targetChartOptions }
