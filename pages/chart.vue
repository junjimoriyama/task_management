<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Title, Legend)

// チャート用のデータ
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    data: [80, 15, 5],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
  }]
};

// チャート描画のオプション
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Doughnut Chart',
      font: {
        weight: 'bold',
        size: 40},
    },
    legend: {
      display: true,
      position: 'bottom',
      reverse: true,
      labels: {
        font: {
          size: 20
        }
      }
    },
  }
}

</script>
<template>
  <div>
    <div class="doughnut-graph">
    <!-- ドーナツチャートの描画 -->
      <Doughnut
	:data="data"
	:options="options"
      />
     </div>
  </div>
</template>
<style >
.doughnut-graph {
  width: 600px;
  height: 600px;
}
</style>