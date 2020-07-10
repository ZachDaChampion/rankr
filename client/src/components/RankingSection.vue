<template>
  <div>
    <ranked-episode
      v-for="(ep, index) in rankings"
      :key="index"
      :index="index"
      :show-id="showId"
      :season="ep.season"
      :number="ep.number"
      :rating="ep.rating"
      :rank="ep.rank"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RankedEpisode from "@/components/RankedEpisode.vue";

@Component({
  components: { RankedEpisode },
})
export default class RankingSection extends Vue {
  @Prop({ required: true })
  public showId!: string;

  get rankings() {
    console.log("RANKINGS", this.$store.getters.getRankings(this.showId));
    return this.$store.getters.getRankings(this.showId);
  }
}
</script>

<style scoped></style>
