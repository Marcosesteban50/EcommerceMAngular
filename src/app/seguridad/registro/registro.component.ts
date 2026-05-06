import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import { FormularioAutenticacionComponent } from "../formulario-autenticacion/formulario-autenticacion.component";
import { GoogleLoginButtonComponent } from "../google-login-button/google-login-button.component";
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-registro',
  imports: [FormularioAutenticacionComponent, GoogleLoginButtonComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private seguridadService = inject(SeguridadService);
  private carritoService = inject(CarritoService);
  router = inject(Router);
  errores: string[] = [];


  registrar(credenciales: CredencialesUsuarioDTO) {
    this.seguridadService.registrar(credenciales).subscribe({
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
        this.router.navigate(['/'])
      },
      error: err => {
        console.log('Error', err),
          this.errores = ['Login Incorrecto']
      }
    })
  }

}
