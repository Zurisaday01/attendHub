using System.Net.Http.Headers;
using AttendanceService.Data;
using AttendanceService.DTOs;
using Microsoft.EntityFrameworkCore;

namespace AttendanceService.Services;

public class EmployeeSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly AttendanceDbContext _dbContext;

    public EmployeeSvcHttpClient(HttpClient httpClient, IConfiguration config, AttendanceDbContext dbContext)
    {
        _httpClient = httpClient;
        _config = config;
        _dbContext = dbContext;
    }

    public async Task<AttendanceDto> GetAttendanceWithEmployeeDetails(Guid attendanceId)
    {
        var attendance = await _dbContext.Attendances.FindAsync(attendanceId);
        if (attendance == null) return null;

        var employeeUrl = $"{_config["EmployeeServiceUrl"]}/api/employees/{attendance.EmployeeId}";

        var employee = await _httpClient.GetFromJsonAsync<EmployeeDto>(employeeUrl);
        if (employee == null) return null;

        return new AttendanceDto
        {
            Id = attendance.Id,
            EmployeeId = attendance.EmployeeId,
            EmployeeName = employee.FullName,
            Department = new DepartmentDto
            {
                Id = employee.Department.Id,
                Name = employee.Department.Name
            },
            Role = new RoleDto
            {
                Id = employee.Role.Id,
                Name = employee.Role.Name
            },
            ArriveTime = attendance.ArriveTime,
            LeaveTime = attendance.LeaveTime,
            Date = attendance.Date,
            Status = attendance.Status
        };
    }

    public async Task<List<AttendanceDto>> GetAllAttendancesWithEmployeeDetails(DateTime? startDate = null, DateTime? endDate = null)
    {

        var query = _dbContext.Attendances.AsQueryable();

        // Apply date filtering if startDate or endDate is provided
        if (startDate.HasValue)
        {
            query = query.Where(a => a.Date >= startDate.Value);
        }
        if (endDate.HasValue)
        {
            query = query.Where(a => a.Date <= endDate.Value);
        }

        var attendances = await query.OrderByDescending(a => a.Date).ToListAsync();
        if (!attendances.Any()) return new List<AttendanceDto>();


        var tasks = attendances.Select(async attendance =>
        {
            var employeeUrl = $"{_config["EmployeeServiceUrl"]}/api/employees/{attendance.EmployeeId}";
            var employee = await _httpClient.GetFromJsonAsync<EmployeeDto>(employeeUrl);
            if (employee == null) return null;


            return new AttendanceDto
            {
                Id = attendance.Id,
                EmployeeId = attendance.EmployeeId,
                EmployeeName = employee.FullName,
                Department = new DepartmentDto
                {
                    Id = employee.Department.Id,
                    Name = employee.Department.Name
                },
                Role = new RoleDto
                {
                    Id = employee.Role.Id,
                    Name = employee.Role.Name
                },
                ArriveTime = attendance.ArriveTime,
                LeaveTime = attendance.LeaveTime,
                Date = attendance.Date,
                Status = attendance.Status
            };
        });

        var results = await Task.WhenAll(tasks);
        return results.Where(dto => dto != null).ToList()!;
    }
}
