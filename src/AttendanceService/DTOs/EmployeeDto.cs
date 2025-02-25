namespace AttendanceService.DTOs
{
    public class EmployeeDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public DepartmentDto Department { get; set; }
        public RoleDto Role { get; set; }
    }

}
