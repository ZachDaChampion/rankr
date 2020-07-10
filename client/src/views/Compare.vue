<template>
  <div class="compare">
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
      showTitle: "",
    };
  },
  created: async function() {
    return (this.showTitle =
      this.$store.getters.getCached(this.$route.query.id) ||
      (
        await axios.get(
          `http://localhost:3000/tvtitle?id=${this.$route.query.id}`
        )
      ).data);
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@500&family=Varela+Round&display=swap");

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
  background-color: #21222c;
  padding: 24px 10% 0 10%;
  /* background-color: #282a36; */
}
</style>
