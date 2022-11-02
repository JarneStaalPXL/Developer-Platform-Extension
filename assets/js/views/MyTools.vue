<template>
  <div v-for="tool in $store.state.favoritetools" :key="tool">
    <p>
      {{tool.name}}
    </p>
  </div>
  
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
      openLink(link) {
      if (link.includes("https://")) window.open(link, "_blank");
      else this.$router.push(link);
      this.$store.dispatch("ADD_PAGE_VISIT_ROUTE", link);
      this.$store.dispatch("GET_PAGE_VISITS");
    },
    beforeMount(){
      this.$store.dispatch("GET_USER_FAVORITE_TOOLS");
    }
    },
    
}
</script>

<style>
  
</style>