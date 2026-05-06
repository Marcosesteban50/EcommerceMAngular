import { Component, inject, OnInit } from '@angular/core';
import { EstadoPagoDTO } from '../../../modelos/OrdenModelos/Orden';
import { OrdenService } from '../../../servicios/orden.service';
import Aos from 'aos';
import { ListaEstadoPagoComponent } from "../lista-estado-pago/lista-estado-pago.component";
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-indice-estado-pago',
  imports: [ListaEstadoPagoComponent,RouterLink],
  templateUrl: './indice-estado-pago.component.html',
  styleUrl: './indice-estado-pago.component.css'
})
export class IndiceEstadoPagoComponent implements OnInit{

  ordenServicio = inject(OrdenService);
  estadoOrdenes!: EstadoPagoDTO[];

  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      once: true,
    })

    this.cargarEstados();
  }



  cargarEstados() {

    this.ordenServicio.obtenerEstadosPagos().subscribe(estadosX => {
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
  
          this.ordenServicio.borrarEstadoPago(id).subscribe(() => {
  
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
