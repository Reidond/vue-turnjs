<template>
  <div class="bb-custom-wrapper">
    <fw-bookblock2
      class="bb-bookblock"
      ref="bookBlock"
      :options="bookblockOptions"
      :pages="pages"
    >
      <template v-slot:page="{ item, index }">
        <img
          class="bb-custom-img"
          :src="`/images/bookblock2/${index + 1}.jpg`"
          :alt="`image${index}`"
        />
        <div class="fc-calendar-wrap">
          <h2>{{ item.name }}</h2>
          <div class="fc-calendar-container">
            <div class="fc-calendar fc-five-rows">
              <div class="fc-head">
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
                <div>Sunday</div>
              </div>
              <div class="fc-body">
                <div
                  class="fc-row"
                  v-for="(row, index) in item.rows"
                  :key="`${item.name}_row_${index}`"
                >
                  <div
                    v-for="index in row.emptyDivsStart"
                    :key="`${item.name}_emptyDivStart_${index}`"
                  ></div>
                  <div
                    class="fc-content"
                    v-for="(row, index) in row.data"
                    :key="`${item.name}_rowdata_${index}`"
                  >
                    <span class="fc-date">{{ row.dataNum }}</span>
                    <span class="fc-weekday">{{ row.dateName }}</span>
                    <div v-show="row.content">
                      <span>{{ row.content }}</span>
                    </div>
                  </div>
                  <div
                    v-for="index in row.emptyDivsEnd"
                    :key="`${item.name}_emptyDivEnd_${index}`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </fw-bookblock2>
    <nav>
      <a href="#" @click="bookblockRef.prev()">
        <b-icon-arrow-left-short />
      </a>
      <a href="#" @click="bookblockRef.next()">
        <b-icon-arrow-right-short />
      </a>
    </nav>
  </div>
</template>

<script>
import calendar from "./calendar.js";

export default {
  data() {
    return {
      pages: calendar,
      bookblockOptions: {
        orientation: "horizontal",
        speed: 700
      }
    };
  },
  computed: {
    bookblockRef: function() {
      return this.$refs.bookBlock;
    }
  }
};
</script>

<style scoped>
@import "./styles/demo2.scss";
@import "./styles/calendar.scss";
</style>
