using AttendanceService.DTOs;
using AttendanceService.Models;
using AutoMapper;

namespace AttendanceService.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Attendance, Attendance>();
            CreateMap<AttendanceCreateDto, Attendance>();
            CreateMap<Attendance, AttendanceCreateDto>();
            CreateMap<Attendance, AttendanceUpdateDto>();
            CreateMap<AttendanceUpdateDto, Attendance>();
            CreateMap<Attendance, AttendanceDto>();
            CreateMap<AttendanceDto, Attendance>();
        }
    }
}