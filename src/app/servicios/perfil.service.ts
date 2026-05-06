import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../modelos/PerfilModelos/PerfilUsuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Perfil'

  constructor() { }

  obtenerMiPerfil(): Observable<PerfilUsuario> {
    return this.http.get<PerfilUsuario>(`${this.urlBase}/mi-perfil-completo`);
  }



  public actualizar(perfil: PerfilUsuario): Observable<any> {

    return this.http.put(`${this.urlBase}/Actualizar-perfil`, perfil)



  }



}
