using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JustDo1.Model
{
    public class TaskModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int Priority { get; set; }
        public int Alarm { get; set; }

    }
}
