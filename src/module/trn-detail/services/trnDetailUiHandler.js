import TrnDetailDateUtils from '@/module/trn-detail/services/trnDetailDateUtils'
import { getTrnFullyReservedDays } from '@/module/trn-detail/services/trnDetailApi'

async function reloadDatePicker(trnDetailPageDatePicker, trnId, date) {
  // 날짜 계산
  let params = TrnDetailDateUtils.toReservedDaysSearchDTO(date)

  let result = await getTrnFullyReservedDays(trnId, params)
  const dayElements = trnDetailPageDatePicker.value.querySelectorAll(
    '.v-date-picker-month__days div'
  )
  dayElements.forEach(element => {
    const calDateStr = element.getAttribute('data-v-date')
    if (calDateStr == null) return
    if (
      result.days.some(
        reservedDay =>
          TrnDetailDateUtils.padDateString(calDateStr) ===
          reservedDay.split(' ')[0]
      )
    ) {
      element.children[0].disabled = true
      element.children[0].classList.add('trn-detail-disabled-btn')
    } else {
      element.children[0].disabled = false
      element.children[0].classList.remove('trn-detail-disabled-btn')
    }
  })
}

export default {
  reloadDatePicker,
}
