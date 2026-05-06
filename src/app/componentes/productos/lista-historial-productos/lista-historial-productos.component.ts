import { Component, inject, Input } from '@angular/core';
import { ProductoHistorial } from '../../../modelos/ProductoModelos/Producto';
import { ListadoGenericoComponent } from "../../../compartidos/listado-generico/listado-generico.component";
import { RouterLink } from '@angular/router';
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { DatePipe } from '@angular/common';
import { c } from "../../../../../node_modules/@angular/cdk/a11y-module.d-DBHGyKoh";
import { SeguridadService } from '../../../seguridad/seguridad.service';

@Component({
  selector: 'app-lista-historial-productos',
  imports: [ListadoGenericoComponent, AutorizadoComponent, DatePipe,RouterLink],
  templateUrl: './lista-historial-productos.component.html',
  styleUrl: './lista-historial-productos.component.css'
})
export class ListaHistorialProductosComponent {



  @Input({ required: true })
  productos!: ProductoHistorial[];

  seguridadService = inject(SeguridadService);

  esAdmin(): boolean {
    return this.seguridadService.obtenerRol() === 'Admin';
  }





}
