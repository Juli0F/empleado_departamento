// employee.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from 'model/model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReportService {
   baseUrl =  'http://localhost:5177/report';
  constructor(
    private http: HttpClient
  ) { }
  getAllLastName(): Observable<any> {
    return this.http.get(`${this.baseUrl}/apellidos`);
  }
  getEmployeesBySurname(surname: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${surname}`);
  }
  public obtenerApellidosUnicos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/apellidos-unicos`);
  }
  public obtenerPerez(): Observable<any> {
    return this.http.get(`${this.baseUrl}/perez`);
  }

  public obtenerPerezLopez(): Observable<any> {
    return this.http.get(`${this.baseUrl}/perez/lopez`);
  }
  public obtenerDatosContabilidadYGerenciaGeneral(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleado/contabilidad-gerencia`);
  }
  public obtenerDatosApellidoEmpiezaConP(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleado/apellido-p`);
  }
  // Método para obtener empleados de contabilidad
  public obtenerEmpleadoContabilidad(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleado/contabilidad`);
  }
  public obtenerEmpleadosPorDepartamento(departamento: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleado/${departamento}`);
  }


  public obtenerPresupuestoTotalDepartamentos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departamentos/presupuesto-total`);
  }

  // Método para obtener el número de empleados por departamento
  public obtenerNumeroEmpleadosPorDepartamento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departamentos/numero-empleados`);
  }

  // Método para obtener empleados con los detalles de su departamento
  public obtenerEmpleadosConDepartamento(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleados-con-departamento`);
  }
  public obtenerListadoCompletoEmpleados(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleados-con-departamento`);//ssssssss
  }
  public ObtenerEmpleadosDetalladoOrdenado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleados-detallado-ordenado`);
  }
  public ObtenerEmpleadosDepartamentoPresupuestoAlto(): Observable<any> {
    return this.http.get(`${this.baseUrl}/empleados-departamento-presupuesto-60k`);
  }
  public obtenerDatosDepartamentosPresupuestoSuperiorPromedio(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departamentos/presupuesto-sobre-media`);
  }
  public ObtenerDepartamentosConMasDeDosEmpleados(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departamentos/mas-de-dos-empleados`);
  }
}
