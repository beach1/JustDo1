using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JustDo1.Model
{
    public class Logic : ILogic
    {
        private string allTableFields = "SELECT Id,Name,Description,Date,Priority,Alarm";
        private string taskTable = "JustDo.dbo.Tasks";
        private IAppRepository Repository;

        public Logic(IAppRepository repository)
        {
            Repository = repository;
        }
        private ClaimsIdentity GetIdentity(CredentialsModel cred)
        {
            
            if (Repository.FindCredentials(cred))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, cred.Email)
                };
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            return null;
        }

        public string GetHash(string input)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));

            return Convert.ToBase64String(hash);
        }
        public TaskModel GetTask(string taskId)
        {
            return Repository.GetTask(taskId);
        }

        public void DeleteTask(List<string> list)
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
            var sqlExpression = type == 0 ? $"{allTableFields} FROM {taskTable}" : $"{allTableFields} FROM {taskTable} WHERE Priority=\'{type}\'";
            return Repository.AllTasks(sqlExpression);
        }
        public ClaimsIdentity SignIn(CredentialsModel cred)
        {
            cred.Password = GetHash(cred.Password);
            return GetIdentity(cred);
        }
        public bool ForgetPass(string cred)
        {
            if (!Repository.EmailCheck(cred))
            {
                return false;
            }
            Random generator = new Random();
            int code = generator.Next(100000, 1000000);
            Repository.CreateCode(cred, code);
            return true;
        }
        public bool ResetPass(ResetCredentialsModel cred)
        {
            cred.Password = GetHash(cred.Password);
            return Repository.ResetPass(cred);
        }
        public bool ChangePass(ChangeCredentialsModel cred)
        {
            cred.NewPassword = GetHash(cred.NewPassword);
            cred.Password = GetHash(cred.Password);
            return Repository.ChangePass(cred);
        }
        public bool SignUp(CredentialsModel cred)
        {
            if (Repository.EmailCheck(cred.Email))
            {
                return false;
            }
            cred.Password = GetHash(cred.Password);
            return Repository.AddCredentials(cred);
        }
    }
}
