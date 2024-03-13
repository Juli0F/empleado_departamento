
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prueba.Data;
using prueba.Models;

namespace prueba.Controllers;

[ApiController, Route("departament")]
public class DepartamentController : Controller
{

    private readonly ILogger<DepartamentController> _logger;
    private readonly PDbContext _dbContext;
    public DepartamentController(ILogger<DepartamentController> logger, PDbContext dbContext)
    {
        this._logger = logger;
        this._dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var departamentos = _dbContext.Departamentos.ToList();
        return Ok(departamentos);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Departamento departament)
    {
        if (departament == null || !ModelState.IsValid)
            return BadRequest();

        _dbContext.Departamentos.Add(departament);
        _dbContext.SaveChanges();
        return Ok(departament);

    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var departamento = _dbContext.Departamentos.Find(id);

        if (departamento == null)
        {
            return NotFound();
        }

        return Ok(departamento);
    }
    [HttpPut("{id}")]
    public IActionResult UpdateDepartamento(long id, [FromBody] Departamento departamentoUpdate)
    {
        var departamento = _dbContext.Departamentos.Find(id);

        if (departamento == null)
        {
            return NotFound();
        }
        departamento.Name = departamentoUpdate.Name;
        departamento.Budget = departamentoUpdate.Budget;

        _dbContext.SaveChanges();
        return Ok(departamento);
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteDepartamento(long id)
    {
        var departamento = _dbContext.Departamentos.Find(id);

        if (departamento == null)
        {
            return NotFound();
        }

        _dbContext.Departamentos.Remove(departamento);
        _dbContext.SaveChanges();
        return Ok();
    }




}
