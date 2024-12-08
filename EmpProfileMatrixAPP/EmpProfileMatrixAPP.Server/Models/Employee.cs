using System.ComponentModel.DataAnnotations;

namespace EmpProfileMatrixAPP.Server.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public DateOnly Dob { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public decimal Salary { get; set; }
    }
}
