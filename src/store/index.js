import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resources: {
      clickCount: 0,
      mineralCount: 0,
      gasCount: 0,
    },
    units: [
      {
        name: "Servo",
        speed: 5000,
        gatherAmount: 1,
        available: true
      }
    ],
    buildings: [],
    upgrades: [],
  },
  getters: {
    minerals(state) {
      return state.resources.mineralCount;
    },
    gas(state) {
      return state.resources.gasCount;
    },
    clicks(state) {
      return state.resources.clickCount;
    },
  },
  mutations: {
    PLUS_MINERALS(state) {
      state.resources.mineralCount++;
      state.resources.clickCount++;
    },
    PLUS_GAS(state) {
      state.resources.gasCount++;
      state.resources.clickCount++;
    },
    SPEND_MINERALS(state, amount) {
      let minerals = state.resources.mineralCount;
      if (amount <= minerals) {
        state.resources.mineralCount = minerals-amount;
      }
    }
  },
  actions: {
  },
  modules: {
  },
  // Strict should not be used in production code. It is used here as a
  // learning aid to warn you if state is modified without using a mutation.
  strict: true
})
