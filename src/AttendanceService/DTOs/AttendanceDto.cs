using AttendanceService.Models;

namespace AttendanceService.DTOs
{
    public class AttendanceDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }

        public string EmployeeName { get; set; }
        public DepartmentDto Department { get; set; }
        public RoleDto Role { get; set; }

        public DateTime? ArriveTime { get; set; }
        public DateTime? LeaveTime { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }
    }

}
