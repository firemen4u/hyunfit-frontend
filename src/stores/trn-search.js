import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTrnSearchStore = defineStore('trn-search', {
  state: () => ({
    options:{
      lessonTypes: [],
      trainerGender: ''
    }
  }),
  getters: {
    allOptions(state) {
    return this.options;
    }
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow functionsrc/stores/trn-search.js
    updateLessonTypes(newLessonType) {
      this.options.lessonTypes = newLessonType
      //console.log("actions LessonTypes " + newLessonType);
    },
    updateTrainerGender(newTrainerGender) {
      this.options.trainerGender = newTrainerGender
      //console.log("actions trainerGeneder " + newTrainerGender);
    }
  }
})
