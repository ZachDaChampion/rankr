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
        <episode
          id="episode-first"
          ref="episodeFirst"
          :data="firstEp"
          @click.native="chooseWinner(0)"
        />
        <h2>OR</h2>
        <episode
          id="episode-second"
          ref="episodeSecond"
          :data="secondEp"
          @click.native="chooseWinner(1)"
        />
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
    return (
      (this.$refs.episodeFirst as Episode).imgLoaded &&
      (this.$refs.episodeSecond as Episode).imgLoaded
    );
  }

  async created() {
    if (!this.episodesDownloaded)
      await this.$store.dispatch("downloadComparisons", this.id);
    const chosen = this.pickRandom();

    if (!chosen) return 0;

    return await this.setComparison(this.id, chosen[0], chosen[1]);
  }

  pickRandom() {
    const secondOrig = Math.floor(Math.random() * this.lookup.length);
    const firstOrig = Math.floor(Math.random() * secondOrig);
    let first = firstOrig;
    let second = secondOrig;

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

  async setComparison(
    showId: string,
    firstIndex: number,
    secondIndex: number,
    delay = 0
  ) {
    const first = this.lookup[firstIndex];
    const second = this.lookup[secondIndex];

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

    const [resFirst, resSec, resDelay] = await Promise.all([
      promFirst,
      promSec,
      promDelay,
    ]);

    this.firstEp = resFirst;
    this.secondEp = resSec;
    this.firstEp.index = firstIndex;
    this.secondEp.index = secondIndex;

    this.$store.dispatch("updateCurrentComparisons", {
      showId: this.id,
      firstEp: this.firstEp.index,
      secondEp: this.secondEp.index,
    });
    return 0;
  }

  async chooseWinner(index: number) {
    switch (index) {
      case 0:
        this.$store.dispatch("chooseComparisonWinner", this.firstEp.index);
        break;
      case 1:
        this.$store.dispatch("chooseComparisonWinner", this.secondEp.index);
        break;
    }

    const chosen = this.pickRandom();
    console.log(this.comparisons);
    if (!chosen) return 0;
    return await this.setComparison(this.id, chosen[0], chosen[1]);
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
