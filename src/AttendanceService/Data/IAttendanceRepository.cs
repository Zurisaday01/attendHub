using AttendanceService.DTOs;
using AttendanceService.Models;
namespace AttendanceService.Data
{
    public interface IAttendanceRepository
    {
        Task<List<AttendanceDto>> GetAttendancesAsync();
        Task<AttendanceDto?> GetAttendanceByIdAsync(Guid id);
        Task<Attendance?> GetAttendanceModelById(Guid id);
        void AddAttendance(Attendance attendance);
        void RemoveAttendance(Attendance attendance);
        Task<bool> SaveChangesAsync();
    }
}
