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

  clicked: boolean = false;
  clicked1: boolean = false;

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

        console.log('✅ Datos actualizados correctamente.');
      },
      error: (err) => {
        console.error('❌ Error recibiendo estadísticas:', err);
      }
    });
  }

  updateOptions(): void {
    console.log('🔄 Actualizando opciones de visualización');
  }

  toggleClicked(): void {
    this.clicked = !this.clicked;
    this.clicked1 = !this.clicked1;
    console.log(`🔘 Estado cambiado: clicked=${this.clicked}, clicked1=${this.clicked1}`);
  }
}
