using System.Collections.Generic;

namespace JustDo1.Model
{
    public interface ITaskRepository
    {
        List<TaskModel> AllTasks(int type);
        TaskModel GetTask(string taskId);
        void DeleteTask(string taskId);
        void EditTask(TaskModel task);
        void CreateTask(TaskModel task);
    }
}
