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

        public void DeleteTasks(List<string> list)
        {
            foreach (var taskId in list)
            {
                Repository.DeleteTask(taskId);
            }
        }

        public void EditTask(TaskModel task)
        {
            Repository.EditTask(task);
        }

        public void CreateTask(TaskModel task)
        {
            Repository.CreateTask(task);
        }

        public List<TaskModel> AllTasks(int type)
        {
            return Repository.AllTasks(type);
        }
    }
}
