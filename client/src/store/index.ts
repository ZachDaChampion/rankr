import Vue from "vue";
import Vuex from "vuex";
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

const comp: Record<string, any> = {};
const cache: Record<string, CachedData> = {};

export default new Vuex.Store({
  state: {
    searchTerm: "",
    searchResults: Array<any>(),
    comparisons: comp,
    currentComparisons: {
      showId: "",
      firstEp: 0,
      secondEp: 0,
    } as ComparisonAddress,
    cache: cache,
  },
  mutations: {
    updateSearchTerm(state, newTerm: string) {
      state.searchTerm = newTerm;
    },
    updateSearchResults(state, newResults: Array<any>) {
      state.searchResults = newResults;
    },
    updateComparisons(state, data: any) {
      state.comparisons[data.id] = data;
    },
    updateSingleComparison(state, data: [ComparisonAddress, number]) {
      console.log("COMPARISONS", state.comparisons[data[0].showId].comparisons);
      console.log("DATA", data[0].firstEp, data[0].secondEp);
      state.comparisons[data[0].showId].comparisons[data[0].firstEp][
        data[0].secondEp
      ] = data[1];
    },
    updateCurrentComparisons(state, comparison: ComparisonAddress) {
      state.currentComparisons = {
        showId: comparison.showId,
        firstEp: comparison.firstEp,
        secondEp: comparison.secondEp,
      };
    },
    updateCache(state, data: CachedData) {
      state.cache[data.name] = data;
    },
  },
  actions: {
    updateSearchTerm(context, newTerm: string) {
      context.commit("updateSearchTerm", newTerm);
    },
    updateSearchResults(context, newResults: Array<any>) {
      context.commit("updateSearchResults", newResults);
    },
    getComparisons(context, id: string) {
      context.commit("getComparisons", id);
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
        val,
      ]);
    },
    async downloadComparisons(context, id) {
      const data: Record<string, any> = {};
      data.id = id;
      data.lookup = (
        await axios.get(`http://localhost:3000/tvdetails?id=${id}`)
      ).data;
      data.comparisons = [];
      for (let i = 0; i < data.lookup.length; ++i) {
        data.comparisons[i] = [];
        for (let j = 0; j < data.lookup.length; ++j) {
          data.comparisons[i][j] = 0;
        }
      }
      return await context.commit("updateComparisons", data);
    },
    updateCache(context, data: CachedData) {
      const d: CachedData = {
        name: data.name,
        data: data.data,
        expire: data.expire,
        created: data.created || (data.expire ? Date.now() : undefined),
      };
      context.commit("updateCache", d);
    },
  },
  getters: {
    getComparisons: (state) => (id: string) => state.comparisons[id],
    getCached: (state) => (name: string) => {
      if (!state.cache[name]) return undefined;
      if (!state.cache[name].expire) return state.cache[name].data;
      if (Date.now() - state.cache[name].created! < state.cache[name].expire!)
        return state.cache[name].data;
      return undefined;
    },
  },
  modules: {},
});
