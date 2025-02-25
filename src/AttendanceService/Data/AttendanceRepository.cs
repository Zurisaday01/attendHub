using AttendanceService.DTOs;
using AttendanceService.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;


namespace AttendanceService.Data
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly AttendanceDbContext context;
        private readonly IMapper mapper;

        public AttendanceRepository(AttendanceDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public void AddAttendance(Attendance attendance)
        {
            context.Attendances.Add(attendance);
        }

        public async Task<AttendanceDto?> GetAttendanceByIdAsync(Guid id)
        {
            return await context.Attendances
                .ProjectTo<AttendanceDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Attendance?> GetAttendanceModelById(Guid id)
        {
            return await context.Attendances
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<AttendanceDto>> GetAttendancesAsync()
        {
            var query = context.Attendances.OrderBy(x => x.Date).AsQueryable();

            return await query
                .ProjectTo<AttendanceDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public void RemoveAttendance(Attendance attendance)
        {
            context.Attendances.Remove(attendance);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
