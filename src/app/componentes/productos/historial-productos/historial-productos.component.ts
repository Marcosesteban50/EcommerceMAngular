import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListadoGenericoComponent } from '../../../compartidos/listado-generico/listado-generico.component';
import { AutorizadoComponent } from '../../../seguridad/autorizado/autorizado.component';
import { ProductoService } from '../../../servicios/producto.service';
import Aos from 'aos';
import { ProductoDTO, ProductoHistorial } from '../../../modelos/ProductoModelos/Producto';
import { ListaHistorialProductosComponent } from "../lista-historial-productos/lista-historial-productos.component";

@Component({
  selector: 'app-historial-productos',
  imports: [ListaHistorialProductosComponent],
  templateUrl: './historial-productos.component.html',
  styleUrl: './historial-productos.component.css'
})
export class HistorialProductosComponent implements OnInit {






  ngOnInit(): void {

    Aos.init({
      duration: 1000,
      once: true,
    });

    this.cargarProductos();


  }

  productoServicio = inject(ProductoService);
  productos!: ProductoHistorial[];



  cargarProductos() {

    this.productoServicio.obtenerHistorialGeneral().subscribe(x => {
      this.productos = x;
    })
  }

}
