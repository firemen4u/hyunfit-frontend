// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import DateFnsAdapter from '@date-io/date-fns'
import { ko } from 'date-fns/esm/locale'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  TimeScale,
  RadialLinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  TimeScale,
  RadialLinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Filler
)
const Colors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  primary: '#044589',
  'primary-darken-1': '#3700B3',
  secondary: '#03DAC6',
  'secondary-darken-1': '#018786',
  error: '#B00020',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FB8C00',
}

const myCustomLightTheme = {
  dark: false,
  colors: Colors,
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',

    themes: {
      myCustomLightTheme,
    },
  },
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      ko: ko,
    },
  },
})

export { vuetify, Colors }
