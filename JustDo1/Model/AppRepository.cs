using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;

namespace JustDo1.Model
{
    public class AppRepository : RepositoryBase, IAppRepository
    {
        private string taskTable = "JustDo.dbo.Tasks";
        private string credentialsTable = "JustDo.dbo.Credentials";
        private string allTableFields = "SELECT Id,Name,Description,Date,Priority,Alarm";
        private string createTaskKey = "(Name,Description,Date,Priority,Alarm)";
        public AppRepository(IConfiguration configuration) : base(configuration)
        {

        }

        protected override SqlConnection CreateNewConnection()
        {
            return new SqlConnection(ConnectionString);
        }
        public TaskModel GetTask(string taskId)
        {
            using(SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression =  $"{allTableFields} FROM {taskTable} WHERE Id=\'{taskId}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                TaskModel task = new TaskModel();
                while (reader.Read()) // построчно считываем данные
                {
                    task = new TaskModel
                    {
                        Id = (Guid)reader["id"],
                        Name = (string)reader["name"],
                        Description = (string)reader["description"],
                        Date = ((DateTime)reader["date"]).ToString("MM/dd/yyyy/", CultureInfo.InvariantCulture),
                        Time = ((DateTime)reader["time"]).ToShortTimeString(),
                        Priority = (int)reader["priority"],
                    };
                }
                return task;
            }
        }
        public void DeleteTask(string taskId)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"DELETE FROM {taskTable} WHERE Id=\'{taskId}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }
        public void EditTask(TaskModel task)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"SET DATEFORMAT YMD \r\n" +
                                       $"UPDATE {taskTable} SET Name=\'{task.Name}\'," +
                    $" Description=\'{task.Description}\', Date=\'{task.Date}\'," +
                    $" Alarm=\'{task.Alarm}\', Priority={task.Priority} WHERE Id=\'{task.Id}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }
        public void CreateTask(TaskModel task)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"SET DATEFORMAT YMD \r\n" +
                                       $"INSERT INTO {taskTable} {createTaskKey} VALUES (\'{task.Name}\'," +
                    $"\'{task.Description}\',\'{task.Date}\'," +
                    $"{task.Priority},{task.Alarm})";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }
        public void CreateCode(string email, int code)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"UPDATE {credentialsTable} SET Code=\'{code}\' WHERE Email=\'{email}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }
        public bool ResetPass(ResetCredentialsModel cred)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"UPDATE {credentialsTable} SET Password=\'{cred.Password}\' WHERE Code=\'{cred.Code}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                var success = command.ExecuteNonQuery();
                if (success == -1)
                {
                    return false;
                };
                return true;
            }
        }
        public bool ChangePass(ChangeCredentialsModel cred)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"UPDATE {credentialsTable} SET Password=\'{cred.NewPassword}\' WHERE Password=\'{cred.Password}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                var success = command.ExecuteNonQuery();
                if (success == 0)
                {
                    return false;
                };
                return true;
            }
        }
        public List<TaskModel> AllTasks(string sqlExpression)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                List<TaskModel> list= new List<TaskModel>();
                if (reader.HasRows) // если есть данные
                {
                    while (reader.Read()) // построчно считываем данные
                    {
                        var user = new TaskModel
                        {
                            Id = (Guid)reader["id"],
                            Name = (string)reader["name"],
                            Description = (string)reader["description"],
                            Date = ((DateTime)reader["date"]).ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                            Time = ((DateTime)reader["date"]).ToShortTimeString(),
                            Priority = (int)reader["priority"],
                            Alarm = (int)reader["alarm"]
                        };
                        list.Add(user);
                    }
                    
                    reader.Close();
                }
                return list;
            }
        }

        public bool FindCredentials(CredentialsModel cred)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"SELECT * FROM {credentialsTable} WHERE Email=\'{cred.Email}\' AND Password=\'{cred.Password}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                if (!reader.HasRows)
                {
                    return false;
                }
                return true;
            }
        }

        public bool EmailCheck(string email)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"SELECT * FROM {credentialsTable} WHERE Email=\'{email}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                if (!reader.HasRows)
                {
                    return false;
                }
                return true;
            }
        }

        public bool AddCredentials(CredentialsModel cred)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"INSERT INTO {credentialsTable} (Email,Password) VALUES (\'{cred.Email}\',\'{cred.Password}\')";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                var success=command.ExecuteNonQuery();
                if (success==-1)
                {
                    return false;
                }
                return true;
            }
        }
    }

}
