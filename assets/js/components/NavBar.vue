<template>
  <nav>
    <n-card id="container-nav">
      <img src="../../images/faviconpic.png" />
      <div id="nav-right">
        <span>
          Developer
          <br />
          Platform
        </span>
        <DarkModeSwitchVue />
      </div>
    </n-card>
  </nav>
</template>

<script>
import DarkModeSwitchVue from "./DarkModeSwitch.vue";
import { NConfigProvider, NCard, darkTheme } from "naive-ui";
export default {
  components: {
    DarkModeSwitchVue,
    NCard,
    NConfigProvider,
  },
  setup() {
    return {
      darkTheme,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap");

nav {
  display: flex;
  border-bottom: 1px solid black;
  justify-content: space-between;
  font-family: Titillium Web, sans-serif;
  box-sizing: border-box;
}

nav #nav-right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 0;
}

nav #container-nav {
  display: flex;
  padding: 0;
}

nav img {
  width: 15%;
  margin: 5px;
}

nav span {
  font-size: 15px;
  margin: 10px;
}
</style>
