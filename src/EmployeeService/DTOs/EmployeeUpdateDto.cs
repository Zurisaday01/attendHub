using EmployeeService.Models;

namespace EmployeeService.DTOs
{
    public class EmployeeUpdateDto
    {
        public string? FullName { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? RoleId { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public DateTime? DateOfLeaving { get; set; }
        public Status? Status { get; set; }
    }
}