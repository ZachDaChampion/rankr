<template>
  <div class="compare">
    <div class="compare-section">
      <h1>The Mandalorian</h1>
      <div id="episodes">
        <episode id="episode-start-active" />
        <h2>OR</h2>
        <episode id="episode-start-active" />
      </div>
    </div>
    <div class="ranking-details"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Episode from "@/components/Episode.vue";

export default Vue.extend({
  name: "Compare",
  components: { Episode },
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

.compare-section {
  width: 100%;
  min-height: 100vh;
  background-color: #383a59;
}

.ranking-details {
  width: 100%;
  background-color: #282a36;
}

#episodes {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
