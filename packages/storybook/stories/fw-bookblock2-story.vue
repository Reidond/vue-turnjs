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
          :src="
            `https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/bookblock2/${index +
              1}.jpg`
          "
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
                    <div class="fc-content-data" v-show="row.content">
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
      <a class="pointer" @click="bookblockRef.prev()">
        <b-icon-arrow-left-short />
      </a>
      <a class="pointer" @click="bookblockRef.next()">
        <b-icon-arrow-right-short />
      </a>
    </nav>
  </div>
</template>

<script>
import calendar from "./calendar.js";
import { FwBookblock2 } from "vue-turnjs";
import { BIconArrowLeftShort, BIconArrowRightShort } from "bootstrap-vue";

export default {
  components: {
    FwBookblock2,
    BIconArrowLeftShort,
    BIconArrowRightShort
  },
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

<style lang="scss" scoped>
@import "./styles/demo2.scss";
@import "./styles/calendar.scss";
</style>
