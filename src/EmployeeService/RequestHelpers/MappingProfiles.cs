using EmployeeService.DTOs;
using EmployeeService.Models;
using AutoMapper;

namespace EmployeeService.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Employee, EmployeeResponseDto>().IncludeMembers(x => x.Department, x => x.Role);
            CreateMap<EmployeeCreateDto, Employee>();


            CreateMap<Department, DepartmentDto>();
            // necessary to get the Department name in the response
            CreateMap<Department, EmployeeResponseDto>().ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Name));
            CreateMap<Role, EmployeeResponseDto>().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Name));

            CreateMap<DepartmentCreateDto, Department>();
            CreateMap<Department, DepartmentDto>();
            CreateMap<Role, RoleDto>();
            CreateMap<RoleCreateDto, Role>();
        }
    }
}