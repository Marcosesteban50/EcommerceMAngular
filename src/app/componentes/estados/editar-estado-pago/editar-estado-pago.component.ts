import { Component, inject, Input } from '@angular/core';
import { FormularioEstadoPagoComponent } from "../formulario-estado-pago/formulario-estado-pago.component";
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenService } from '../../../servicios/orden.service';
import { EstadoPagoCreacionDTO, EstadoPagoDTO } from '../../../modelos/OrdenModelos/Orden';

@Component({
  selector: 'app-editar-estado-pago',
  imports: [FormularioEstadoPagoComponent],
  templateUrl: './editar-estado-pago.component.html',
  styleUrl: './editar-estado-pago.component.css'
})
export class EditarEstadoPagoComponent {

  ngOnInit(): void {


    //Tomando el valor id de la URL
    this.id = this.route.snapshot.paramMap.get('id')!;

    //Cuando se inicializa obtenemos el id de la categoria
    this.ordenService.obtenerEstadoPagoPorId(this.id).subscribe(estadoX => {
      this.estadoPago = estadoX;
    })
  }

  @Input()
  id!: string;

  router = inject(Router);
  estadoPago?: EstadoPagoDTO;
  ordenService = inject(OrdenService);
  route = inject(ActivatedRoute);


  guardarCambios(estadoPago: EstadoPagoCreacionDTO) {
    //Cuando enviamos la peticion ahi es donde actualizamos:D
    this.ordenService.EditarEstadoPago(this.id, estadoPago).subscribe({
      next: () => {
        console.log('editando estado pago', estadoPago);
        this.router.navigate(['/estadosPagos'])
      },
      error: err => {
        console.log('Error al editar estado', err);
      }
    })
  }
}
