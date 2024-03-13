export class Employee  {
  dni !: string;
  name! : string;
  lastName !: string;
  departament !: Departamento;
};
export class Departamento{
  id! : number;
  name !: string;
  budget !: string;
}
