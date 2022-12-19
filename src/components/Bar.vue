<template>
  <div>
    <GChart :type="type" :data="data" :options="options"  />
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
    type: String, data: Array, options: Object, multiple: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      chartData: null, // the chartData will be created once Chart is ready (needs google charts lib for this) 
      chartOptions: {
        title: 'Line intervals, default!'
      }
    };
  },

  methods: {
    onChartReady(chart, google) {
      // now we have google lib loaded. Let's create data table based using it.
      this.createDataTable(chart, google);
      //console.log(this.chartData);
    },
    createDataTable(chart, google) {

      var data


      if (this.multiple) {
        // this.chartData = this.data;
        // this.chartOptions = this.options;
        data = new google.visualization.DataTable();
        data.addColumn({ type: 'string', label: 'Labels' });
        data.addColumn({ type: 'number', label: 'Bar Series' });
        data.addColumn({ type: 'number', label: 'Line Series' });
        data.addColumn({ type: 'string', role: 'annotation' });

        data.addRows([['Label1', 10, 10, '10'],
        ['Label1', 20, 20, '20'],
        ['Label1', 40, 40, '40'],
        ['Label1', 5, 5, '5'],
        ['Label1', 30, 30, '30'],
        ]);

        var barchart = new google.visualization.ComboChart(document.getElementById('bar_element'));
        var options = {
          series: [{ type: 'bars' },
          { type: 'line', lineWidth: 0, visibleInLegend: false, pointSize: 0 }]
        };

        barchart.draw(data, options);
      }
      else {
       data = google.visualization.arrayToDataTable(this.data);

        var view = new google.visualization.DataView(data);
        view.setColumns([0, 1,
          {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
          }
        ]);
        chart.draw(view, this.options);
      }
      //this.chartData = data;

      //this.chartData = data;

    }
  }
};
</script>
  