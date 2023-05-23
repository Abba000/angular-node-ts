import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/response-api';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi:string = environment.endpoint + "productos";

  constructor(private http:HttpClient) { }

  getProductos():Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlApi}`)
  }

  getProducto(id: number):Observable<Producto> {
    return this.http.get<Producto>(`${this.urlApi}/${id}`)
  }

  createProducto(request: Producto): Observable<void> {
    return this.http.post<void>(`${this.urlApi}`, request)
  }

  updateProducto(id: number, request: Producto): Observable<void> {
    return this.http.put<void>(`${this.urlApi}/${id}`, request)
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`)
  }
}
