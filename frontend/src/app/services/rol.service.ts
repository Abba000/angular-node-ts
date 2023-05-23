import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlApi:string = environment.endpoint + "roles";

  constructor(private http:HttpClient) { }
  
  getRoles():Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.urlApi}`)
  }
}
