using EmployeeService.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using EmployeeService.Models;

namespace EmployeeService.Data;

public class EmployeeRepository(EmployeeDbContext context, IMapper mapper) : IEmployeeRepository
{
    public void AddEmployee(Employee employee)
    {
        context.Employees.Add(employee);
    }

    public async Task<EmployeeResponseDto?> GetEmployeeByIdAsync(Guid id)
    {
        return await context.Employees
            .ProjectTo<EmployeeResponseDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Employee?> GetEmployeeModelById(Guid id)
    {
        return await context.Employees
            .Include(x => x.Department)
            .Include(x => x.Role)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<EmployeeResponseDto>> GetEmployeesAsync(string? date)
    {
        if (context == null) throw new NullReferenceException("Database context is null");
        if (mapper == null) throw new NullReferenceException("Mapper instance is null");

        var query = context.Employees.OrderBy(x => x.FullName).AsQueryable();

        if (!string.IsNullOrEmpty(date))
        {
            if (DateTime.TryParse(date, out var parsedDate))
            {
                query = query.Where(x => x.UpdatedAt.CompareTo(parsedDate.ToUniversalTime()) > 0);
            }
            else
            {
                throw new ArgumentException("Invalid date format");
            }
        }

        return await query.ProjectTo<EmployeeResponseDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public void RemoveEmployee(Employee employee)
    {
        context.Employees.Remove(employee);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}