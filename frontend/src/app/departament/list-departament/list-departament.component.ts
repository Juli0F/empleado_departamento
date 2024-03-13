import { Component, OnInit } from '@angular/core';
import { Departamento } from 'model/model';
import { DepartamentService } from 'service/departament.service';

@Component({
  selector: 'app-list-departament',
  templateUrl: './list-departament.component.html',
  styleUrls: ['./list-departament.component.css']
})
export class ListDepartamentComponent implements OnInit {

    departamentos: Departamento[] = [];
    departamentoEditando?: Departamento;

    constructor(private departmentService: DepartamentService) {}

    ngOnInit(): void {
      this.departmentService.obtenerTodoE().subscribe(
        (data: Departamento[]) => {
          this.departamentos = data;
        },
        (error) => {
          console.error('Error al obtener los departamentos', error);
        }
      );
    }

    onDelete(id: number): void {
      this.departmentService.deleteDepartment(id).subscribe({
        next:() => {
          // Actualiza la vista después de borrar un departamento.
          this.departamentos = this.departamentos.filter(departamento => departamento.id !== id);
        },
        error: error => {
          console.error('Error al eliminar el departamento', error);
        }
    });
    }

    onEdit(departamento: Departamento): void {
      // Clona el objeto para no editar el objeto en el array directamente.
      this.departamentoEditando = { ...departamento };
    }

    guardarCambios(): void {
      if (this.departamentoEditando) {
        this.departmentService.updateDepartment(this.departamentoEditando).subscribe({
          next:(data) => {
            // Actualiza el array de departamentos con los datos actualizados.
            const index = this.departamentos.findIndex(d => d.id === this.departamentoEditando!.id);
            if (index !== -1) {
              this.departamentos[index] = data;
            }
            this.departamentoEditando = undefined; // Limpia el departamento en edición.
          },
          error: (error) => {
            console.error('Error al actualizar el departamento', error);
          }
      });
      }
    }

    cancelarEdicion(): void {
      this.departamentoEditando = undefined;
    }
}
