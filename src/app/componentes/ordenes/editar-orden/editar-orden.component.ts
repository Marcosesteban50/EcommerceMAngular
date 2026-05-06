import { Component, inject, Input, OnInit } from '@angular/core';
import { FormularioOrdenesComponent } from "../formulario-ordenes/formulario-ordenes.component";
import { OrdenService } from '../../../servicios/orden.service';
import { OrdenCreacionDTO, OrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-orden',
  imports: [FormularioOrdenesComponent],
  templateUrl: './editar-orden.component.html',
  styleUrl: './editar-orden.component.css'
})
export class EditarOrdenComponent implements OnInit {


  ngOnInit(): void {

    this.ordenId = this.route.snapshot.paramMap.get('id')!;


    this.ordenService.obtenerOrdenPorId(this.ordenId).subscribe(ordenX => {
      this.orden = ordenX;
    })

  }




  private ordenService = inject(OrdenService);
  private route = inject(ActivatedRoute);
  router = inject(Router);


  @Input()
  ordenId!: string;

  orden?: OrdenDTO;




  guardarCambios(orden: OrdenCreacionDTO) {
    //Cuando enviamos la peticion ahi es donde actualizamos:D
    this.ordenService.EditarOrden(this.ordenId, orden).subscribe({
      next: () => {

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "Orden editada"
        });

        console.log('editando orden', orden);
        this.router.navigate(['/admin/ordenes'])
      },
      error: err => {
        console.log('Error al editar orden', err);


        Swal.fire({
          title: "Error",
          text: "Ocurrió un problema al editar la orden.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      }
    })
  }




}
