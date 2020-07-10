<template>
  <div class="compare-section" :class="smallArea ? 'short' : ''">
    <div id="episodes">
      <transition :name="`slide-${selected === 0 ? 'up' : 'down'}`">
        <episode
          id="episode-first"
          ref="episodeFirst"
          v-show="Object.keys(firstEp).length && displayEps && !finished"
          :data="firstEp"
          @click.native="chooseWinner(0)"
        />
      </transition>
      <transition name="fade">
        <h2
          v-show="
            Object.keys(firstEp).length &&
              Object.keys(secondEp).length &&
              imagesLoaded &&
              displayEps &&
              !finished
          "
        >
          OR
        </h2>
      </transition>
      <transition :name="`slide-${selected === 1 ? 'up' : 'down'}`">
        <episode
          id="episode-second"
          ref="episodeSecond"
          v-show="Object.keys(secondEp).length && displayEps && !finished"
          :data="secondEp"
          @click.native="chooseWinner(1)"
        />
      </transition>
    </div>
    <h2
      v-show="
        !(
          Object.keys(firstEp).length &&
          Object.keys(secondEp).length &&
          imagesLoaded
        ) && !finished
      "
    >
      Loading episodes...
    </h2>
    <transition name="fade">
      <h2 v-show="finished">
        All episodes have been compared!
      </h2>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Episode from "@/components/Episode.vue";
import axios from "axios";
import ImgComponent from "./ImgComponent.vue";
import { calculateRatings, rank } from "../stats";

function delay(t: number) {
  return new Promise((r) => setTimeout(r, t));
}

@Component({
  components: { Episode },
})
export default class CompareSection extends Vue {
  private firstEp: any = {};
  private secondEp: any = {};
  private selected = -1;
  private displayEps = true;
  private finished = false;
  private smallArea = false;

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

  get rankings() {
    return this.$store.getters.getRankings(this.id);
  }

  async created() {
    if (!this.episodesDownloaded)
      await this.$store.dispatch("downloadComparisons", this.id);
    this.$store.getters.getProgress(this.id);
    const chosen = this.pickRandom();

    if (!chosen) {
      await this.finishComparing();
      return 0;
    }

    return await this.setComparison(this.id, chosen[0], chosen[1]);
  }

  async finishComparing() {
    this.displayEps = false;
    await delay(650);
    this.finished = true;
    await delay(300);
    this.smallArea = true;
  }

  updateRankings() {
    const ratings = calculateRatings(this.comparisons);
    this.$store.dispatch("updateRankings", {
      showId: this.id,
      rankings: rank(ratings, this.lookup),
    });
  }

  pickRandom() {
    const secondOrig = Math.floor(Math.random() * this.lookup.length);
    const firstOrig = Math.floor(Math.random() * secondOrig);
    console.log(firstOrig, secondOrig);
    let first = firstOrig;
    let second = secondOrig;
    let prevF = first;
    let prevS = second;

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

      console.log(first, second);
      if (
        (first === prevF && second === prevS) ||
        (first === firstOrig && second === secondOrig)
      )
        return null;
      prevF = first;
      prevS = second;
    }

    return [first, second];
  }

  async setComparison(
    showId: string,
    firstIndex: number,
    secondIndex: number,
    delayTime = 0
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
    const promDelay = delay(delayTime);

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
    this.selected = index;
    switch (index) {
      case 0:
        this.$store.dispatch("chooseComparisonWinner", this.firstEp.index);
        break;
      case 1:
        this.$store.dispatch("chooseComparisonWinner", this.secondEp.index);
        break;
    }

    this.updateRankings();

    const chosen = this.pickRandom();
    console.log(this.comparisons);
    if (!chosen) {
      await this.finishComparing();
      return 0;
    }

    this.displayEps = false;
    await this.setComparison(this.id, chosen[0], chosen[1], 600);
    this.displayEps = true;
    return 0;
  }
}
</script>

<style scoped>
.compare-section {
  width: 100%;
  min-height: calc(100vh - 3em - 20vh);
  transition: all 1200ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.short {
  padding-bottom: 64px;
  min-height: 0;
}

#episodes {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
}

h2 {
  margin: auto 0;
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);
}

.slide-up-enter,
.slide-down-enter {
  transform: translateY(50%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(5%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
