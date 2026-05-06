import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  CredencialesUsuarioDTO,
  RespuestaAutenticationDTO,
  UsuarioDTO,
  GoogleLoginRequestDTO,
  RespuestaAutenticacionCompletaDTO,
  UserInfo
} from './seguridad';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Usuarios'; // Esto apuntará a https://localhost:7206/api/Usuarios
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly llaveUsuario = 'user-info';

  //BehaviorSubject de RxJS para guardar estado del user
  private userSubject = new BehaviorSubject<UserInfo | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.cargarUsuarioDesdeStorage();
  }

  // ========== MÉTODO PARA GOOGLE LOGIN ==========
  loginConGoogle(idToken: string): Observable<RespuestaAutenticacionCompletaDTO> {
    //Construimos el body que enviaremos al backend
    const request: GoogleLoginRequestDTO = { token: idToken };

    return this.http.post<RespuestaAutenticacionCompletaDTO>(`${this.urlBase}/google-login`, request)
      .pipe(
        tap(respuesta => {
          console.log('✅ Login Google exitoso:', respuesta);
          this.guardarToken(respuesta);
          this.guardarInfoUsuario(respuesta.usuario);
        })
      );
  }

  // ========== MÉTODOS EXISTENTES ==========
  obtenerUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.urlBase}/ListadoUsuarios`);
  }

  HacerAdmin(email: string) {
    return this.http.post(`${this.urlBase}/HacerAdmin`, { email });
  }

  RemoverAdmin(email: string) {
    return this.http.post(`${this.urlBase}/RemoverAdmin`, { email });
  }

  HacerVendedor(email: string) {
    return this.http.post(`${this.urlBase}/HacerVendedor`, { email });
  }

  RemoverVendedor(email: string) {
    return this.http.post(`${this.urlBase}/RemoverVendedor`, { email });
  }

  HacerCliente(email: string) {
    return this.http.post(`${this.urlBase}/HacerCliente`, { email });
  }

  RemoverCliente(email: string) {
    return this.http.post(`${this.urlBase}/RemoverCliente`, { email });
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.llaveToken);
  }

  registrar(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticationDTO> {
    return this.http.post<RespuestaAutenticationDTO>(`${this.urlBase}/registrar`, credenciales)
      .pipe(
        //Guardando Token en LocalStorage y con Tap ejecutamos una funcion
        tap((respuestaAuth => this.guardarToken(respuestaAuth)))
      )
  }

  login(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticationDTO> {
    return this.http.post<RespuestaAutenticationDTO>(`${this.urlBase}/login`, credenciales)
      .pipe(
        tap((respuestaAuth => this.guardarToken(respuestaAuth)))
      )
  }

  // Metodo para obtener un campo específico del JWT almacenado en localStorage
  obtenerCampoJWT(campo: string): string {

    //Obtener el token guardado en localStorage usando la llave configurada
    const token = localStorage.getItem(this.llaveToken);

    if (!token) { return ''; }


    // Separamos el JWT en sus 3 partes (header.payload.signature)
    //    Tomamos la segunda parte [1] que corresponde al payload
    //    Luego lo decodificamos de Base64 con atob()
    //    Finalmente lo convertimos de string JSON a objeto JavaScript
    const dataToken = JSON.parse(atob(token.split('.')[1]));

    // Obtenemos el valor del campo solicitado (email, role, etc.)
    const valor = dataToken[campo];

    if (!valor) {
      return '';
    }


    //Obtenemos todo antes del @ en caso de ser email y retornamos eso
    if (campo === 'email') {
      return valor.split('@')[0];
    }

//Si no retornamos el valor completo
    return valor;

  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticationDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }


  //Google todo esto
  private guardarInfoUsuario(usuario: any): void {
    const userInfo: UserInfo = {
      email: usuario.email,
      name: usuario.name || usuario.email.split('@')[0],
      picture: usuario.picture || '',
      roles: this.obtenerRolesDelToken()
    };

    //el usuario sigue logeado Aun si recargamos o cerramos
    //llave = llaveUsuario , convertimos userinfo a string
    localStorage.setItem(this.llaveUsuario, JSON.stringify(userInfo));
    //Emitimos el nuevo usuario con el userInfo de arriba al UserSubject
    this.userSubject.next(userInfo);
  }

  private cargarUsuarioDesdeStorage(): void {
    const userStr = localStorage.getItem(this.llaveUsuario);
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userSubject.next(user);
      } catch {
        this.limpiarInfoUsuario();
      }
    }
  }

  private limpiarInfoUsuario(): void {
    localStorage.removeItem(this.llaveUsuario);
    //Logout basicamente
    this.userSubject.next(null);
  }

  private obtenerRolesDelToken(): string[] {
    const roles: string[] = [];
    const token = this.obtenerToken();

    if (!token) return ['Cliente'];

    try {
      //Obtenemos el Rol del Usuario 

      //====JWT tiene 3 partes separadas por .: header.payload.signature======
      //y tomamos el payload en base64 donde estan los claims
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.Admin === 'true') roles.push('Admin');
      if (payload.Vendedor === 'true') roles.push('Vendedor');
      if (payload.Cliente === 'true') roles.push('Cliente');

      if (roles.length === 0) {
        roles.push('Cliente');
      }
    } catch {
      roles.push('Cliente');
    }

    return roles;
  }

  obtenerUsuarioActual(): UserInfo | null {
    return this.userSubject.value;
  }

  obtenerFotoUsuario(): string {
    const user = this.obtenerUsuarioActual();

    if (!user?.picture) return '';

    return user?.picture.replace('=s96-c', '=s200');
  }

  obtenerNombreUsuario(): string {
    const user = this.obtenerUsuarioActual();
    return user?.name || this.obtenerCampoJWT('email')?.split('@')[0] || 'Usuario';
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    if (!expiracion) {
      return false;
    }

    const expiracionFecha = new Date(expiracion);
    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    localStorage.removeItem(this.llaveUsuario);
    this.userSubject.next(null);

    if (typeof window.google !== 'undefined') {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  obtenerRol(): string {
    const Admin = this.obtenerCampoJWT('Admin');
    const Vendedor = this.obtenerCampoJWT('Vendedor');
    const Cliente = this.obtenerCampoJWT('Cliente');

    if (Admin) {
      return 'Admin';
    }

    if (Vendedor) {
      return 'Vendedor';
    }

    if (Cliente) {
      return 'Cliente';
    }

    return '';
  }

  esAdmin(): boolean {
    return this.obtenerRol() === 'Admin';
  }

  esVendedor(): boolean {
    return this.obtenerRol() === 'Vendedor';
  }

  esCliente(): boolean {
    return this.obtenerRol() === 'Cliente';
  }
}