using System.Collections.Generic;
using System.Security.Claims;

namespace JustDo1.Model
{
    public interface ITaskLogic
    {
        List<TaskModel> AllTasks(int type);
        TaskModel GetTask(string taskId);
        void DeleteTasks(List<string> list);
        void EditTask(TaskModel task);
        void CreateTask(TaskModel task);
    }
}
