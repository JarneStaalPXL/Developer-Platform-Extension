import { createStore } from 'vuex'

export default createStore({
  state: {
    colorMode: 'Light',
  },
  getters: {
  },
  mutations: {
    setColorMode(state, colorMode) {
      state.colorMode = colorMode
    }
  },
  actions: {
  },
  modules: {
  }
})