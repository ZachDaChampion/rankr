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

const comp: Record<string, any> = {};
const cache: Record<string, CachedData> = {};

export default new Vuex.Store({
  state: {
    searchTerm: "",
    searchResults: Array<any>(),
    comparisons: comp,
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
      const d: CachedData = {
        name: data.name,
        data: data.data,
        expire: data.expire,
        created: data.created || (data.expire ? Date.now() : undefined),
      };
      context.commit("updateComparisons", data);
    },
    async downloadComparisons(context, id) {
      const data: Record<string, any> = {};
      data.id = id;
      data.lookup = (
        await axios.get(`http://localhost:3000/tvdetails?id=${id}`)
      ).data;
      data.comparisons = new Array<Array<number>>(data.lookup.length).fill(
        new Array<number>(data.lookup.length).fill(0)
      );
      return await context.commit("updateComparisons", data);
    },
    updateCache(context, data: CachedData) {
      context.commit("updateCache", data);
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
