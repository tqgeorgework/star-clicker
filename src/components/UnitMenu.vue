<template>
  <div>
    <h3>Recruit Units</h3>
    <div v-for="unit in this.$store.state.units" :key="unit.name">
      <h4>{{ unit.name }}</h4>
      <div class="description">
        {{ unit.description }}
      </div>
      <div class="cost-box">
        <div>Cost:</div>
        <div title="Minerals" v-if="unit.mineralCost">
          <font-awesome-icon icon="fa-solid fa-gem" />
          {{ unit.mineralCost }}
        </div>
        <div title="Gas" v-if="unit.gasCost">
          <font-awesome-icon icon="fa-solid fa-cloud" />
          {{ unit.gasCost }}
        </div>
        <div title="Supply" v-if="unit.supplyCost">
          <font-awesome-icon icon="fa-solid fa-person" />
          {{ unit.supplyCost }}
        </div>
        <div title="Time" v-if="unit.timeCost">
          <font-awesome-icon icon="fa-solid fa-clock" />
          {{ unit.timeCost / 1000 }}
        </div>
      </div>
      <button :disabled="!isPurchaseable(unit)" @click="recruitUnit(unit)">
        Recruit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "unit-menu",
  methods: {
    // plural(num) {
    //   return num === 1 ? "" : "s";
    // },
    // gatherDescription(unit) {
    //   const minerals = unit.mineralHarvest;
    //   const gas = unit.gasHarvest;
    //   const speed = unit.speed;
    //   return `Gathers ${minerals} mineral${this.plural(
    //     minerals
    //   )} or ${gas} gas every 
    //   ${speed / 1000} second${this.plural(speed / 1000)}`;
    // },
    isPurchaseable(unit) {
      if (
        // this.buyCooldown(unit) === false ||
        this.$store.getters.supply >= this.$store.getters.maxSupply ||
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
      // this.buyCooldown();
    },
    payMinerals(object) {
      const amount = object.mineralCost;
      this.$store.commit("SPEND_MINERALS", amount);
    },
    payGas(object) {
      const amount = object.gasCost;
      this.$store.commit("SPEND_GAS", amount);
    },
    // buyCooldown(object) {
    //   let output = false;
    //   setTimeout(output = true, object.timeCost)
    //   return output;
    // }
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