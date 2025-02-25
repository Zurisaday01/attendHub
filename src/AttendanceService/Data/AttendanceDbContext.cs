using AttendanceService.Models;
using Microsoft.EntityFrameworkCore;

namespace AttendanceService.Data
{
    public class AttendanceDbContext : DbContext
    {
        public AttendanceDbContext(DbContextOptions<AttendanceDbContext> options) : base(options)
        {
        }

        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Attendance>()
                .Property(e => e.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Attendance>()
                   .Property(a => a.ArriveTime)
                   .HasConversion(
                       v => v.HasValue ? v.Value.ToUniversalTime() : (DateTime?)null, // Handling nullable DateTime
                       v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : (DateTime?)null // Handling nullable DateTime
                   );

            modelBuilder.Entity<Attendance>()
                .Property(a => a.LeaveTime)
                .HasConversion(
                    v => v.HasValue ? v.Value.ToUniversalTime() : (DateTime?)null, // Handling nullable DateTime
                    v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : (DateTime?)null // Handling nullable DateTime
                );

            modelBuilder.Entity<Attendance>()
                .Property(a => a.Date)
                .HasConversion(
                    v => v.ToUniversalTime(), // Direct conversion
                    v => DateTime.SpecifyKind(v, DateTimeKind.Utc) // Ensure UTC kind
                );
        }
    }
}