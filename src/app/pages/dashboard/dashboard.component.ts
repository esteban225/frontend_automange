import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  estadisticas: any = {};
  datasets: any[] = [];
  data: any = {};

  clicked = true;
  clicked1 = false;

  estadisticasCards: any[] = [];
  usuarios: any[] = [];
  marcas: any[] = [];

  constructor(private readonly websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.getEstadisticas().subscribe({
      next: (data) => {
        if (!data) return;

        this.estadisticas = data;
        this.datasets = Array.isArray(data.datasets) ? data.datasets : [];
        this.data = this.datasets.length > 0 ? this.datasets[0] : {};

        this.estadisticasCards = [
          {
            titulo: 'Ventas',
            valor: this.estadisticas.ventas || 0,
            iconBg: 'bg-danger',
            icono: 'fas fa-chart-bar',
            trend: '3.48%',
            trendIcon: 'fa fa-arrow-up',
            trendClass: 'text-success mr-2',
            descripcion: 'Mensualmente'
          },
          {
            titulo: 'Inventario',
            valor: this.estadisticas.inventario || 0,
            iconBg: 'bg-warning',
            icono: 'fas fa-chart-pie',
            trend: '3.48%',
            trendIcon: 'fas fa-arrow-down',
            trendClass: 'text-danger mr-2',
            descripcion: 'Desde el mes pasado'
          },
          {
            titulo: 'Usuarios registrados',
            valor: this.estadisticas.usuariosRegistrados || 0,
            iconBg: 'bg-yellow',
            icono: 'fas fa-users',
            trend: '1.10%',
            trendIcon: 'fas fa-arrow-down',
            trendClass: 'text-warning mr-2',
            descripcion: 'Desde el mes pasado'
          },
          {
            titulo: 'Vehículos revisados',
            valor: `${this.estadisticas.vehiculosRevisados || 0}%`,
            iconBg: 'bg-info',
            icono: 'fas fa-percent',
            trend: '12%',
            trendIcon: 'fas fa-arrow-up',
            trendClass: 'text-success mr-2',
            descripcion: 'Desde el mes pasado'
          }
        ];

        this.usuarios = data.usuarios || [];
        this.marcas = data.marcas || [];
      },
      error: (err) => {
        console.error('❌ Error recibiendo estadísticas:', err);
      }
    });
  }

  setChart(index: number): void {
    if (index === 0) {
      this.clicked = true;
      this.clicked1 = false;
    } else {
      this.clicked = false;
      this.clicked1 = true;
    }

    this.data = this.datasets[index] || {};
    this.updateOptions();
  }

  updateOptions(): void {
    console.log('🔄 Actualizando opciones del gráfico');
  }
}
