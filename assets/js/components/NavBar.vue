<template>
  <nav>
    <n-card id="container-nav">
        <img src="../../images/faviconpic.png"/>
        <span>Developer Platform</span>
        <DarkModeSwitchVue />

    </n-card>
    
  </nav>
</template>

<script>
import DarkModeSwitchVue from './DarkModeSwitch.vue';
import { NCard } from 'naive-ui'
export default {
    components: {
        DarkModeSwitchVue,
        NCard
        
        
    }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');
    nav {
        display: flex;
        border-bottom: 1px solid black;
        justify-content: space-between;
        font-family: Titillium Web, sans-serif;
        
    }

    nav #container-nav {
        display: flex;
    }

    nav img {
        width: 30px;
        height: 30px;
        margin: 10px;
    }

    nav span {
        font-size: 20px;
        margin: 10px;

    }
</style>