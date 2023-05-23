import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi:string = environment.endpoint + "categorias";

  constructor(private http:HttpClient) { }

  getCategorias():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.urlApi}`)
  }
}
