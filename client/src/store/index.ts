import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResults: Array<any>(),
  },
  mutations: {
    updateSearchResults(state, newResults: Array<any>) {
      state.searchResults = newResults;
    },
  },
  actions: {
    updateSearchResults(context, newResults: Array<any>) {
      context.commit("updateSearchResults", newResults);
    },
  },
  modules: {},
});
