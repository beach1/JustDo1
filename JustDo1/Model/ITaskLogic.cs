using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace JustDo1.Model
{
    public interface ITaskLogic
    {
        List<TaskModel> FilterTasks(int type, string date, bool check);
        TaskModel GetTask(string taskId);
        void CheckTask(string taskId);
        void DeleteTask(string taskId);
		void EditTask(TaskModel task);
        void CreateTask(TaskModel task);
    }
}
