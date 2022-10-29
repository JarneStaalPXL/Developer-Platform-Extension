<template>
  <NavBar />
  <router-view v-slot="{ Component, route }">
                        <component
                          :is="Component"
                          :key="route.meta.usePathKey ? route.path : undefined"
                        />
                    </router-view>
</template>

<script>
import { Sun as SunIcon, Moon as MoonIcon } from "@vicons/tabler";
import { NCard, NConfigProvider, darkTheme, NSwitch } from "naive-ui";
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NCard,
    NConfigProvider,
    NSwitch,
    SunIcon,
    MoonIcon,
    NavBar
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
