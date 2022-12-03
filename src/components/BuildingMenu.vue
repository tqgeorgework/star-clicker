<template>
  <div>
    <h3>Buildings</h3>
    <div v-for="building in this.$store.state.constructedBuildings" :key="building.name">
      <h4>{{ building.name }}</h4>
      <div class="description">
        {{ gatherDescription(building) }}
      </div>
      <div class="cost-box">
        <div>Cost:</div>
        <div title="Minerals" v-if="building.mineralCost">
          <font-awesome-icon icon="fa-solid fa-gem" />
          {{ building.mineralCost }}
        </div>
        <div title="Gas" v-if="building.gasCost">
          <font-awesome-icon icon="fa-solid fa-cloud" />
          {{ building.gasCost }}
        </div>
        <div title="Time" v-if="building.timeCost">
          <font-awesome-icon icon="fa-solid fa-clock" />
          {{ building.timeCost / 1000 }}
        </div>
      </div>
      <button :disabled="!isPurchaseable(building)" @click="recruitUnit(building)">
        Recruit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "building-menu",
  methods: {
    plural(num) {
      return num === 1 ? "" : "s";
    },
    gatherDescription(building) {
      const minerals = building.mineralHarvest;
      const gas = building.gasHarvest;
      const speed = building.speed;
      return `Gathers ${minerals} mineral${this.plural(
        minerals
      )} or ${gas} gas every 
      ${speed / 1000} second${this.plural(speed / 1000)}`;
    },
    isPurchaseable(unit) {
      if (
        unit.mineralCost > this.$store.getters.minerals ||
        unit.gasCost > this.$store.getters.gas ||
        unit.supplyCost > this.$store.getters.maxSupply
      ) {
        return false;
      } else {
        return true;
      }
    },
    recruitUnit(unit) {
      this.payMinerals(unit);
      this.payGas(unit);
      this.$store.commit("ADD_UNIT", unit);
      this.$store.commit("SUPPLY_COUNT");
    },
    payMinerals(unit) {
      const amount = unit.mineralCost;
      this.$store.commit("SPEND_MINERALS", amount);
    },
    payGas(unit) {
      const amount = unit.gasCost;
      this.$store.commit("SPEND_GAS", amount);
    },
  },
  computed: {},
};
</script>

<style>
.cost-box {
  display: flex;
}
.cost-box > div {
  margin-right: 2vw;
}
</style>