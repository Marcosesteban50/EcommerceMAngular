import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EstadoOrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import { OrdenService } from '../../../servicios/orden.service';
import { ListadoGenericoComponent } from "../../../compartidos/listado-generico/listado-generico.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-estado-orden',
  imports: [ListadoGenericoComponent,RouterLink],
  templateUrl: './lista-estado-orden.component.html',
  styleUrl: './lista-estado-orden.component.css'
})
export class ListaEstadoOrdenComponent {



  @Input({ required: true })
  estadoOrdenesLista: EstadoOrdenDTO[] = []

  ordenServicio = inject(OrdenService);
  cargando = false;
  error: string | null = null;

  @Output()
  estadoOrdenBorrada = new EventEmitter<string>();



  borrar(id: string) {
    this.estadoOrdenBorrada.emit(id);
  }

}
