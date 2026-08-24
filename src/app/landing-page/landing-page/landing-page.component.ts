import { Component, inject, OnInit } from '@angular/core';

import { ProductoDTO } from '../../modelos/ProductoModelos/Producto';
import { ProductoService } from '../../servicios/producto.service';
import Aos from 'aos';

import { FiltroProductoLandingComponent } from "../../componentes/productos/filtro-producto-landing/filtro-producto-landing.component";
import { HeroBannerComponent } from "../hero-banner/hero-banner.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-landing-page',
  imports: [FiltroProductoLandingComponent, HeroBannerComponent],
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
  router = inject(Router);
  productos!: ProductoDTO[];



  recibirProductos(productos: ProductoDTO[]) {
    this.productos = productos;
  }



}



