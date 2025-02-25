using System.ComponentModel.DataAnnotations.Schema;

namespace AttendanceService.Models
{
    [Table("Attendances")]
    public class Attendance
    {
        public Guid Id { get; set; }
        // Foreign Key for the Employee referenced by their ID
        public Guid EmployeeId { get; set; }
        public DateTime? ArriveTime { get; set; }
        public DateTime? LeaveTime { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }

    }
}