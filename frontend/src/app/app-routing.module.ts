import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { CreateComponent } from './departament/create/create.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { ListDepartamentComponent } from './departament/list-departament/list-departament.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'list-employee', component: ListEmployeeComponent },
  { path: 'create-departament', component: CreateComponent },
  { path: 'list-departament', component: ListDepartamentComponent },
  { path: 'report', component: ReportComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
