using EmployeeService.DTOs;
using EmployeeService.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeService.Data
{
    public static class DbInitializer
    {
        public static void Initialize(WebApplication app)
        {
            // create the scope to get the services
            using var scope = app.Services.CreateScope();

            SeedData(scope.ServiceProvider.GetService<EmployeeDbContext>());

        }

        private static void SeedData(EmployeeDbContext context)
        {
            // create a database if it doesn't exist
            context.Database.Migrate();

            // check if the database has any data
            if (context.Employees.Any())
            {
                Console.WriteLine("Database has been seeded");
                return; // database has been seeded
            }

            // Seed roles if empty using DTO
            if (!context.Roles.Any())
            {
                var roles = new List<RoleDto>
                {
                    new() { Name = "Developer" },
                    new() { Name = "Manager" }
                };

                foreach (var roleDto in roles)
                {
                    var role = new Role
                    {
                        Name = roleDto.Name
                    };

                    context.Roles.Add(role);
                }

                context.SaveChanges();
            }

            // Seed departments if empty using DTO
            if (!context.Departments.Any())
            {
                var departments = new List<DepartmentDto>
                {
                    new() { Name = "IT" },
                    new() { Name = "HR" }
                };

                foreach (var departmentDto in departments)
                {
                    var department = new Department
                    {
                        Name = departmentDto.Name
                    };

                    context.Departments.Add(department);
                }

                context.SaveChanges();
            }
        }
    }
}