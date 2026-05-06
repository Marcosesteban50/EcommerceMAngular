import { Component, inject, OnInit } from '@angular/core';
import { OrdenService } from '../../../servicios/orden.service';
import { EstadoOrdenDTO } from '../../../modelos/OrdenModelos/Orden';
import Aos from 'aos';
import Swal from 'sweetalert2';
import { ListaEstadoOrdenComponent } from "../lista-estado-orden/lista-estado-orden.component";
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-indice-estado-orden',
  imports: [ListaEstadoOrdenComponent,RouterLink,MatButton],
  templateUrl: './indice-estado-orden.component.html',
  styleUrl: './indice-estado-orden.component.css'
})
export class IndiceEstadoOrdenComponent implements OnInit{

  ordenServicio = inject(OrdenService);
  estadoOrdenes!: EstadoOrdenDTO[];

  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      once: true,
    })

    this.cargarEstados();
  }



  cargarEstados() {

    this.ordenServicio.obtenerEstadosOrden().subscribe(estadosX => {
      this.estadoOrdenes = estadosX;
    })
  }


  borrarEstado(id: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El estado será borrado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then(result => {

      if (result.isConfirmed) {

        this.ordenServicio.borrarEstadoOrden(id).subscribe(() => {

          // 🔥 Remover producto de la lista sin recargar
          this.estadoOrdenes = this.estadoOrdenes.filter(x => x.id !== id);

          Swal.fire(
            "Borrado",
            "El estado se eliminó correctamente.",
            "success"
          );

        });

      }
    });
  }

}
