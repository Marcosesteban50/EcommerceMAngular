import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { RouterLink } from '@angular/router';
import { UsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import Swal from 'sweetalert2';
import { ListaUsuariosComponent } from "../lista-usuarios/lista-usuarios.component";
import Aos from 'aos';


@Component({
  selector: 'app-indice-usuarios',
  imports: [ MatButtonModule, MatTableModule, ListaUsuariosComponent],
  templateUrl: './indice-usuarios.component.html',
  styleUrl: './indice-usuarios.component.css'
})
export class IndiceUsuariosComponent implements OnInit{



  ngOnInit(): void {
     Aos.init({
         duration: 1000,
         once: true,
       })
  }

  usuarios!: UsuarioDTO[];
  
  error: string | null = null;


  servicioSeguridad = inject(SeguridadService);

  constructor() {
    this.cargarRegistros();
  }



  cargarRegistros() {
    this.servicioSeguridad.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los Usuarios', err;
      }
    })
  }







}
