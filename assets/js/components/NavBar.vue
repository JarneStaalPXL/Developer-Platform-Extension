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

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap");

nav {
  display: flex;
  align-items: center;
  justify-content: start;

#container-nav {
  padding: 0;

  .n-card {
    padding: 0;
  }
}

  img 
  {
    width: 25px;
    height: auto;
  }

  #nav-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
  }
}

</style>
