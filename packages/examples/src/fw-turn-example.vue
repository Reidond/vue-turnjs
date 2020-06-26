<template>
  <fw-turn class="magazine" :options="options">
    <div v-for="i in 6" :key="i">
      <img
        :src="
          `https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/turn/0${i}.jpg`
        "
        alt="image${i}"
      />
    </div>
  </fw-turn>
</template>

<script>
export default {
  data() {
    return {
      options: {
        display: "double",
        acceleration: true,
        elevation: 50
      }
    };
  }
};
</script>

<style scoped>
.magazine {
  width: 1152px;
  height: 752px;
}
.magazine .turn-page {
  background-color: #ccc;
  background-size: 100% 100%;
}
</style>
