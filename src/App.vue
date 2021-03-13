<template>
  <div id="app">

    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">Malifaux.Kor</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to='/guide'>Master Guide</b-nav-item>
        <b-nav-item to='/strategy'>Strategy</b-nav-item>
        <b-nav-item to='/tournament'>Tournament</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-container class="mt-2">
      <router-view />
    </b-container>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
