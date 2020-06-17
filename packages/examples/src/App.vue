<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand tag="h1" class="mb-0">Example</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/fw-bookblock-example">Bookblock</b-nav-item>
          <b-nav-item to="/fw-bookblock2-example">Bookblock2</b-nav-item>
          <b-nav-item to="/fw-turn-example">Turn.js</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped></style>
