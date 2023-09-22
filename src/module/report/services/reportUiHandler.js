function parseDateString(dateString) {
  if (dateString == null) return null
  const parts = dateString.split('-')
  return new Date(parts[0], parts[1] - 1, parts[2])
}

function renderDatePicker(wrapper, exercisedDays) {
  if (exercisedDays.length === 0) return
  const dayElements = wrapper.value.querySelectorAll(
    '.v-date-picker-month__days div'
  )
  const exercisedDates = exercisedDays.map(parseDateString)
  dayElements.forEach(element => {
    const calDateStr = element.getAttribute('data-v-date')
    if (calDateStr == null) return
    let calDate = parseDateString(calDateStr)

    const btn = element.querySelector('button')
    if (exercisedDates.some(eDate => calDate.getTime() === eDate.getTime())) {
      // if (btn.classList.contains('v-btn--active')) return
      btn.classList.add('bg-exercised')
      btn.classList.remove('bg-transparent')
    } else {
      btn.classList.add('bg-transparent')
      btn.classList.remove('bg-exercised')
      btn.classList.remove('v-btn--active')
    }
  })
}

export default {
  renderDatePicker,
}
