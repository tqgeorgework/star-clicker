<template>
  <div class="resource-bar">
    <div title="Minerals" class="mineral-display">
      <font-awesome-icon icon="fa-solid fa-gem" /> {{ minerals }}
    </div>
    <div title="Gas" class="gas-display">
      <font-awesome-icon icon="fa-solid fa-cloud" /> {{ gas }}
    </div>
    <div title="Supply" class="supply-display">
      <font-awesome-icon icon="fa-solid fa-person" />
      {{ `${supplyCount}/${maxSupplyCount}` }}
    </div>
    <div title="Clicks" class="click-display">
      <font-awesome-icon icon="fa-solid fa-computer-mouse" /> {{ clicks }}
    </div>
    <div title="Time" id="time" class="time-display">
      <font-awesome-icon icon="fa-solid fa-clock"/>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    minerals() {
      return this.$store.getters.minerals;
    },
    gas() {
      return this.$store.getters.gas;
    },
    clicks() {
      return this.$store.getters.clicks;
    },
    supplyCount() {
      return this.$store.getters.supply;
    },
    maxSupplyCount() {
      return this.$store.getters.maxSupply;
    },
    mineralIncome() {
      return true;
    },
    gasIncome() {
      return true;
    },
    calculateIncome() {
      return true;
    },
  },
  methods: {
    time() {
      let timer = 0;
      setInterval((timer += 1), 1000);
      return timer;
    },
  },
  created() {
    const servo = this.$store.getters.servo;
    const initialWorkers = 12;
    for (let i = 0; i < initialWorkers; i++) {
      this.$store.commit("ADD_UNIT", servo);
    }
    this.$store.commit("SUPPLY_COUNT");

    let cc = JSON.parse(JSON.stringify(this.$store.getters.cc));
    cc.supply = 15;
    cc.activeWorkers = initialWorkers;

    this.$store.commit("CONSTRUCT_BUILDING", cc);
    this.$store.commit("MAX_SUPPLY_COUNT");
  },
};
</script>

<style>
.resource-bar {
  display: flex;
}
.resource-bar > div {
  margin-right: 2vw;
}
</style>