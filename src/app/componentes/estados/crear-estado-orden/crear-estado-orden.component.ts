import { Component, inject } from '@angular/core';
import { EstadoOrdenCreacionDTO } from '../../../modelos/OrdenModelos/Orden';
import { OrdenService } from '../../../servicios/orden.service';
import { Router } from '@angular/router';
import { FormularioEstadoOrdenComponent } from "../formulario-estado-orden/formulario-estado-orden.component";

@Component({
  selector: 'app-crear-estado-orden',
  imports: [FormularioEstadoOrdenComponent],
  templateUrl: './crear-estado-orden.component.html',
  styleUrl: './crear-estado-orden.component.css'
})
export class CrearEstadoOrdenComponent {

  private router = inject(Router);
  private estadoServicio = inject(OrdenService);
  errores: string[] = [];




  guardarCambios(estado: EstadoOrdenCreacionDTO) {
    this.estadoServicio.crearEstadoOrden(estado).subscribe({
      next: () => {
        this.router.navigate(['/estadosOrdenes']);
      },
      error: (err) => {

        this.errores = err;
        console.log(err);
      }
    })
  }
}
