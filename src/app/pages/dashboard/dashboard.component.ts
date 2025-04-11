// dashboard.component.ts
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chartSales') chartSalesRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartOrders') chartOrdersRef!: ElementRef<HTMLCanvasElement>;

  estadisticas: any = {};  
  datasets: any[] = [];  
  data: any = {};  

  clicked: boolean = true;
  clicked1: boolean = false;

  chartSales!: Chart;
  chartOrders!: Chart;

  constructor(private readonly websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.getEstadisticas().subscribe({
      next: (data) => {
        console.log('📊 Datos recibidos:', data);

        if (!data) {
          console.warn('⚠ Advertencia: No se recibieron datos válidos.');
          return;
        }

        this.estadisticas = data;
        this.datasets = Array.isArray(data.datasets) ? data.datasets : []; 
        this.data = this.datasets.length > 0 ? this.datasets[0] : {}; 

        // Si el canvas ya está disponible, renderiza los charts
        if (this.chartSalesRef && this.chartOrdersRef) {
          this.renderCharts();
        }
      },
      error: (err) => {
        console.error('❌ Error recibiendo estadísticas:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    // Asegura que se rendericen después de que la vista esté lista
    if (this.datasets.length > 0) {
      this.renderCharts();
    }
  }

  renderCharts(): void {
    const ctxSales = this.chartSalesRef.nativeElement.getContext('2d');
    const ctxOrders = this.chartOrdersRef.nativeElement.getContext('2d');

    if (ctxSales && this.data) {
      this.chartSales = new Chart(ctxSales, {
        type: 'line',
        data: {
          labels: this.estadisticas.labels || ['Ene', 'Feb', 'Mar', 'Abr'],
          datasets: [this.data]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          }
        }
      });
    }

    if (ctxOrders && this.estadisticas.ventas) {
      this.chartOrders = new Chart(ctxOrders, {
        type: 'bar',
        data: {
          labels: this.estadisticas.labels || ['Ene', 'Feb', 'Mar', 'Abr'],
          datasets: [{
            label: 'Ventas',
            data: this.estadisticas.ventas || [0, 0, 0, 0],
            backgroundColor: '#5e72e4'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true }
          }
        }
      });
    }
  }

  updateOptions(): void {
    if (this.chartSales) {
      this.chartSales.data.datasets = [this.data];
      this.chartSales.update();
    }
  }

  toggleClicked(): void {
    this.clicked = !this.clicked;
    this.clicked1 = !this.clicked1;
  }
}
