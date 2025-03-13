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
    [Route("api/roles")]
    public class RolesController(IRoleRepository repo, IMapper mapper) : ControllerBase
    {
        private readonly IRoleRepository _roleRepository = repo;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<ActionResult<List<RoleDto>>> GetAllRoles()
        {
            return await _roleRepository.GetRolesAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleDto>> GetRoleById(Guid id)
        {
            try
            {
                var role = await _roleRepository.GetRoleByIdAsync(id);

                if (role == null)
                {
                    return NotFound("Role not found");
                }

                return Ok(role);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to fetch role with the specified ID: {ex.Message}");
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<RoleDto>> UpdateRole(Guid id, [FromBody] RoleCreateDto updatedRoleDto)
        {
            try
            {
                // Get role by id
                var role = await _roleRepository.GetRoleModelById(id);

                if (role == null)
                {
                    return NotFound("Role not found");
                }

                // Update role name
                role.Name = updatedRoleDto.Name;

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 200 OK status
                    return Ok("Role successfully updated");
                }
                else
                {
                    // If no role was updated, return 500 Internal Server Error
                    return BadRequest("Failed to update role. Invalid input or database error.");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }


        [HttpPost]
        public async Task<ActionResult<RoleDto>> AddRole(RoleCreateDto roleDto)
        {
            try
            {

                var role = _mapper.Map<Role>(roleDto);

                _roleRepository.AddRole(role);

                var newRole = _mapper.Map<RoleDto>(role);

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 201 Created status with the newly inserted role
                    return CreatedAtAction(nameof(GetRoleById), new { id = role.Id }, newRole);
                }
                else
                {
                    // If no supplier was inserted, return 500 Internal Server Error
                    return BadRequest("Failed to create role. Invalid input or database error.");

                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRole(Guid id)
        {
            try
            {
                var role = await _roleRepository.GetRoleModelById(id);

                if (role == null)
                {
                    return NotFound("Role not found");
                }

                _roleRepository.RemoveRole(role);

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 200 OK status
                    return Ok("Role successfully deleted");
                }
                else
                {
                    // If no role was deleted, return 500 Internal Server Error
                    return BadRequest("Failed to delete role. Invalid input or database error.");
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }


        }
    }
}