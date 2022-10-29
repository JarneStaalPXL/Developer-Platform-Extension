<template>
  <div class="wrapper" id="app"></div>
</template>

<script>
import {} from "naive-ui";
export default {
  components: {},
  data() {
    return {
      icons: {
        active: "images/icon-48x48.png",
        inactive: "images/icon-48x48-off.png",
      },
    };
  },
  methods: {
    test() {
      alert("Hello World");
    },
  },
};
</script>
