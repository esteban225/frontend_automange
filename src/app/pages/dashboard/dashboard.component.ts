import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { WebsocketService } from '../../services/websocket.service'; // ✅ Importación del servicio

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
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(private websocketService: WebsocketService) {} // ✅ Inyección del servicio

  ngOnInit() {
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders') as HTMLCanvasElement;
    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales') as HTMLCanvasElement;
    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });

    // ✅ Suscribirse al WebSocket para recibir datos en tiempo real
    this.websocketService.message$.subscribe((newData) => {
      console.log('Datos recibidos del WebSocket:', newData);
      this.data = newData; // Actualiza los datos
      this.updateOptions(); // ✅ Actualiza el gráfico dinámicamente
    });
  }

  public updateOptions() {
    if (this.salesChart) {
      this.salesChart.data.datasets[0].data = this.data;
      this.salesChart.update();
    }
  }
}
