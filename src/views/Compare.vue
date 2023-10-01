<template>
  <div class="compare">
    <div id="progress" :style="{ width: `${progress * 100}%` }" />
    <h1>{{ showTitle }}</h1>
    <compare-section />
    <ranking-section id="ranking-section" :showId="this.$route.query.id" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CompareSection from "@/components/CompareSection.vue";
import RankingSection from "@/components/RankingSection.vue";
import axios from "axios";

export default Vue.extend({
  name: "Compare",
  components: { CompareSection, RankingSection },
  data: () => {
    return {
      showTitle: ""
    };
  },
  computed: {
    progress: function() {
      return this.$store.getters.getProgress(String(this.$route.query.id));
    }
  },
  created: async function() {
    return (this.showTitle =
      this.$store.getters.getCached(this.$route.query.id) ||
      (await axios.get(`tvtitle?id=${this.$route.query.id}`)).data);
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@500&family=Varela+Round&display=swap");

#progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background-color: #bd93f9;
  z-index: 1;
  transition: width 200ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

h1 {
  font-family: "Hind Madurai", sans-serif;
  margin: 0;
  padding: 10vh;
  font-size: 3em;
}

h2 {
  font-family: "Hind Madurai", sans-serif;
  font-size: 2em;
  margin-bottom: 64px;
}

#ranking-section {
  position: relative;
  background-color: #21222c;
  padding: 24px 10% 0 10%;
  z-index: 2;
  /* background-color: #282a36; */
}
</style>
