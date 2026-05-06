import { Component, inject, Input, OnInit } from '@angular/core';
import { EstadoOrdenCreacionDTO, EstadoOrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import { OrdenService } from '../../../servicios/orden.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormularioEstadoOrdenComponent } from "../formulario-estado-orden/formulario-estado-orden.component";

@Component({
  selector: 'app-editar-estado-orden',
  imports: [FormularioEstadoOrdenComponent],
  templateUrl: './editar-estado-orden.component.html',
  styleUrl: './editar-estado-orden.component.css'
})
export class EditarEstadoOrdenComponent implements OnInit{


  ngOnInit(): void {


    //Tomando el valor id de la URL
    this.id = this.route.snapshot.paramMap.get('id')!;

    //Cuando se inicializa obtenemos el id de la categoria
    this.ordenService.obtenerEstadoOrdenPorId(this.id).subscribe(estadoX => {
      this.estadoOrden = estadoX;
    })
  }

  @Input()
  id!: string;

  router = inject(Router);
  estadoOrden?: EstadoOrdenDTO;
  ordenService = inject(OrdenService);
  route = inject(ActivatedRoute);


  guardarCambios(estadoOrden: EstadoOrdenCreacionDTO) {
    //Cuando enviamos la peticion ahi es donde actualizamos:D
    this.ordenService.EditarEstadoOrden(this.id, estadoOrden).subscribe({
      next: () => {
        console.log('editando estado Orden', estadoOrden);
        this.router.navigate(['/estadosOrdenes'])
      },
      error: err => {
        console.log('Error al editar estado', err);
      }
    })
  }

}
