import { createStore } from 'vuex'

export default createStore({
  state: {
    colorMode: 'Light',
    name: "",
    profilepic: "",
    email: "",
    isLoggedIn: false,
    userObj: {},
    baseUrlStrapi: "https://developerplatformbackend.up.railway.app",
    baseUrlStrapiApi:
      "https://developerplatformbackend.up.railway.app" + "/api/",
    strapiApiKey:
      "74b1b6bd688a26cfc4d0bef366129a3da6ec0fbb22d9d4538942839cf229d6c66acbe12482dcfae4cab6b0a518349c47b411a2d138328eb1ea94f9ad1c15ae502bf43f41cb83480c8590b40dea0fba378361ee595ac9a893cf15a254eb9e2c148e7c34aaf72969fe32e9edadd4eba7c6e45aff7939d887ef2c29c2eb0e0613ac",
    
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
    setPageVisits(state, payload) {
      state.pagevisits = payload;
    },
    setFavoriteTools(state, payload) {
      state.favoritetools = payload;
    },
  },
  
  actions: {
    async GET_USER_FAVORITE_TOOLS({ commit, state, dispatch }) {
      if (localStorage.getItem("uid") !== null) {
        //getting user favorite tools from strapi
        const response = await fetch(
          `${
            state.baseUrlStrapiApi
          }user-data/favorite-tools/${localStorage.getItem("uid")}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );
        const res = await response.json();
        if (res.favoritetools === null) {
          commit("setFavoriteTools", []);
        } else {
          commit("setFavoriteTools", res.favoritetools);
        }

        if (state.favoritetools !== null) {
          dispatch("SET_FAVORITE_TOOLS");
        }
      } else {
        //getting user favorite tools from localStorage
        let toolsString = localStorage.getItem("favTools");
        if (toolsString !== null) {
          let tools = JSON.parse(toolsString);
          commit("setFavoriteTools", tools);

          if (state.favoritetools !== null) {
            dispatch("SET_FAVORITE_TOOLS");
          }
        }
      }

      return state.favoritetools;
    },
    async ADD_PAGE_VISIT_ROUTE({ commit, state, dispatch }, route) {
      //check if localhost
      if (window.location.hostname !== "localhost") {
        if (route === "/") {
          route = "Homepage";
        }

        let isAdmin = await dispatch("IS_ADMIN", localStorage.getItem("uid"));
        const rawResponse = await fetch(`${state.baseUrlStrapiApi}visit-logs`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: {
              userid:
                localStorage.getItem("uid") !== null
                  ? localStorage.getItem("uid")
                  : "Unknown user",
              route: route,
              email:
                localStorage.getItem("email") !== null
                  ? localStorage.getItem("email")
                  : "Unknown email",
              name:
                localStorage.getItem("userName") !== null
                  ? localStorage.getItem("userName")
                  : "Unknown username",
              isadmin: isAdmin,
            },
          }),
        });
      }
    },
    async GET_PAGE_VISITS({ state, commit, dispatch }) {
      const rawResponse = await fetch(
        `${state.baseUrlStrapiApi}visit-log-count`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const response = await rawResponse.json();
      commit("setPageVisits", response.data.attributes.count);
    },
    async CREATE_ACCOUNT({ state, dispatch, commit }, user) {
      const resp = await fetch(
        `${state.baseUrlStrapiApi}user-detail-info/createUser`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
          body: JSON.stringify({
            data: {
              userid: user.uid,
            },
          }),
        }
      );
      commit("setUserData", { user: user });
      dispatch("LOAD_USER_SAVED_DATA", user.uid);  
      const content2 = await resp.json();
      return content2.statusCode === 409;
    },
  },
  modules: {
  }
})