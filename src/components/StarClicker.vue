<template>
  <div class="button-container">
    <button @click="plusMinerals">Gather Minerals</button>
    <button :disabled="!hasRefinery" @click="plusGas">Gather Gas</button>
  </div>
</template>

<script>
export default {
  methods: {
    plusMinerals() {
      this.$store.commit("PLUS_MINERALS");
    },
    plusGas() {
      this.$store.commit("PLUS_GAS");
    },
  },
  computed: {
    hasRefinery() {
      return this.$store.state.constructedBuildings
        .filter((building) => building.name === "Refinery")
        .length > 0
        ? true
        : false;
    },
  },
};
</script>

<style>
button {
  margin-right: 1vw;
}
</style>