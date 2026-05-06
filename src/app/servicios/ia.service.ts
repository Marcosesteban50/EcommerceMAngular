import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IaService {


  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Ia/preguntar';


  constructor() { }

    // Enviamos la pregunta como un objeto para que coincida con el backend
  preguntar(Pregunta: string): Observable<string> {
    //Especificamos que la respuesta es un texto
    return this.http.post(this.urlBase, { Pregunta }, { responseType: 'text' });
  }
}
