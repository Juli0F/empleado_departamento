import { Component, OnInit } from '@angular/core';
import { Departamento } from 'model/model';
import { DepartamentService } from 'service/departament.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  departament !: Departamento;

  constructor(private departamentService: DepartamentService){

  }

  ngOnInit(): void {
    this.departament = new Departamento();
  }


  createDepartament(){
    console.log("creando departamento");
    this.departamentService.createDepartament(this.departament).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }
}
