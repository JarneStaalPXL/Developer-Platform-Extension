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
      colorMode: "dark",
  },
  getters: {
  },
  mutations: {
    setColorMode(state, colorMode) {
      state.colorMode = colorMode
    },
    setGlobalFrontendTools(state, payload) {
      state.globalFrontendTools = payload;
    },
    setColorGeneratorsTools(state, payload) {
      state.colorGeneratorsTools = payload;
    },
    setApis(state,payload){
      state.apis = payload;
    },
    setFonts(state, payload) {
      state.fonts = payload;
    },
    setFavoriteTools(state, payload) {
      state.favoritetools = payload;
    },
    setHostingProviders(state, payload) {
      state.hostingproviders = payload;
    },
    setGradientGeneratorsTools(state, payload) {
      state.gradientGeneratorsTools = payload;
    },
    setLearningTools(state, payload) {
      state.learningTools = payload;
    },
    setUserSavedColorPallets(state, payload) {
      if (payload !== undefined && payload !== null)
        state.userSavedColorPallets = payload;
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
    async GET_USER_COLOR_MODE({ state, commit }) {
      if (localStorage.getItem("uid") !== null) {
        const res = await fetch(
          `${
            state.baseUrlStrapiApi
          }user-detail-info/getColorMode/${localStorage.getItem("uid")}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.strapiApiKey,
            },
          }
        );
        const user = await res.json();
        commit("setColorMode", user.data.attributes.selectedColorMode);
        return user.data.attributes.selectedColorMode;
      }
    },
    async SET_FAVORITE_TOOLS({ commit, state }) {
      const gbt = JSON.parse(JSON.stringify(state.globalFrontendTools));

      for (const tool of gbt) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setGlobalFrontendTools", gbt);

      //hosting providers manipulation favorites
      const htp = JSON.parse(JSON.stringify(state.hostingproviders));
      for (const provider of htp) {
        provider.isFavorited = state.favoritetools.some(
          (t) => t.name === provider.name
        );
      }
      commit("setHostingProviders", htp);

      //learning tools manipulation favorites
      const ltp = JSON.parse(JSON.stringify(state.learningTools));
      for (const tool of ltp) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setLearningTools", ltp);

      //gradient generators manipulation favorites
      const ggt = JSON.parse(JSON.stringify(state.gradientGeneratorsTools));
      for (const tool of ggt) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setGradientGeneratorsTools", ggt);

      //color generators manipulation favorites
      const cgt = JSON.parse(JSON.stringify(state.colorGeneratorsTools));
      for (const tool of cgt) {
        tool.isFavorited = state.favoritetools.some(
          (t) => t.name === tool.name
        );
      }
      commit("setColorGeneratorsTools", cgt);

      //fonts manipulation favorites
      const fnt = JSON.parse(JSON.stringify(state.fonts));
      for (const font of fnt) {
        font.isFavorited = state.favoritetools.some(
          (t) => t.name === font.name
        );
      }

      commit("setFonts", fnt);

      //apis manipulation favorites
      const aps = JSON.parse(JSON.stringify(state.apis));
      for (const api of aps) {
        api.isFavorited = state.favoritetools.some(
          (t) => t.name === api.name
        );
      }
      commit("setApis", aps);
    },

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
    
    async LOAD_USER_SAVED_DATA({ dispatch }, uid) {
      dispatch("GET_USER_SAVED_COLOR_PALLETES", uid);
    },
    async GET_USER_SAVED_COLOR_PALLETES({ state, commit }, userUid) {
      if (userUid === undefined) {
        return Promise.reject("User uid is undefined");
      }
      const dataResponse = await fetch(
        `${
          state.baseUrlStrapiApi
        }user-detail-info/getColorPallete/${localStorage.getItem("uid")}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const content2 = await dataResponse.json();
      commit("setUserSavedColorPallets", content2.data.attributes.colorpallet);
    },
    async GET_USER_ID({ state }, userUid) {
      const dataResponse = await fetch(
        `${state.baseUrlStrapiApi}user-details?userid=${userUid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.strapiApiKey,
          },
        }
      );
      const content2 = await dataResponse.json();
      if (content2.data.length === 0) {
        return Promise.reject("User does not exist");
      }
      return content2.data[0].id;
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