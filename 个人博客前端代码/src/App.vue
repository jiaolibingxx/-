<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
      console.log(this.$store.state.user.routers);
    },
}
</script>
