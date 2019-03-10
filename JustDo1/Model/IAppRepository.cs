using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;

namespace JustDo1.Model
{
    public interface IAppRepository
    {
        List<TaskModel> AllTasks(string sqlExpression);
        TaskModel GetTask(string taskId);
        void DeleteTask(string taskId);
        void EditTask(TaskModel task);
        void CreateTask(TaskModel task);
        bool FindCredentials(CredentialsModel cred);
        bool AddCredentials(CredentialsModel cred);
        bool EmailCheck(string cred);
        void CreateCode(string email, int code);
        bool ResetPass(ResetCredentialsModel cred);
        bool ChangePass(ChangeCredentialsModel cred);
    }
}
