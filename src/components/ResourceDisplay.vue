<template>
  <div class="resource-bar">
      <div title="Minerals" class="mineral-display"><font-awesome-icon icon="fa-solid fa-gem" /> {{minerals}}</div>
      <div title="Gas" class="gas-display"><font-awesome-icon icon="fa-solid fa-cloud" /> {{gas}}</div>
      <div><font-awesome-icon icon="fa-solid fa-person" /> {{`${supplyCount}/${maxSupplyCount}`}}</div>
      <div title="Clicks" class="click-display"><font-awesome-icon icon="fa-solid fa-computer-mouse" /> {{clicks}}</div>
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
        }
    }
}
</script>

<style>
.resource-bar {
    display: flex;
}
.resource-bar > div {
    margin-right: 2vw;
}
</style>