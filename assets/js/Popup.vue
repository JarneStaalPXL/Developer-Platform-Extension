<template>
  <n-config-provider :theme="$store.state.colorMode === 'Light' ? null : darkTheme">
    <n-loading-bar-provider>
      <n-notification-provider :max="1" :placement="'right'">
        <n-message-provider>
          <NavBar />
          <router-view v-slot="{ Component, route }">
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
            />
          </router-view>
        </n-message-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { Sun as SunIcon, Moon as MoonIcon } from "@vicons/tabler";
import {
  NCard,
  NConfigProvider,
  darkTheme,
  NSwitch,
  NLoadingBarProvider,
  NNotificationProvider,
  NMessageProvider,
} from "naive-ui";
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NCard,
    NConfigProvider,
    NSwitch,
    SunIcon,
    MoonIcon,
    NavBar,
    NLoadingBarProvider,
    NNotificationProvider,
    NMessageProvider,
  },
  data() {
    return {
      switchIsChecked: true,
      icons: {
        active: "images/faviconpic.png",
        inactive: "images/icon-48x48-off.png",
      },
    };
  },
  async beforeMount(){
    if (chrome.storage.sync.get(['userId']) !== null) {
      this.$store.dispatch("LOAD_USER_SAVED_DATA", localStorage.getItem("uid"));
      //get user favorite tools
      await this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
      //set color mode
      await this.$store.dispatch("GET_USER_COLOR_MODE");
    }
    if (localStorage.getItem("favTools") === null) {
      localStorage.setItem("favTools", JSON.stringify([]));
    }
    this.checkIfOnMobile();
    this.setTime();
  },
  mounted() {
    this.$store.state.colorMode === "Light"
      ? (this.switchIsChecked = false)
      : (this.switchIsChecked = true);
  },
  methods: {
    handleColorModeSwitchValue(value) {
      console.log(value);
      this.$store.commit("setColorMode", value);
    },
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>
