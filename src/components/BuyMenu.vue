<template>
  <div>
      <h2>Build Units</h2>
      <div v-for="unit in this.$store.state.units" :key="unit.name">
          <h3>{{unit.name}}</h3>
          <div class="description">
            {{gatherDescription}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    plural(num) {
      return num === 1 ? "" : "s";
    },
    gatherDescription() {
      let amount = this.unit.gatherAmount;
      let speed = this.unit.speed; 
      return `Gathers ${amount} resource${this.plural(amount)} every ${speed/1000} second${this.plural(speed/1000)}`;
    }
  },
  computed : {
    
  }
}
</script>

<style>

</style>