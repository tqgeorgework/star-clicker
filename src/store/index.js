import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    
    resources: {
      clickCount: 0,
      mineralCount: 100,
      gasCount: 0,
      supplyCount: 0,
      maxSupplyCount: 8,
    },
    units: [
      {
        name: "Servo",
        speed: 5000,
        gatherAmount: 5,
        mineralHarvest: 5,
        gasHarvest: 3,
        available: true,
        mineralCost: 50,
        gasCost: 0,
        timeCost: 12000,
        supplyCost: 1,
      }
    ],
    recruitedUnits: [],
    buildings: [],
    constructedBuildings: [],
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
    supply(state) {
      return state.resources.supplyCount;
    },
    maxSupply(state) {
      return state.resources.maxSupplyCount;
    },
    unit(state, name) {
      return state.units.find(unit => unit.name === name);
    }
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
    },
    SPEND_GAS(state, amount) {
      let gas = state.resources.gasCount;
      if (amount <= gas) {
        state.resources.gasCount = gas-amount;
      }
    },
    ADD_UNIT(state, unit) {
      state.recruitedUnits.push(unit);
    },
    SUPPLY_COUNT(state) {
      let count = 0;
      state.recruitedUnits.forEach(unit => {
        count += unit.supplyCost
      })
      state.resources.supplyCount = count;
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
