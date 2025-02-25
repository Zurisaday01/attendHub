using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EmployeeService.Models;
using EmployeeService.Data;
using EmployeeService.DTOs;
using Microsoft.AspNetCore.Authorization;


namespace EmployeeService.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/employees")]
    public class EmployeesController(IEmployeeRepository repo, IMapper mapper) : ControllerBase
    {
        private readonly IMapper _mapper = mapper;
        private readonly IEmployeeRepository _employeeRepository = repo;

        [HttpGet]
        public async Task<ActionResult<List<EmployeeResponseDto>>> GetAllEmployees(string? date)
        {
            return await repo.GetEmployeesAsync(date);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeResponseDto>> GetEmployeeById(Guid id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);

            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            return Ok(employee);
        }


        [HttpPost]
        public async Task<ActionResult<EmployeeResponseDto>> CreateEmployee(EmployeeCreateDto newEmployeeDto)
        {
            try
            {
                // map the EmployeeCreateDto to Employee
                var employee = _mapper.Map<Employee>(newEmployeeDto);

                // add the employee to the database
                _employeeRepository.AddEmployee(employee);

                // map Employee to EmployeeResponseDto
                var newEmployee = _mapper.Map<EmployeeResponseDto>(employee);

                // save the changes to the database
                var result = await _employeeRepository.SaveChangesAsync();

                if (result)
                {
                    // Return 201 Created status with the newly inserted employee
                    return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, newEmployee);
                }
                else
                {
                    // If no employee was inserted, return 500 Internal Server Error
                    return BadRequest("Failed to create employee. Invalid input or database error.");

                }

            }
            catch (Exception ex)
            {
                // If no supplier was inserted, return 500 Internal Server Error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<EmployeeResponseDto>> UpdateDepartment(Guid id, [FromBody] EmployeeUpdateDto updatedEmployeeDto)
        {
            try
            {

                var employee = await _employeeRepository.GetEmployeeModelById(id);

                if (employee == null)
                {
                    return NotFound("Employee not found");
                }

                // Update properties of the employee
                // Only update properties if they are provided (not null)
                if (!string.IsNullOrEmpty(updatedEmployeeDto.FullName))
                {
                    employee.FullName = updatedEmployeeDto.FullName;
                }

                if (updatedEmployeeDto.DepartmentId.HasValue)
                {
                    // unboxed nullable Guid to Guid
                    employee.DepartmentId = updatedEmployeeDto.DepartmentId.Value;
                }

                if (updatedEmployeeDto.RoleId.HasValue)
                {
                    employee.RoleId = updatedEmployeeDto.RoleId.Value;
                }

                if (!string.IsNullOrEmpty(updatedEmployeeDto.Email))
                {
                    employee.Email = updatedEmployeeDto.Email;
                }

                if (updatedEmployeeDto.DateOfJoining.HasValue)
                {
                    employee.DateOfJoining = updatedEmployeeDto.DateOfJoining.Value;
                }

                if (updatedEmployeeDto.DateOfLeaving.HasValue)
                {
                    employee.DateOfLeaving = updatedEmployeeDto.DateOfLeaving.Value;
                }

                if (updatedEmployeeDto.Status.HasValue)
                {
                    employee.Status = updatedEmployeeDto.Status.Value;
                }


                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 200 OK status
                    return Ok("Employee successfully updated");
                }
                else
                {
                    // If no department was updated, return 500 Internal Server Error
                    return BadRequest("Failed to update employee. Invalid input or database error.");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(Guid id)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployeeModelById(id);

                if (employee == null)
                {
                    return NotFound("Attendance not found");
                }

                _employeeRepository.RemoveEmployee(employee);

                var result = await _employeeRepository.SaveChangesAsync();

                if (result)
                {
                    return Ok("Employee successfully deleted");
                }
                else
                {
                    return BadRequest("Failed to delete employee. Database error.");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }

}



