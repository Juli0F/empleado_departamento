import { Component, OnInit } from '@angular/core';
import { Departamento, Employee } from 'model/model';
import { DepartamentService } from 'service/departament.service';
import { EmployeeService } from 'service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee !: Employee;
  departamentos: Departamento[] = [];
  selectedDepartamentId: number | null = null;

  constructor(private employeeService: EmployeeService,
    private departamentoService: DepartamentService
    ) {

  }
  ngOnInit(): void {
    this.employee = new Employee();
    this.departamentoService.obtenerTodoE().subscribe((data: Departamento[]) => {
      this.departamentos = data;
    });
  }
  createEmployee(){
    console.log("creando empleado");
    console.log(this.employee);
    
    this.employeeService.createEmployee(this.employee).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

}
