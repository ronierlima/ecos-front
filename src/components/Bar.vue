<template>
    <GChart :type="type" :data="null" :options="options" @ready="onChartReady" ref="gChart" />
</template>
  
<script>

import { GChart } from 'vue-google-charts/legacy';


export default {
    name: 'GoogleChart',
    components: {
        GChart,
    },
    props: { data: Array, options: Object, type: String },

    data() {
        return {
        };
    },

    methods: {
        onChartReady(chart, google) {
            // now we have google lib loaded. Let's create data table based using it.
            this.createDataTable(chart, google);

        },
        createDataTable(chart, google) {


            var view = new google.visualization.DataView(this.data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                }
            ]);

            //this.chartData = data;
            chart.draw(view, this.options);

        }
    }
};
</script>
  