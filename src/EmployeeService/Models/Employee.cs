using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeService.Models
{
    [Table("Employees")]
    public class Employee
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        // Foreign key to Department
        public Guid DepartmentId { get; set; }  // Department Foreign Key
        public Department Department { get; set; } // Navigation property to Department
        public Guid RoleId { get; set; }         // Foreign Key to Role
        public Role Role { get; set; }           // Navigation property to Role        public string Email { get; set; }
        public DateTime DateOfJoining { get; set; }
        public DateTime? DateOfLeaving { get; set; } // Nullable for employees who have not left
        public Status Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}