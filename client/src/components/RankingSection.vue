<template>
  <div class="ranking-section">
    <ranked-episode />
    <ranked-episode />
    <ranked-episode />
    <ranked-episode />
    <ranked-episode />
    <ranked-episode />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RankedEpisode from "@/components/RankedEpisode.vue";

@Component({
  components: { RankedEpisode },
})
export default class RankingSection extends Vue {}
</script>

<style scoped></style>
