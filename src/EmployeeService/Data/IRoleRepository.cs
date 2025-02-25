using EmployeeService.Models;
using EmployeeService.DTOs;

namespace EmployeeService.Data;

public interface IRoleRepository
{
    Task<List<RoleDto>> GetRolesAsync();
    Task<RoleDto?> GetRoleByIdAsync(Guid id);
    Task<Role?> GetRoleModelById(Guid id);
    void AddRole(Role role);
    void RemoveRole(Role role);
    Task<bool> SaveChangesAsync();
}