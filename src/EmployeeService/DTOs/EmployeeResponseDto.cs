using System.Text.Json.Serialization;
using EmployeeService.Models;

namespace EmployeeService.DTOs
{
    public class EmployeeResponseDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public DepartmentDto Department { get; set; } // Full Department object
        public RoleDto Role { get; set; } // Full Role object
        public DateTime DateOfJoining { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Status Status { get; set; } // Active, Inactive, etc.
    }

    // DTOs for Department and Role
    public class DepartmentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class RoleDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}