export default {
  namespaced: true,
  state: {
    searchResults: []
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results;
    }
  },
  getters: {
    getSearchResults: state => state.searchResults
  }
}