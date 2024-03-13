using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace prueba.Models;

[Table("employee")]
public class Employee
{
    [Key]
    public required string Dpi { get; set; }

    [Column("name"), Required]
    public required string Name { get; set; }

    [Column("last_name"), Required]
    public required string LastName { get; set; }

    [Column("Departament"), Required]
    public required long DepartamentId { get; set; }

    [ForeignKey("DepartamentId")]
    public Departamento Departament { get; set; }
}
