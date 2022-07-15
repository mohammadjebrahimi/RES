// stores/counter.js
import { defineStore } from 'pinia'
import state from './state'
import actions from './actions'
import getters from './getters'
export const useHeliumStore = defineStore('helium', {
  state,
  getters,
  actions,
})