using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace JustDo1.Model
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Alarm
    {
        [EnumMember(Value = "5 min.")]
        FiveMinutes = 0,
        [EnumMember(Value = "10 min.")]
        TenMinutes,
        [EnumMember(Value = "30 min.")]
        ThirtyMinutes,
        [EnumMember(Value = "1 hour")]
        OneHour,
        [EnumMember(Value = "3 hours")]
        ThreeHours,
        [EnumMember(Value = "1 day")]
        OneDay,
        [EnumMember(Value = "1 week")]
        OneWeek
    }
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Priority
    {
        [EnumMember(Value = "Urgently")]
        Urgently = 0,
        [EnumMember(Value = "Important")]
        Important,
        [EnumMember(Value = "Normal")]
        Normal,
        [EnumMember(Value = "Neutral")]
        Neutral
    }
  
    public class TaskModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public Alarm Alarm { get; set; }
        public Priority Priority { get; set; }
    }
}
