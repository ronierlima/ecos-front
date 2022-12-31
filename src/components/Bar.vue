<template>
  <div>
    <GChart :type="type" :data="data" :options="options" />
  </div>
  <!-- @ready="onChartReady" -->
</template>
  
<script>
import { GChart } from "vue-google-charts";
export default {
  name: "App",
  components: {
    GChart
  },
  props: {
    type: String,
    data: Array,
    options: Object,
    multiple: {
      type: Boolean,
      default: false
    }
  },
};
</script>
  