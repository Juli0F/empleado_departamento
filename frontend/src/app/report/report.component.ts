import { Component, OnInit } from '@angular/core';
import { ReportService } from 'service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  apellidosUnicos: string[] = [];
  reportTypes = [
    { id: 1, name: 'Todos los apellidos' },
    { id: 2, name: 'Apellidos Únicos' },
    { id: 3, name: 'Datos de Perez' },
    { id: 4, name: 'Datos de Pérez o López' },
    { id: 5, name: 'Datos del Departamento de Contabilidad' },
    { id: 6, name: 'Datos de Contabilidad y Gerencia General' },
    { id: 7, name: 'Datos de Empleados con Apellido Iniciado en P' },
    { id: 8, name: 'Presupuesto Total de Departamentos' },
    { id: 9, name: 'Número de Empleados por Departamento' },
    { id: 10, name: 'Listado de Empleados y Departamentos' },
    {
      id: 11,
      name: 'Listado de Empleados con Nombre, Apellido y Presupuesto de Departamento',
    },
    {
      id: 12,
      name: 'Empleados en Departamentos con Presupuesto Mayor a 60,000',
    },
    {
      id: 13,
      name: 'Datos de Departamentos con Presupuesto Superior al Promedio',
    },
    { id: 14, name: 'Nombres de Departamentos con Más de 2 Empleados' },
  ];

  selectedReportType: number = 1;
  reportData: any[] = [];
  reportHeaders: string[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    const reportType = Number(this.selectedReportType);
    console.log('Cambio a ', this.selectedReportType);
    switch (reportType) {
      case 1:
        this.reportService.getAllLastName().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 2:
        this.reportService.obtenerApellidosUnicos().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 3:
        this.reportService.obtenerPerez().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 4:
        this.reportService.obtenerPerezLopez().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 5:
        this.reportService.obtenerEmpleadoContabilidad().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 6:
        this.reportService.obtenerDatosContabilidadYGerenciaGeneral().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 7:
        this.reportService.obtenerDatosApellidoEmpiezaConP().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 8:
        this.reportService.obtenerPresupuestoTotalDepartamentos().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 9:
        this.reportService.obtenerNumeroEmpleadosPorDepartamento().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 10:
        this.reportService.obtenerNumeroEmpleadosPorDepartamento().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 11:
        this.reportService.obtenerListadoCompletoEmpleados().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 12:
        this.reportService.ObtenerEmpleadosDepartamentoPresupuestoAlto().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 13:
        this.reportService.obtenerDatosDepartamentosPresupuestoSuperiorPromedio().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      case 14:
        this.reportService.ObtenerDepartamentosConMasDeDosEmpleados().subscribe((data) => {
          this.processReportData(data);
        });
        break;
      default:
        console.log('Tipo de reporte no reconocido', reportType, this.selectedReportType );
    }

  }

  processReportData(data: any[]) {
    this.reportData = data;
    if (data.length > 0) {
      this.reportHeaders = Object.keys(data[0]);
      console.log("encabezado:",this.reportHeaders, data);
    }
  }
}
