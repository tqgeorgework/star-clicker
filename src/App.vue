<template>
<div>
  <h1>Star Clicker</h1>
  <resource-display/>
  <star-clicker/>
  <buy-menu/>
</div>
</template>

<script>
import BuyMenu from './components/UnitMenu.vue';
import ResourceDisplay from './components/ResourceDisplay.vue';
import StarClicker from './components/StarClicker.vue';
export default {
  components: { StarClicker, ResourceDisplay, BuyMenu },};
</script>

<style>
body {
  background-color: lightgray;
}
#app {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 800px;
  margin: 60px auto 0 auto;
}
</style>
