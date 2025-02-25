using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeService.Models
{
    [Table("Departments")]
    public class Department
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        // Navigation property for related Employees
        public ICollection<Employee> Employees { get; set; }
    }
}