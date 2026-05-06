import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoDTO } from '../../../modelos/ProductoModelos/Producto';
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { RouterLink } from '@angular/router';
import { ListadoGenericoComponent } from "../../../compartidos/listado-generico/listado-generico.component";

@Component({
  selector: 'app-lista-productos-pendientes',
  imports: [AutorizadoComponent, ListadoGenericoComponent],
  templateUrl: './lista-productos-pendientes.component.html',
  styleUrl: './lista-productos-pendientes.component.css'
})
export class ListaProductosPendientesComponent {


  @Input({ required: true })
  productos!: ProductoDTO[];


  @Output() aprobar = new EventEmitter<string>();
  @Output() rechazar = new EventEmitter<string>();

  aprobarProducto(id: string) {
    this.aprobar.emit(id);
  }

  rechazarProducto(id: string) {
    this.rechazar.emit(id);
  }



}
