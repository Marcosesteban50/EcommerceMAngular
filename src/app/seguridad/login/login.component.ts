import { Component, inject } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from '../seguridad';
import { FormularioAutenticacionComponent } from "../formulario-autenticacion/formulario-autenticacion.component";
import { GoogleLoginButtonComponent } from "../google-login-button/google-login-button.component"; // IMPORTAR
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-login',
  imports: [
    FormularioAutenticacionComponent,
    GoogleLoginButtonComponent // AGREGAR AQUÍ
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  seguridadService = inject(SeguridadService);
  carritoService = inject(CarritoService);
  router = inject(Router);
  errores: string[] = [];

  loguear(credenciales: CredencialesUsuarioDTO) {
    this.errores = [];

    //Logeando
    this.seguridadService.login(credenciales).subscribe({
      next: () => {

        //Sincronizando carritoTemporal Con el carrito Local del usuario
        this.carritoService.sincronizarCarritoInvitado().subscribe({
          next: () => {
            //Borramos el carrito temporal del localstorage
            this.carritoService.limpiarCarritoInvitado();
            this.router.navigate(['/']);
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });

      },
      error: (err) => {
        console.log('Error', err);

        if (err.status === 400) {
          this.errores = ['Email o contraseña incorrectos'];
        } else if (err.status === 0) {
          this.errores = ['No se puede conectar con el servidor'];
        } else {
          this.errores = ['Error al iniciar sesión'];
        }
      }
    });
  }
}