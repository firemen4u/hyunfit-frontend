function parseDateString(dateString) {
  if (dateString == null) return null
  const parts = dateString.split('-')
  return new Date(parts[0], parts[1] - 1, parts[2])
}

function renderDatePicker(wrapper, exercisedDays) {
  const dayElements = wrapper.value.querySelectorAll(
    '.v-date-picker-month__days div'
  )
  const exercisedDates = exercisedDays.map(parseDateString)
  dayElements.forEach(element => {
    const calDateStr = element.getAttribute('data-v-date')
    if (calDateStr == null) return
    let calDate = parseDateString(calDateStr)
    if (exercisedDates.some(eDates => calDate.getDate() === eDates.getDate())) {
      const btn = element.querySelector('button')
      if (btn.classList.contains('v-btn--active') === false) {
        btn.classList.remove('bg-transparent')
        btn.classList.add('bg-exercised')
      }
    }
  })
}

export default {
  renderDatePicker,
}
