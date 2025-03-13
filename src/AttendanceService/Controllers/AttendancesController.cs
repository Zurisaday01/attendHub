using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using AttendanceService.Models;
using AttendanceService.Data;
using AttendanceService.DTOs;
using Microsoft.AspNetCore.Authorization;
using AttendanceService.Services;

namespace AttendanceService.Controllers
{
    // [ApiController]
    [Route("api/attendances")]
    public class AttendancesController(IAttendanceRepository repo, IMapper mapper, EmployeeSvcHttpClient employeeSvcHttpClient) : ControllerBase
    {
        private readonly IMapper _mapper = mapper;
        private readonly IAttendanceRepository _attendanceRepository = repo;

        private readonly EmployeeSvcHttpClient _employeeSvcHttpClient = employeeSvcHttpClient;

        [HttpGet]
        public async Task<ActionResult<List<AttendanceDto>>> GetAllAttendances([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var attendances = await _employeeSvcHttpClient.GetAllAttendancesWithEmployeeDetails(startDate, endDate);
            return Ok(attendances);
        }




        [HttpGet("{attendanceId}")]
        public async Task<ActionResult<AttendanceDto>> GetAttendanceWithEmployeeDetails(Guid attendanceId)
        {
            var attendanceDto = await _employeeSvcHttpClient.GetAttendanceWithEmployeeDetails(attendanceId);

            if (attendanceDto == null)
            {
                return NotFound();
            }

            return Ok(attendanceDto);
        }


        [HttpPost]
        public async Task<ActionResult<Attendance>> CreateAttendance([FromBody] AttendanceCreateDto newAttendanceDto)
        {
            try
            {

                var attendance = _mapper.Map<Attendance>(newAttendanceDto);


                _attendanceRepository.AddAttendance(attendance);

                // map Employee to EmployeeResponseDto
                var newAttendance = _mapper.Map<Attendance>(attendance);

                // save the changes to the database
                var result = await _attendanceRepository.SaveChangesAsync();

                if (result)
                {
                    // Return 201 Created status with the newly inserted employee
                    return CreatedAtAction(nameof(GetAttendanceWithEmployeeDetails), new { attendanceId = attendance.Id }, newAttendance);
                }
                else
                {
                    // If no attendance was inserted, return 500 Internal Server Error
                    return BadRequest("Failed to create attendance. Invalid input or database error.");

                }

            }
            catch (Exception ex)
            {
                // If no supplier was inserted, return 500 Internal Server Error
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPatch("{id}")]
        public async Task<ActionResult<Attendance>> UpdateAttendance(Guid id, [FromBody] AttendanceUpdateDto updatedAttendanceDto)
        {
            try
            {

                var attendance = await _attendanceRepository.GetAttendanceModelById(id);

                if (attendance == null)
                {
                    return NotFound("Attendance not found");
                }

                // Update properties of the employee
                // Only update properties if they are provided (not null)
                if (updatedAttendanceDto.EmployeeId.HasValue)
                {
                    attendance.EmployeeId = updatedAttendanceDto.EmployeeId.Value;
                }

                if (updatedAttendanceDto.ArriveTime.HasValue)
                {
                    attendance.ArriveTime = updatedAttendanceDto.ArriveTime.Value;
                }

                if (updatedAttendanceDto.LeaveTime.HasValue)
                {
                    attendance.LeaveTime = updatedAttendanceDto.LeaveTime.Value;
                }

                if (updatedAttendanceDto.Date.HasValue)
                {
                    attendance.Date = updatedAttendanceDto.Date.Value;
                }

                if (updatedAttendanceDto.Status.HasValue)
                {
                    attendance.Status = updatedAttendanceDto.Status.Value;
                }

                var result = await repo.SaveChangesAsync();

                if (result)
                {
                    // Return 200 OK status
                    return Ok("Attendance successfully updated");
                }
                else
                {

                    return BadRequest("Failed to update attendance. Invalid input or database error.");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult<Attendance>> DeleteAttendance(Guid id)
        {
            try
            {
                var attendance = await _attendanceRepository.GetAttendanceModelById(id);

                if (attendance == null)
                {
                    return NotFound("Attendance not found");
                }

                _attendanceRepository.RemoveAttendance(attendance);

                var result = await _attendanceRepository.SaveChangesAsync();

                if (result)
                {
                    return Ok("Attendance successfully deleted");
                }
                else
                {
                    return BadRequest("Failed to delete attendance. Database error.");
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

    }

}