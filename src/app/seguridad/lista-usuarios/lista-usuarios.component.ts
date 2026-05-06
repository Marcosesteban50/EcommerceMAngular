import { Component, inject } from '@angular/core';
import { UsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import { MatButton } from "@angular/material/button";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatButton],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  usuarios: UsuarioDTO[] = []
  seguridadServicio = inject(SeguridadService);
  cargando = true;
  error: string | null = null;
  usuariosAdmin: any[] = [];
  usuariosVendedor: any[] = [];
  usuariosCliente: any[] = [];

  constructor() { }



  seguridadService = inject(SeguridadService);

  ngOnInit(): void {
    this.cargarUsuarios();

  }



  cargarUsuarios() {
    this.seguridadService.obtenerUsuarios().subscribe({
      next: (usuarios) => {

        // console.log('USUARIOS CRUDOS:', usuarios);
        // console.log('ROL LOGUEADO:', this.seguridadService.obtenerRol());

        this.usuariosAdmin = usuarios.filter(u => this.tieneRol(u, 'Admin'));
        this.usuariosVendedor = usuarios.filter(u => this.tieneRol(u, 'Vendedor'));
        this.usuariosCliente = usuarios.filter(u => this.tieneRol(u, 'Cliente'));


        // console.log('ADMIN:', this.usuariosAdmin);
        // console.log('VENDEDOR:', this.usuariosVendedor);
        // console.log('CLIENTE:', this.usuariosCliente);
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error cargando usuarios';
      }
    });
  }




  //Buscando el rol del usuario
  tieneRol(usuario: any, rol: string): boolean {
    return usuario.roles?.some(
      (r: string) => r.toLowerCase().startsWith(rol.toLowerCase())
    );
  }




  hacerAdmin(email: string) {
    this.seguridadService.HacerAdmin(email).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario ahora es Admin'
        });
      },
      error: (err) => {
        const mensaje =
          err.error.mensaje || 'Ocurrió un error inesperado';

        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: mensaje
        });
      }
    }

    )
  }


  removerAdmin(email: string) {
    this.seguridadService.RemoverAdmin(email).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario no es Admin'
        });
      },
      error: (err) => {
        const mensaje =
          err.error.mensaje || 'Ocurrió un error inesperado';

        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: mensaje
        });
      }
    })
  }



  //Vendedores
  hacerVendedor(email: string) {
    this.seguridadService.HacerVendedor(email).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario Ahora es un Vendedor'
        });
      },
      error: (err) => {
        const mensaje =
          err.error.mensaje || 'Ocurrió un error inesperado';

        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: mensaje
        });
      }
    })
  }


  removerVendedor(email: string) {
    this.seguridadService.RemoverVendedor(email).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario ya no es Vendedor'
        });
      },
      error: (err) => {
        const mensaje =
          err.error.mensaje || 'Ocurrió un error inesperado';

        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: mensaje
        });
      }
    })
  }



  // //Clientes
  // hacerCliente(email: string) {
  //   this.seguridadService.HacerAdmin(email).subscribe(() => {
  //     Swal.fire("Exitoso", `El usuario ${email} ahora es admin`, "success")
  //   })
  // }


  // removerCliente(email: string) {
  //   this.seguridadService.RemoverAdmin(email).subscribe(() => {
  //     Swal.fire("Exitoso", `El usuario ${email} ya no es admin`, "success")
  //   })
  // }


}
