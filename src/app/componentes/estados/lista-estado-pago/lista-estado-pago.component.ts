import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EstadoPagoDTO } from '../../../modelos/OrdenModelos/Orden';
import { RouterLink } from '@angular/router';
import { ListadoGenericoComponent } from '../../../compartidos/listado-generico/listado-generico.component';
import { OrdenService } from '../../../servicios/orden.service';

@Component({
  selector: 'app-lista-estado-pago',
  imports: [ListadoGenericoComponent,RouterLink],
  templateUrl: './lista-estado-pago.component.html',
  styleUrl: './lista-estado-pago.component.css'
})
export class ListaEstadoPagoComponent {

  @Input({ required: true })
  estadoPagosLista: EstadoPagoDTO[] = []

  ordenServicio = inject(OrdenService);
  cargando = false;
  error: string | null = null;

  @Output()
  estadoPagoBorrado = new EventEmitter<string>();



  borrar(id: string) {
    this.estadoPagoBorrado.emit(id);
  }
}
