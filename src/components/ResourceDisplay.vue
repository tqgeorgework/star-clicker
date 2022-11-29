<template>
  <div>
      <div class="mineral-display">Minerals: {{minerals}}</div>
      <div class="gas-display">Gas: {{gas}}</div>
      <div class="click-display">Total Clicks: {{clicks}}</div>
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
        }
    }
}
</script>

<style>

</style>