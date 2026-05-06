import { inject, Injectable } from '@angular/core';
import { CategoriaCreacionDTO, CategoriaDTO } from '../modelos/CategoriaModelos/Categoria';
import { IServicioCRUD } from '../interfaces/iServicioCrud';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService implements IServicioCRUD<CategoriaDTO, CategoriaCreacionDTO> {


  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Categoria'


  constructor() { }



  public obtenerTodos(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${this.urlBase}/ObtenerCategorias`);

  }
  public obtenerPorId(id: string): Observable<CategoriaDTO> {
    return this.http.get<CategoriaDTO>(`${this.urlBase}/${id}`);

  }
  public actualizar(id: string, entidad: CategoriaCreacionDTO): Observable<any> {
    return this.http.put(`${this.urlBase}/${id}`, entidad)



  }
  public crear(entidad: CategoriaCreacionDTO): Observable<any> {
    return this.http.post(this.urlBase, entidad);

  }
  public borrar(id: string): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`)


  }


}
