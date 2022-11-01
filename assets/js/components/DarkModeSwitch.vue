<template>
  <!-- Implement dark/light mode-->

  <n-card style="padding: 0" :style="{ borderRadius: 0 }">
    <!-- Implement dark/light mode switch (if logged in, fetch the mode and set colorMode in state)-->
    <n-switch
      style="padding: 0"
      checked-value="Dark"
      unchecked-value="Light"
      @update:value="handleColorModeSwitchValue"
      size="small"
    >
      <template style="padding: 0" #checked-icon><MoonIcon /></template>
      <template style="padding: 0" #unchecked-icon><SunIcon /></template>
    </n-switch>

    <!--USE NAIVE UI COMPONENTS-->
    <!--https://www.naiveui.com/en-US/dark-->

    <!-- Login -->

    <!-- Register  ( Redirect to register of website )-->

    <!-- When logged in, show favorite clickable tools -->

    <!-- When logged in, be able to create a project the same you create one on the website -->
  </n-card>
</template>

<script>
import { Sun as SunIcon, Moon as MoonIcon } from "@vicons/tabler";
import { NCard, NConfigProvider, darkTheme, NSwitch } from "naive-ui";
export default {
  components: {
    NCard,
    NConfigProvider,
    NSwitch,
    SunIcon,
    MoonIcon,
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
