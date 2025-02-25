using AttendanceService.Models;

namespace AttendanceService.DTOs
{
    public class AttendanceUpdateDto
    {
        public Guid? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime? ArriveTime { get; set; }
        public DateTime? LeaveTime { get; set; }
        public DateTime? Date { get; set; } = DateTime.UtcNow;
        public Status? Status { get; set; }
        public string? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public string? RoleId { get; set; }
        public string? RoleName { get; set; }
    }
}