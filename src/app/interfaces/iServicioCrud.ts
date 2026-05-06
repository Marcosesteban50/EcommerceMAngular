import { Observable } from "rxjs";

export interface IServicioCRUD<TDTO, TCreacionDTO> {



  obtenerTodos(): Observable<TDTO[]>;
  obtenerPorId(id: string): Observable<TDTO>;
  actualizar(id: string, entidad: TCreacionDTO): Observable<any>;
  crear(entidad: TCreacionDTO): Observable<any>;
  borrar(id: string): Observable<any>;


}