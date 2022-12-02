<template>
  <div>
    <h3>Build Units</h3>
    <div v-for="unit in this.$store.state.units" :key="unit.name">
      <h4>{{ unit.name }}</h4>
      <div class="description">
        {{ gatherDescription(unit) }}
      </div>
      <div class="cost-box">
        <div>Cost:</div>
        <div v-if="unit.mineralCost">
          <font-awesome-icon icon="fa-solid fa-gem" />
          {{ unit.mineralCost }}
        </div>
        <div v-if="unit.gasCost">
          <font-awesome-icon icon="fa-solid fa-cloud" />
          {{ unit.gasCost }}
        </div>
        <div>
          <font-awesome-icon icon="fa-solid fa-person" />
          {{ unit.supplyCost }}
        </div>
        <div>
          <font-awesome-icon icon="fa-solid fa-clock" />
          {{ unit.timeCost/1000 }}
        </div>
        
        
      </div>
      <button :disabled="!isPurchaseable(unit)" @click="recruitUnit(unit)">Recruit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "buy-menu",
  methods: {
    plural(num) {
      return num === 1 ? "" : "s";
    },
    gatherDescription(unit) {
      const amount = unit.gatherAmount;
      const speed = unit.speed;
      return `Gathers ${amount} resource${this.plural(amount)} every 
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
      this.$store.commit("ADD_UNIT", unit)
      this.$store.commit("SUPPLY_COUNT")
    },
    payMinerals(unit) {
      const amount = unit.mineralCost;
      this.$store.commit("SPEND_MINERALS", amount);
    },
    payGas(unit) {
      const amount = unit.gasCost;
      this.$store.commit("SPEND_GAS", amount);
    }
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