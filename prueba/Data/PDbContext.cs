
namespace prueba.Data;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using prueba.Models;

public class PDbContext : DbContext
{

  public PDbContext(DbContextOptions<PDbContext> options) : base(options)
  {
  }

  public DbSet<Departamento> Departamentos { get; private set; }
  public DbSet<Employee> Employee { get; private set; }

  // protected override void OnModelCreating(ModelBuilder modelBuilder)
  // {
  //   modelBuilder.Entity<Employee>()
  //       .HasOne(e => e.Departament)
  //       .WithMany()
  //       .HasForeignKey(e => e.DepartamentId);
  // }
}
