using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace EmployeeService.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        [EnumMember(Value = "Active")]
        Active = 0,
        [EnumMember(Value = "Inactive")]
        Inactive = 1,
        [EnumMember(Value = "OnLeave")]
        OnLeave = 2
    }
}