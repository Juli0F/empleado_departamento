// employee.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from 'model/model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DepartamentService {
   baseUrl =  'http://localhost:5177/departament';
  constructor(
    private http: HttpClient
  ) { }
  createDepartament(departament: Departamento):  Observable<any> {
    return this.http.post(this.baseUrl, departament);
  }
  obtenerTodoE(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.baseUrl);
  }
  obtenerDepartamento(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }
  updateDepartment(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.baseUrl}/${departamento.id}`, departamento);
  }
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
