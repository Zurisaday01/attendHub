using EmployeeService.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using EmployeeService.Models;

namespace EmployeeService.Data;

public class RoleRepository(EmployeeDbContext context, IMapper mapper) : IRoleRepository
{
    public void AddRole(Role role)
    {
        context.Roles.Add(role);
    }

    public async Task<RoleDto?> GetRoleByIdAsync(Guid id) 
    {
        return await context.Roles
            .ProjectTo<RoleDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Role?> GetRoleModelById(Guid id)
    {
        return await context.Roles
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<RoleDto>> GetRolesAsync()
    {
        var query = context.Roles.OrderBy(x => x.Name).AsQueryable();

        return await query.ProjectTo<RoleDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public void RemoveRole(Role role)
    {
        context.Roles.Remove(role);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }




}