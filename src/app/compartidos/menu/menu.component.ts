import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";
import { SeguridadService } from '../../seguridad/seguridad.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IaComponent } from "../ia/ia.component";




@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, RouterLink, AutorizadoComponent, IaComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  seguridadService = inject(SeguridadService);


  obtenerFotoPerfil(): string {
    return this.seguridadService.obtenerFotoUsuario();
  }



  cerrarMenu() {
    if (window.innerWidth <= 768) {
      this.menuColapsado = false;
    }
  }


  //Menu Hamburguesa para esconder menu
  menuColapsado = false;


  toggleMenu() {
    //!this.menuColapsado = siempre sera diferente al valor que tenga asignado  
    //si esta true sera false , si esta false sera true :D
    this.menuColapsado = !this.menuColapsado;
  }

}
