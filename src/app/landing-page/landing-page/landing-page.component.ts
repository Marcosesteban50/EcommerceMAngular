import { Component, inject, OnInit } from '@angular/core';

import { ProductoDTO } from '../../modelos/ProductoModelos/Producto';
import { ProductoService } from '../../servicios/producto.service';
import Aos from 'aos';

import { FiltroProductoLandingComponent } from "../../componentes/productos/filtro-producto-landing/filtro-producto-landing.component";



@Component({
  selector: 'app-landing-page',
  imports: [FiltroProductoLandingComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  ngOnInit(): void {

    Aos.init({
      duration: 1000,
      once: true,
    })

    this.productoServicio.obtenerTodos().subscribe(productos => {
      this.productos = productos;
    })

  }




  productoServicio = inject(ProductoService);
  productos!: ProductoDTO[];


  
  recibirProductos(productos: ProductoDTO[]) {
    this.productos = productos;
  }



}


//Utilizar esto cuando empezemos a agregar componnetes dinamicamente
// ngAfterViewInit(): void {
//   Aos.refresh(); // refresca animaciones al cargar vista
// }
