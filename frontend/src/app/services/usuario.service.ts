import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi:string = environment.endpoint + "usuarios";

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlApi}`)
  }

  getUsuario(id: number):Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlApi}/${id}`)
  }

  createUsuario(request: Usuario): Observable<void> {
    return this.http.post<void>(`${this.urlApi}`, request)
  }

  updateUsuario(id: number, request: Usuario): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, request)
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`)
  }
}
