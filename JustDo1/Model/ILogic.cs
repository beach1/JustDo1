using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace JustDo1.Model
{
    public interface ILogic
    {
        List<TaskModel> AllTasks(int type);
        TaskModel GetTask(string taskId);
        void DeleteTask(List<string> list);
        void EditTask(TaskModel task);
        void CreateTask(TaskModel task);
        ClaimsIdentity SignIn(CredentialsModel cred);
        bool SignUp(CredentialsModel cred);
        bool ForgetPass(string cred);
        bool ResetPass(ResetCredentialsModel cred);
        bool ChangePass(ChangeCredentialsModel cred);
    }
}
