import { Component, OnInit } from '@angular/core';
import { Employee } from 'model/model';
import { EmployeeService } from 'service/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employeeEditing?: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next:(data) => {
        console.log("data")
        console.log(data)
        this.employees = data;
      },
      error:(error) => {
        console.error('Error al obtener empleados', error);
      }
  });
  }

  onDelete(dni: string): void {
    this.employeeService.deleteEmployee(dni).subscribe({
      next: () => {
        this.employees = this.employees.filter(employee => employee.dni !== dni);
      },
      error: () => {
        console.error('Error al eliminar el empleado', );
      }
  });
  }

  onEdit(employee: Employee): void {
    this.employeeEditing = { ...employee };
  }

  guardarCambios(): void {
    if (this.employeeEditing) {
      this.employeeService.updateEmployee(this.employeeEditing.dni, this.employeeEditing).subscribe({
        next: (data: Employee) => {
          const index = this.employees.findIndex(e => e.dni === this.employeeEditing!.dni);
          if (index !== -1) {
            this.employees[index] = data;
          }
          this.employeeEditing = undefined;
        },
        error: (error: any) => {
          console.error('Error al actualizar el empleado', error);
        }
    });
    }
  }

  cancelarEdicion(): void {
    this.employeeEditing = undefined;
  }

}
