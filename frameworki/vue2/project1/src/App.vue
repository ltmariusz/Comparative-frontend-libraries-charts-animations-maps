<template>
  <div>
    <button @click="generateChartData(10)">10 zmiennych</button>
    <button @click="generateChartData(100)">100 zmiennych</button>
    <button @click="generateChartData(1000)">1000 zmiennych</button>
    <button @click="generateChartData(10000)">10000 zmiennych</button>
    <button @click="generateChartData(100000)">100000 zmiennych</button>

    <CanvasJSChart :options="chartOptions" />
  </div>
</template>

<script>
import { nextTick } from 'vue';

export default {
  name: 'App',
  data() {
    return {
      chartOptions: null,
      startTime: 0,
      endTime: 0
    };
  },
  methods: {
    generateChartData(count) {
      let dataPoints = [];
      for (let i = 0; i < count; i++) {
        dataPoints.push({ label: `Label ${i}`, y: Math.random() * 100 });
      }

      this.startTime = performance.now();

      this.chartOptions = {
        animationEnabled: false,
        title: {
          text: "Dynamic Data"
        },
        data: [{
          type: "line",
          dataPoints: dataPoints
        }]
      };

      // Mierzenie czasu po zaktualizowaniu DOM
      nextTick().then(() => {
        this.endTime = performance.now();
        console.log(`Czas renderowania wykresu: ${this.endTime - this.startTime} ms`);
      });
    }
  }
}
</script>