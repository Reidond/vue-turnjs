<template>
  <div id="app" class="vh-100" :class="{ [$route.name]: true }">
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-4 navbar">
      <b-navbar-brand tag="h1" class="mb-0">Example</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/fw-bookblock-example">fw-bookblock</b-nav-item>
          <b-nav-item to="/fw-bookblock2-example">fw-bookblock2</b-nav-item>
          <b-nav-item to="/fw-turn-example">fw-turn</b-nav-item>
          <b-nav-item to="/fw-book-example">fw-book</b-nav-item>
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

<style scoped>
.navbar {
  opacity: 0.6;
  backdrop-filter: blur(6px);
}
</style>
