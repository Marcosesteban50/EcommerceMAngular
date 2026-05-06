import { Component, inject } from '@angular/core';
import { FormularioEstadoPagoComponent } from "../formulario-estado-pago/formulario-estado-pago.component";
import { Router } from '@angular/router';
import { OrdenService } from '../../../servicios/orden.service';
import { EstadoPagoCreacionDTO } from '../../../modelos/OrdenModelos/Orden';

@Component({
  selector: 'app-crear-estado-pago',
  imports: [FormularioEstadoPagoComponent],
  templateUrl: './crear-estado-pago.component.html',
  styleUrl: './crear-estado-pago.component.css'
})
export class CrearEstadoPagoComponent {

  private router = inject(Router);
  private estadoServicio = inject(OrdenService);
  errores: string[] = [];




  guardarCambios(estado: EstadoPagoCreacionDTO) {
    this.estadoServicio.crearEstadoPago(estado).subscribe({
      next: () => {
        this.router.navigate(['/estadosPagos']);
      },
      error: (err) => {

        this.errores = err;
        console.log(err);
      }
    })
  }
}
