<template>
  <div>
      <button @click="plusMinerals">Gather Minerals</button>
      <button @click="plusGas">Gather Gas</button>
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
}
</script>

<style>

</style>