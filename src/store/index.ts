import Vue from "vue";
import Vuex from "vuex";
import VuexPeristence from "vuex-persist";
import axios from "axios";

Vue.use(Vuex);

interface CachedData {
  name: string;
  expire?: number;
  created?: number;
  data: any;
}

interface ComparisonAddress {
  showId: string;
  firstEp: number;
  secondEp: number;
}

const vuexLocal = new VuexPeristence({
  reducer: (state: Record<any, any>) => ({
    comparisons: state.comparisons,
    rankings: state.rankings
  })
});

export default new Vuex.Store({
  state: {
    searchTerm: "",
    searchResults: Array<any>(),
    comparisons: {} as Record<string, any>,
    currentComparisons: {
      showId: "",
      firstEp: 0,
      secondEp: 0
    } as ComparisonAddress,
    cache: {} as Record<string, CachedData>,
    rankings: {} as Record<string, any>
  },
  mutations: {
    updateSearchTerm(state, newTerm: string) {
      state.searchTerm = newTerm;
    },
    updateSearchResults(state, newResults: Array<any>) {
      state.searchResults = newResults;
    },
    updateComparisons(state, data: any) {
      Vue.set(state.comparisons, data.id, data);
    },
    updateSingleComparison(state, data: [ComparisonAddress, number]) {
      console.log("COMPARISONS", state.comparisons[data[0].showId].comparisons);
      console.log("DATA", data[0].firstEp, data[0].secondEp);
      state.comparisons[data[0].showId].comparisons[data[0].firstEp][
        data[0].secondEp
      ] = data[1];
      Vue.set(
        state.comparisons[data[0].showId],
        "comparisonCount",
        state.comparisons[data[0].showId].comparisonCount + 1
      );
    },
    updateCurrentComparisons(state, comparison: ComparisonAddress) {
      state.currentComparisons = {
        showId: comparison.showId,
        firstEp: comparison.firstEp,
        secondEp: comparison.secondEp
      };
    },
    updateCache(state, data: CachedData) {
      Vue.set(state.cache, data.name, data);
    },
    updateRankings(state, rankings: { showId: string; rankings: Array<any> }) {
      Vue.set(state.rankings, rankings.showId, rankings.rankings);
    }
  },
  actions: {
    updateSearchTerm(context, newTerm: string) {
      context.commit("updateSearchTerm", newTerm);
    },
    updateSearchResults(context, newResults: Array<any>) {
      context.commit("updateSearchResults", newResults);
    },
    updateComparisons(context, data: any) {
      context.commit("updateComparisons", data);
    },
    updateCurrentComparisons(context, data: ComparisonAddress) {
      context.commit("updateCurrentComparisons", data);
    },
    chooseComparisonWinner(context, index: number) {
      const val =
        context.state.currentComparisons?.firstEp === index
          ? 1
          : context.state.currentComparisons?.secondEp === index
          ? -1
          : 0;

      context.commit("updateSingleComparison", [
        context.state.currentComparisons,
        val
      ]);
    },
    async downloadComparisons(context, raw: { id: string; path: string }) {
      const data: Record<string, any> = {};
      data.id = raw.id;
      data.comparisonCount = 0;
      data.lookup = (await axios.get(`tvdetails?id=${raw.id}`)).data;
      data.comparisons = [];
      for (let i = 0; i < data.lookup.length; ++i) {
        data.comparisons[i] = [];
        for (let j = 0; j < data.lookup.length; ++j) {
          data.comparisons[i][j] = null;
        }
      }
      return await context.commit("updateComparisons", data);
    },
    updateCache(context, data: CachedData) {
      const d: CachedData = {
        name: data.name,
        data: data.data,
        expire: data.expire,
        created: data.created || (data.expire ? Date.now() : undefined)
      };
      context.commit("updateCache", d);
    },
    updateRankings(
      context,
      rankings: { showId: string; rankings: Array<any> }
    ) {
      context.commit("updateRankings", rankings);
    }
  },
  getters: {
    getComparisons: state => (id: string) => state.comparisons[id],
    getCached: state => (name: string) => {
      if (!state.cache[name]) return undefined;
      if (!state.cache[name].expire) return state.cache[name].data;
      if (Date.now() - state.cache[name].created! < state.cache[name].expire!)
        return state.cache[name].data;
      return undefined;
    },
    getRankings: state => (id: string) => state.rankings[id],
    getProgress: state => (id: string) =>
      state.comparisons[id] === undefined
        ? 0
        : state.comparisons[id].comparisonCount /
          ((state.comparisons[id].lookup.length *
            state.comparisons[id].lookup.length -
            state.comparisons[id].lookup.length) /
            2)
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
