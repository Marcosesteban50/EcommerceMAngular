import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AdminDashBoardDTO } from '../modelos/AdminModelos/AdminDashBoardDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private apiURL = environment.apiURL + '/Admin';

  obtenerDashboard() {
    return this.http.get<AdminDashBoardDTO>(this.apiURL + '/dashboard');
  }
}
