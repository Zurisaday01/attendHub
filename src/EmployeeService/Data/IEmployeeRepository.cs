using EmployeeService.Models;
using EmployeeService.DTOs;

namespace EmployeeService.Data;

public interface IEmployeeRepository
{
    Task<List<EmployeeResponseDto>> GetEmployeesAsync(string? date);
    Task<EmployeeResponseDto?> GetEmployeeByIdAsync(Guid id);
    Task<Employee?> GetEmployeeModelById(Guid id);
    void AddEmployee(Employee employee);
    void RemoveEmployee(Employee employee);
    Task<bool> SaveChangesAsync();
}