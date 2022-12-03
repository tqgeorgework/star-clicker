import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    maxSupplyCap: 200,
    refineryCount: 0,
    resources: {
      clickCount: 0,
      mineralCount: 100,
      gasCount: 0,
      supplyCount: 0,
      maxSupplyCount: 0,
    },
    units: [
      {
        name: "Servo",
        speed: 5000,
        gatherAmount: 5,
        mineralHarvest: 5,
        gasHarvest: 3,
        mineralCost: 50,
        gasCost: 0,
        timeCost: 12000,
        supplyCost: 1,
        description: "Constructs buildings, gathers 5 minerals/5 sec, or harvests 3 gas/5 sec",
      }
    ],
    recruitedUnits: [],
    buildings: [
      {
        name: "Command Center",
        mineralCost: 400,
        gasCost: 0,
        timeCost: 71000,
        supply: 10,
        description: "Recruits workers and allows up to 16 workers to gather minerals",
        recruitList: [
          "Servo"
        ],
        maxWorkers: 16,
        activeWorkers: 0,
      },
      {
        name: "Supply Depot",
        mineralCost: 100,
        gasCost: 0,
        timeCost: 40000,
        supply: 8,
        description: "Provides 8 additional supply.",
      },
      {
        name: "Refinery",
        mineralCost: 75,
        gasCost: 0,
        timeCost: 40000,
        description: "Allows up to three workers to harvest gas.",
        maxWorkerCount: 3,
        activeWorkers: 0
      },
      {
        name: "Barracks",
        mineralCost: 150,
        gasCost: 0,
        timeCost: 46000,
        description: "Recruits infantry units.",
        requirements: ["Supply Depot"],
      },
      {
        name: "Factory",
        mineralCost: 150,
        gasCost: 100,
        timeCost: 43000,
        description: "Recruits mechanical units.",
        requirements: ["Barracks"],
      },
      {
        name: "Starport",
        mineralCost: 150,
        gasCost: 100,
        timeCost: 36000,
        description: "Recruits spacecraft.",
        requirements: ["Factory"],
      },
    ],
    constructedBuildings: [],
    upgrades: [],
    researchedUpgrades: [],
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
    servo(state) {
      return state.units.find(unit => unit.name === "Servo");
    },
    cc(state) {
      return state.buildings.find(building => building.name === "Command Center")
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
        state.resources.mineralCount = minerals - amount;
      }
    },
    SPEND_GAS(state, amount) {
      let gas = state.resources.gasCount;
      if (amount <= gas) {
        state.resources.gasCount = gas - amount;
      }
    },
    ADD_UNIT(state, unit) {
      state.recruitedUnits.push(unit);
    },
    CONSTRUCT_BUILDING(state, building) {
      state.constructedBuildings.push(building)
    },
    SUPPLY_COUNT(state) {
      let count = 0;
      state.recruitedUnits.forEach(unit => {
        if (unit.supplyCost != null) {
          count += unit.supplyCost
        }
      })
      state.resources.supplyCount = count;
    },
    MAX_SUPPLY_COUNT(state) {
      let count = 0;
      state.constructedBuildings.forEach(building => {
        if (building.supply != null) {
          count += building.supply;
        }
      })
      count > state.maxSupplyCap ?
        state.resources.maxSupplyCount = state.maxSupplyCap :
        state.resources.maxSupplyCount = count;
    },
  },
  actions: {
  },
  modules: {
  },
  // Strict should not be used in production code. It is used here as a
  // learning aid to warn you if state is modified without using a mutation.
  strict: true
})
