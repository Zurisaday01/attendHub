using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace AttendanceService.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        [EnumMember(Value = "Confirmed")]
        Confirmed = 0,
        [EnumMember(Value = "Pending")]
        Pending = 1,
        [EnumMember(Value = "Absent")]
        Absent = 2,
    }
}