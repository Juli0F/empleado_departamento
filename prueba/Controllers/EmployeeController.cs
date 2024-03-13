
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prueba.Data;
using prueba.Models;

namespace prueba.Controllers;

[ApiController, Route("employee")]
public class EmployeeController : Controller
{
  private readonly ILogger<EmployeeController> _logger;
  private readonly PDbContext _dbContext;
  public EmployeeController(ILogger<EmployeeController> logger, PDbContext dbContext)
  {
    this._logger = logger;
    this._dbContext = dbContext;
  }
  [HttpPost]
  public IActionResult Create([FromBody] Employee employee)
  {
    if (employee == null || !ModelState.IsValid)
      return BadRequest();

    _dbContext.Employee.Add(employee);
    _dbContext.SaveChanges();
    return Ok(employee);
  }
  [HttpGet]
  public IActionResult GetAll()
  {
    var employees = _dbContext.Employee
        .Include(e => e.Departament)
        .ToList();
    return Ok(employees);
  }
  [HttpGet("{dpi}")]
  public IActionResult GetById(string dpi)
  {
    var empleado = _dbContext.Employee
        .Include(e => e.Departament)
        .FirstOrDefault(e => e.Dpi == dpi);

    if (empleado == null)
    {
      return NotFound();
    }

    return Ok(empleado);
  }

  [HttpPut("{dni}")]
  public IActionResult Update(string dpi, [FromBody] Employee employeeUpdate)
  {
    var empleado = _dbContext.Employee
        .FirstOrDefault(e => e.Dpi == dpi);

    if (empleado == null)
    {
      return NotFound();
    }

    empleado.Name = employeeUpdate.Name;
    empleado.LastName = employeeUpdate.LastName;

    _dbContext.SaveChanges();
    return Ok(empleado);
  }

  [HttpDelete("{dni}")]
  public IActionResult Delete(string dpi)
  {
    var empleado = _dbContext.Employee
        .FirstOrDefault(e => e.Dpi == dpi);

    if (empleado == null)
    {
      return NotFound();
    }

    _dbContext.Employee.Remove(empleado);
    _dbContext.SaveChanges();
    return Ok();
  }



}
