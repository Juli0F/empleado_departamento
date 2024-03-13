
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prueba.Data;
using prueba.Models;

namespace prueba.Controllers;

[ApiController, Route("report")]
public class ReportController : Controller
{

    private readonly ILogger<ReportController> _logger;
    private readonly PDbContext _dbContext;
    public ReportController(ILogger<ReportController> logger, PDbContext dbContext)
    {
        this._logger = logger;
        this._dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var employeeos = _dbContext.Employee.ToList();
        return Ok(employeeos);
    }


    [HttpGet("apellidos-unicos")]
    public IActionResult ObtenerApellidosUnicos()
    {
        var apellidosUnicos = _dbContext.Employee
            .Select(e => e.LastName)
            .Distinct()
            .ToList();

        return Ok(apellidosUnicos);
    }
    [HttpGet("apellidos")]
    public IActionResult ObtenerApellidos()
    {
        var apellidos = _dbContext.Employee
            .Select(e => e.LastName)
            .ToList();

        return Ok(apellidos);
    }

    [HttpGet("/perez/lopez")]
    public IActionResult ObtenerPerezLopez()
    {
        var apellidosUnicos = _dbContext.Employee
            //.Select(e => e.LastName)
            .Where(e => e.LastName == "Perez" || e.LastName == "Lopez")
            .ToList();

        return Ok(apellidosUnicos);
    }
     [HttpGet("/perez")]
    public IActionResult ObtenerPerez()
    {
        var apellidosUnicos = _dbContext.Employee
            .Where(e => e.LastName.ToLower() == "perez" )
            .ToList();

        return Ok(apellidosUnicos);
    }

    [HttpGet("empleado/contabilidad")]
    public IActionResult ObtenerEmpleadoContabilidad()
    {
        var empleadosContabilidad = _dbContext.Employee
        .Include(e => e.Departament)
        .Where(e => e.Departament.Name == "Contabilidad")
        .ToList();

        return Ok(empleadosContabilidad);
    }
    [HttpGet("empleado/contabilidad-gerencia")]
    public IActionResult ObtenerEmpleadoContabilidadGerencia()
    {
        var empleadosContabilidad = _dbContext.Employee
        .Include(e => e.Departament)
        .Where(e => e.Departament.Name == "Contabilidad" && e.Departament.Name == "Gerencia General")
        .ToList();

        return Ok(empleadosContabilidad);
    }
    [HttpGet("empleado/apellido-p")]
    public IActionResult ObtenerEmpleadoApellidoP()
    {
        var empleadosApellidoP = _dbContext.Employee
            .Where(e => EF.Functions.Like(e.LastName.ToLower(), "p%"))
            .ToList();

        return Ok(empleadosApellidoP);
    }
    [HttpGet("departamentos/presupuesto-total")]
    public IActionResult ObtenerPresupuestoTotalDepartamentos()
    {
        var presupuestoTotal = _dbContext.Departamentos
            .Sum(d => d.Budget);

        return Ok(presupuestoTotal);
    }
    [HttpGet("departamentos/numero-empleados")]
    public IActionResult ObtenerNumeroEmpleadosPorDepartamento()
    {
        var conteoEmpleadosPorDepartamento = _dbContext.Employee
            .Include(e => e.Departament)
            .GroupBy(e => e.Departament.Name)
            .Select(group => new
            {
                Departamento = group.Key,
                NumeroEmpleados = group.Count()
            })
            .ToList();

        return Ok(conteoEmpleadosPorDepartamento);
    }
    [HttpGet("empleados-con-departamento")]
    public IActionResult ObtenerEmpleadosConDepartamento()
    {
        var empleadosConDepartamento = _dbContext.Employee
            .Include(e => e.Departament)
            .Select(e => new
            {
                EmpleadoDpi = e.Dpi,
                EmpleadoNombre = e.Name,
                EmpleadoApellido = e.LastName,
                DepartamentoId = e.Departament.Id,
                DepartamentoNombre = e.Departament.Name,
                DepartamentoPresupuesto = e.Departament.Budget
            })
            .ToList();

        return Ok(empleadosConDepartamento);
    }
    [HttpGet("empleados-detallado-ordenado")]
    public IActionResult ObtenerEmpleadosDetalladoOrdenado()
    {
        var empleadosDetalladoOrdenado = _dbContext.Employee
            .Include(e => e.Departament)
            .OrderByDescending(e => e.LastName)
            .Select(e => new
            {
                e.Name,
                e.LastName,
                Departamento = e.Departament.Name,
                PresupuestoDepartamento = e.Departament.Budget
            })
            .ToList();

        return Ok(empleadosDetalladoOrdenado);
    }
    [HttpGet("empleados-departamento-presupuesto-60k")]
    public IActionResult ObtenerEmpleadosDepartamentoPresupuestoAlto()
    {
        var empleadosPresupuestoAlto = _dbContext.Employee
            .Include(e => e.Departament)
            .Where(e => e.Departament.Budget > 60000)
            .Select(e => new { e.Name, e.LastName })
            .ToList();

        return Ok(empleadosPresupuestoAlto);
    }
    [HttpGet("departamentos/presupuesto-sobre-media")]
    public IActionResult ObtenerDepartamentosPresupuestoSobreMedia()
    {
        var presupuestoMedio = _dbContext.Departamentos.Average(d => d.Budget);
        var departamentosSobreMedia = _dbContext.Departamentos
            .Where(d => d.Budget > presupuestoMedio)
            .ToList();

        return Ok(departamentosSobreMedia);
    }
    [HttpGet("departamentos/mas-de-dos-empleados")]
    public IActionResult ObtenerDepartamentosConMasDeDosEmpleados()
    {
        var departamentosConMasDeDosEmpleados = _dbContext.Employee
            .Include(e => e.Departament)
            .GroupBy(e => e.Departament.Name)
            .Select(group => new { Departamento = group.Key, Count = group.Count() })
            .Where(d => d.Count > 2)
            .Select(d => d.Departamento)
            .ToList();

        return Ok(departamentosConMasDeDosEmpleados);
    }

    [HttpPost("agregar-departamento-empleado")]
    public IActionResult AgregarDepartamentoYEmpleado()
    {

        var nuevoDepartamento = new Departamento
        {
            Name = "Control de Calidad",
            Budget = 40000
        };

        _dbContext.Departamentos.Add(nuevoDepartamento);
        _dbContext.SaveChanges();

        var nuevoEmpleado = new Employee
        {
            Dpi = "28948238",
            Name = "Esther",
            LastName = "Vásquez",
            Departament = nuevoDepartamento,
            DepartamentId = nuevoDepartamento.Id
        };

        _dbContext.Employee.Add(nuevoEmpleado);
        _dbContext.SaveChanges();

        return Ok(new { Departamento = nuevoDepartamento, Empleado = nuevoEmpleado });
    }

}
