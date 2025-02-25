using EmployeeService.Models;
using EmployeeService.DTOs;

namespace EmployeeService.Data;

public interface IDepartmentRepository
{
    Task<List<DepartmentDto>> GetDepartmentsAsync();
    Task<DepartmentDto?> GetDepartmentByIdAsync(Guid id);
    Task<List<EmployeeResponseDto>> GetEmployeesByDepartment(Guid departmentId);
    Task<Department?> GetDepartmentModelById(Guid id);
    void AddDepartment(Department department);
    void RemoveDepartment(Department department);
    Task<bool> SaveChangesAsync();
}