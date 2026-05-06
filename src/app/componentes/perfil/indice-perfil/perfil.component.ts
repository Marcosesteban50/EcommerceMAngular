import { Component, inject, Input, OnInit } from '@angular/core';

import Aos from 'aos';
import { PerfilUsuario } from '../../../modelos/PerfilModelos/PerfilUsuario';
import { PerfilService } from '../../../servicios/perfil.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  
  perfil!: PerfilUsuario;
  perfilService = inject(PerfilService);


  constructor() { }

  ngOnInit(): void {

    Aos.init({
      duration: 1000,
      once: true,
    })

    this.cargarPendientes();
  }



  cargarPendientes() {
    this.perfilService.obtenerMiPerfil().subscribe(perfilX => {
      this.perfil = perfilX;

    }

    
    )
  }
}
