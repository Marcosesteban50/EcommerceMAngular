import { Component, inject, OnInit } from '@angular/core';
import { AdminDashBoardDTO } from '../../../modelos/AdminModelos/AdminDashBoardDTO';
import { AdminService } from '../../../servicios/admin.service';

@Component({
  selector: 'app-admindashboard',
  imports: [],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent implements OnInit {

  private adminDashboardService = inject(AdminService);

  dashboard?: AdminDashBoardDTO;
  cargando = true;

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.adminDashboardService.obtenerDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error cargando dashboard', error);
        this.cargando = false;
      }
    });
  }

  // Total de movimientos de productos
  totalMovimientosProductos(): number {
    if (!this.dashboard) return 0;

    const total = this.dashboard.productosCreados + this.dashboard.productosEditados + this.dashboard.productosEliminados + this.dashboard.productosAprobados + this.dashboard.productosRechazados;

    return total;
  }

  // Productos que terminaron activos/aprobados
  productosActivosCalculados(): number {
    if (!this.dashboard) return 0;

    var total = this.dashboard.productosAprobados - this.dashboard.productosEliminados;

    return total;
  }

  // Porcentaje de productos aprobados
  porcentajeAprobados(): number {
    if (!this.dashboard) return 0;

    const total = this.totalMovimientosProductos();

    if (total === 0) return 0;

    return Math.round((this.dashboard.productosAprobados / total) * 100);
  }

  // Porcentaje de productos rechazados
  porcentajeRechazados(): number {
    if (!this.dashboard) return 0;

    const total = this.totalMovimientosProductos();

    if (total === 0) return 0;

    return Math.round((this.dashboard.productosRechazados / total) * 100);
  }
}
