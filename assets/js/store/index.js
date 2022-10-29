import { createStore } from 'vuex'

export default createStore({
  state: {
    colorMode: 'Light',
    name: "",
    profilepic: "",
    email: "",
    isLoggedIn: false,
    userObj: {},
  },
  getters: {
  },
  mutations: {
    setColorMode(state, colorMode) {
      state.colorMode = colorMode
    },
    setUserData(state, userdata) {
      state.name = userdata.user.displayName;
      state.profilepic = userdata.user.photoURL;
      state.email = userdata.user.email;
      state.userObj = userdata.user.providerData[0];

      if (state.name === null) {
        localStorage.setItem("userName", state.email.split("@")[0]);
      } else {
        localStorage.setItem("userName", state.name);
      }
      localStorage.setItem("profilePic", state.profilepic);
      localStorage.setItem("email", state.email);
      localStorage.setItem("uid", userdata.user.uid);
    },
    removeUserData(state) {
      state.name = "";
      state.profilepic = "";
      state.email = "";
      state.isLoggedIn = false;
      state.favoriteTools = [];
      state.userSavedColorPallets = [];
      state.quickAccessTools = [];

      for (let tool of state.globalFrontendTools) {
        tool.isFavorited = false;
      }
      state.favoritetools = [];

      localStorage.removeItem("userName");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("email");
      localStorage.removeItem("uid");
      localStorage.removeItem("favTools");
    },
  },
  actions: {
  },
  modules: {
  }
})