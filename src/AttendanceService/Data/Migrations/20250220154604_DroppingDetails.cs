using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AttendanceService.Data.Migrations
{
    /// <inheritdoc />
    public partial class DroppingDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeName",
                table: "Attendances");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployeeName",
                table: "Attendances",
                type: "text",
                nullable: true);
        }
    }
}
