import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Aos from 'aos';
import { ListadoGenericoComponent } from '../../../compartidos/listado-generico/listado-generico.component';
import { OrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import { EstadoOrden, EstadoPago } from '../../../modelos/OrdenModelos/OrdenEnums';
import { OrdenService } from '../../../servicios/orden.service';

@Component({
  selector: 'app-indice-ordenes',
  imports: [CurrencyPipe, DatePipe, ListadoGenericoComponent, CommonModule, RouterLink],
  templateUrl: './indice-ordenes.component.html',
  styleUrl: './indice-ordenes.component.css'
})
export class IndiceOrdenesComponent implements OnInit {
  @Input({ required: true })
  ordenes!: OrdenDTO[];
  ordenesService = inject(OrdenService);

  ngOnInit(): void {

    Aos.init({
      duration: 1001,
      once: true,
    })

    this.cargarPendientes();
  }



  cargarPendientes() {
    this.ordenesService.obtenerOrdenes().subscribe(ordenesX => {
      this.ordenes = ordenesX;

    }
    )
  }

  





}
