// employee.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'model/model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5177/employee'; 

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  deleteEmployee(dni: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${dni}`);
  }

  updateEmployee(dni: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${dni}`, employee);
  }
  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  }
