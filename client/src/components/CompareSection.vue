<template>
  <div class="compare-section">
    <transition name="slide">
      <div
        id="episodes"
        v-show="
          Object.keys(firstEp).length &&
            Object.keys(secondEp).length &&
            imagesLoaded
        "
      >
        <episode id="episode-first" ref="episodeFirst" :data="firstEp" />
        <h2>OR</h2>
        <episode id="episode-second" ref="episodeSecond" :data="secondEp" />
      </div>
    </transition>
    <h2
      v-show="
        !(
          Object.keys(firstEp).length &&
          Object.keys(secondEp).length &&
          imagesLoaded
        )
      "
    >
      Loading episodes...
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Episode from "@/components/Episode.vue";
import axios from "axios";
import ImgComponent from "./ImgComponent.vue";

@Component({
  components: { Episode },
})
export default class CompareSection extends Vue {
  private firstEp: any = {};
  private secondEp: any = {};

  get id() {
    return this.$route.query.id ? String(this.$route.query.id) : "";
  }

  get episodesDownloaded() {
    return this.$store.getters.getComparisons(this.id) ? true : false;
  }

  get lookup() {
    return this.$store.getters.getComparisons(this.id).lookup;
  }

  get comparisons() {
    return this.$store.getters.getComparisons(this.id).comparisons;
  }

  get imagesLoaded() {
    console.log("Episode", this.$refs);
    return (
      (this.$refs.episodeFirst as Episode).imgLoaded &&
      (this.$refs.episodeSecond as Episode).imgLoaded
    );
  }

  async created() {
    if (!this.episodesDownloaded)
      await this.$store.dispatch("downloadComparisons", this.id);
    console.log("LOOKUP", this.lookup);
    const chosen = this.pickRandom();
    console.log("ADJUSTED", chosen);
    console.log("REFS", this.$refs);

    if (!chosen) return 0;

    return await this.setComparison(
      this.id,
      this.lookup[chosen[0]],
      this.lookup[chosen[1]]
    );
  }

  pickRandom() {
    const secondOrig = Math.floor(Math.random() * this.lookup.length);
    const firstOrig = Math.floor(Math.random() * secondOrig);
    let first = firstOrig;
    let second = secondOrig;

    console.log("ORIGINAL", [first, second]);

    while (first === second || this.comparisons[first][second]) {
      ++first;
      if (first >= second) {
        first = 0;
        ++second;
      }
      if (second >= this.lookup.length) {
        first = 0;
        second = 1;
      }

      if (first === firstOrig && second === secondOrig) return null;
    }

    return [first, second];
  }

  async setComparison(showId: string, first: any, second: any, delay = 0) {
    const promFirst = axios
      .get(
        `http://localhost:3000/episode?show=${showId}&s=${first.season}&e=${first.number}&imgsize=w780`
      )
      .then((r) => r.data);
    const promSec = axios
      .get(
        `http://localhost:3000/episode?show=${showId}&s=${second.season}&e=${second.number}&imgsize=w780`
      )
      .then((r) => r.data);
    const promDelay = new Promise((r) => setTimeout(r, delay));

    console.log(promFirst, promSec);

    const [resFirst, resSec, resDelay] = await Promise.all([
      promFirst,
      promSec,
      promDelay,
    ]);
    console.log(resFirst, resSec);

    this.firstEp = resFirst;
    this.secondEp = resSec;
    return 0;
  }
}
</script>

<style scoped>
.compare-section {
  width: 100%;
  min-height: calc(100vh - 3em - 20vh);
}

#episodes {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
}

h2 {
  margin: auto 0;
}

.slide-enter-active,
.slide-leave-active,
.slide-move {
  transition: opacity 500ms cubic-bezier(0.075, 0.82, 0.165, 1),
    transform 750ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.slide-enter {
  opacity: 0;
  transform: translateY(50%);
}
</style>
