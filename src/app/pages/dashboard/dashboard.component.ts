import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js'; // ✅ Importación correcta

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    parseOptions(Chart, chartOptions());

    // ✅ Asegurar que chartOrders es un canvas
    var chartOrders = document.getElementById('chart-orders') as HTMLCanvasElement;
    if (chartOrders) {
      var ordersCtx = chartOrders.getContext('2d');
      if (ordersCtx) {
        new Chart(ordersCtx, {
          type: 'bar',
          options: chartExample2.options,
          data: chartExample2.data
        });
      }
    }

    // ✅ Asegurar que chartSales es un canvas
    var chartSales = document.getElementById('chart-sales') as HTMLCanvasElement;
    if (chartSales) {
      var salesCtx = chartSales.getContext('2d');
      if (salesCtx) {
        this.salesChart = new Chart(salesCtx, {
          type: 'line',
          options: chartExample1.options,
          data: chartExample1.data
        });
      }
    }
  }

  public updateOptions() {
    if (this.salesChart) {
      this.salesChart.data.datasets[0].data = this.data;
      this.salesChart.update();
    }
  }
}
