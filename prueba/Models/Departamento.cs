namespace prueba.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("department")]
public class Departamento
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id {get; set;}

    [Column("name"), Required ]
    public required string Name {get; set;}

    [Column("budget"), Required]
    public required decimal Budget {get; set;}
    
}
