<template>
  <div>
    <h3>Buildings</h3>
    <div
      class="buildings"
      v-for="building in this.$store.state.buildings"
      :key="building.name"
      ref="building"
    >
      <h4>{{ building.name }}</h4>
      <div class="description">
        {{ building.description }}
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
        <span v-if="building.constructing">Constructing...{{timerCount}}</span>
      </div>
      <button
        :disabled="!isPurchaseable(building)"
        @click="startBuilding(building)"
      >
        Construct
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "building-menu",
  components: {},
  data() {
    return {
      timerCount: 30
    }
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000)
      }
    },
    timerCount: {
      handler(value) {
        if (value> 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true
    }
  },
  methods: {
    plural(num) {
      return num === 1 ? "" : "s";
    },
    startCountdown(building) {
      this.timerCount = building.timeCost/1000;
      this.timerEnabled = true;
    },
    isPurchaseable(building) {
      if (
        building.constructing === true ||
        !this.isUnlocked(building) ||
        building.mineralCost > this.$store.getters.minerals ||
        building.gasCost > this.$store.getters.gas
      ) {
        return false;
      } else {
        return true;
      }
    },
    startBuilding(building) {
      building.constructing = true;
      this.startCountdown(building);
      this.$store.commit("SPEND_MINERALS", building.mineralCost)
      this.$store.commit("SPEND_GAS", building.gasCost);
      setTimeout(this.constructBuilding, building.timeCost, building);
    },
    constructBuilding(building) {
      this.$store.commit("CONSTRUCT_BUILDING", building)
      this.$store.commit("MAX_SUPPLY_COUNT");
      building.constructing = false;
    },
    isUnlocked(building) {
      let trueCount = 0;
      let output = true;
      if (building.requirements) {
        building.requirements.forEach(requirement => {
        if (this.$store.state.constructedBuildings.find(building => building.name === requirement)) {
          trueCount++;
        }
      })
      if (trueCount === building.requirements.length) {
          output = true;
        } else {
          output = false;
        }
      }
      return output;
    },
  },
  computed: {
  },
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