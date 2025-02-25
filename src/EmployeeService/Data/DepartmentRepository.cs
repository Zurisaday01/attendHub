using EmployeeService.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using EmployeeService.Models;

namespace EmployeeService.Data;

public class DepartmentRepository(EmployeeDbContext context, IMapper mapper) : IDepartmentRepository
{
    public void AddDepartment(Department department)
    {
        context.Departments.Add(department);
    }

    public async Task<DepartmentDto?> GetDepartmentByIdAsync(Guid id)
    {
        return await context.Departments
            .ProjectTo<DepartmentDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<EmployeeResponseDto>> GetEmployeesByDepartment(Guid departmentId)
    {
        return await context.Employees
            .Where(x => x.DepartmentId == departmentId && x.Status == Status.Active)
            .ProjectTo<EmployeeResponseDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<Department?> GetDepartmentModelById(Guid id)
    {
        return await context.Departments
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<DepartmentDto>> GetDepartmentsAsync()
    {
        var query = context.Departments.OrderBy(x => x.Name).AsQueryable();

        return await query.ProjectTo<DepartmentDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public void RemoveDepartment(Department department)
    {
        context.Departments.Remove(department);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }




}