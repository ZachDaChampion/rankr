import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchTerm: "",
    searchResults: Array<any>(),
  },
  mutations: {
    updateSearchTerm(state, newTerm: string) {
      state.searchTerm = newTerm;
    },
    updateSearchResults(state, newResults: Array<any>) {
      state.searchResults = newResults;
    },
  },
  actions: {
    updateSearchTerm(context, newTerm: string) {
      context.commit("updateSearchTerm", newTerm);
    },
    updateSearchResults(context, newResults: Array<any>) {
      context.commit("updateSearchResults", newResults);
    },
  },
  modules: {},
});
