using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EmployeeService.Models;
using EmployeeService.Data;
using EmployeeService.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeService.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/departments")]
    public class DepartmentsController(IDepartmentRepository repo, IMapper mapper) : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepository = repo;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<List<DepartmentDto>>> GetAllDepartments()
        {
            return await _departmentRepository.GetDepartmentsAsync();
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentDto>> GetDepartmentById(Guid id)
        {
            try
            {
                var department = await _departmentRepository.GetDepartmentByIdAsync(id);

                if (department == null)
                {
                    return NotFound("Department not found");
                }

                return Ok(department);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to fetch department with the specified ID: {ex.Message}");
            }
        }

        [HttpGet("employees/{departmentId}")]
        public async Task<ActionResult<List<EmployeeResponseDto>>> GetEmployeesByDepartment(Guid departmentId)
        {
            try
            {
                var employees = await _departmentRepository.GetEmployeesByDepartment(departmentId);



                if (employees == null)
                {
                    return NotFound("Employees not found");
                }

                return Ok(employees);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to fetch department with the specified name: {ex.Message}");
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<DepartmentDto>> UpdateDepartment(Guid id, [FromBody] DepartmentCreateDto updatedDepartmentDto)
        {
            try
            {
                // Get department by id
                var department = await _departmentRepository.GetDepartmentModelById(id);

                if (department == null)
                {
                    return NotFound("Department not found");
                }

                // Update department name
                department.Name = updatedDepartmentDto.Name;

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 200 OK status
                    return Ok("Department successfully updated");
                }
                else
                {
                    // If no department was updated, return 500 Internal Server Error
                    return BadRequest("Failed to update department. Invalid input or database error.");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<DepartmentDto>> AddDepartment(DepartmentCreateDto departmentDto)
        {
            try
            {
                // Map DepartmentCreateDto to Department
                var department = _mapper.Map<Department>(departmentDto);

                // Add department to database
                _departmentRepository.AddDepartment(department);

                // Map Department to DepartmentDto
                var newDepartment = _mapper.Map<DepartmentDto>(department);

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 201 Created status with the newly inserted department
                    return CreatedAtAction(nameof(GetDepartmentById), new { id = department.Id }, newDepartment);
                }
                else
                {
                    // If no supplier was inserted, return 500 Internal Server Error
                    return BadRequest("Failed to create department. Invalid input or database error.");

                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepartment(Guid id)
        {
            try
            {
                // Get department by id
                var department = await _departmentRepository.GetDepartmentModelById(id);

                if (department == null)
                {
                    return NotFound("Department not found");
                }

                // Remove department from database
                _departmentRepository.RemoveDepartment(department);

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 200 OK status
                    return Ok("Department successfully deleted");
                }
                else
                {
                    // If no department was deleted, return 500 Internal Server Error
                    return BadRequest("Failed to delete department. Invalid input or database error.");
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }


        }
    }
}