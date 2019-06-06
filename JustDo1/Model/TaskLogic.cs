using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JustDo1.Model
{
    public class TaskLogic : ITaskLogic
    {
        private readonly ITaskRepository Repository;

        public TaskLogic(ITaskRepository repository)
        {
            Repository = repository;
        }

        public TaskModel GetTask(string taskId)
        {
            return Repository.GetTask(taskId);
        }

        public void CheckTask(string taskId)
		{
			Repository.CheckTask(taskId);
		}
        public void DeleteTask(string taskId)
		{
			Repository.DeleteTask(taskId);
		}

        public void EditTask(TaskModel task)
        {
            Repository.EditTask(task);
        }

        public void CreateTask(TaskModel task)
        {
            Repository.CreateTask(task);
        }

        public List<TaskModel> FilterTasks(int type, string date, bool check)
		{
            return Repository.FilterTasks(type, date, check);
        }
    }
}
