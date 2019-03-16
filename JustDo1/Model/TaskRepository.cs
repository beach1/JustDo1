using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;

namespace JustDo1.Model
{
    public class TaskRepository : RepositoryBase, ITaskRepository
    {
        private readonly string taskTable = "JustDo.dbo.Tasks";
        private readonly string allTableFields = "SELECT *";
        private readonly string createTaskKey = "(Name,Description,Date,Priority,Alarm)";

        public TaskRepository(IConfiguration configuration) : base(configuration)
        {

        }

        protected override SqlConnection CreateNewConnection()
        {
            return new SqlConnection(ConnectionString);
        }
        public TaskModel GetTask(string taskId)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"{allTableFields} FROM {taskTable} WHERE Id=\'{taskId}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                TaskModel task = new TaskModel();
                while (reader.Read()){
                    task = new TaskModel
                    {
                        Id = (Guid)reader["id"],
                        Name = (string)reader["name"],
                        Description = (string)reader["description"],
                        Date = ((DateTime)reader["date"]),
                        Priority = (Priority)reader["alarm"]
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
                var priority = (int) task.Priority;
                var alarm = (int) task.Alarm;
                string sqlExpression = $"UPDATE {taskTable} SET Name=\'{task.Name}\'," +
                    $" Description=\'{task.Description}\', Date=\'{task.Date}\'," +
                    $" Alarm=\'{alarm}\', Priority={priority} WHERE Id=\'{task.Id}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }
        public void CreateTask(TaskModel task)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                var priority = (int)task.Priority;
                var alarm = (int)task.Alarm;
                string sqlExpression = $"INSERT INTO {taskTable} {createTaskKey} VALUES (\'{task.Name}\'," +
                    $"\'{task.Description}\',\'{task.Date}\'," +
                    $"{priority},{alarm})";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }

        public List<TaskModel> AllTasks(int type)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                var sqlExpression = type == 5 ? $"{allTableFields} FROM {taskTable}" : $"{allTableFields} FROM {taskTable} WHERE Priority=\'{type}\'";

                connection.Open();
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                List<TaskModel> list = new List<TaskModel>();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var user = new TaskModel
                        {
                            Id = (Guid)reader["id"],
                            Name = (string)reader["name"],
                            Description = (string)reader["description"],
                            Date = (DateTime)reader["date"],
                            Priority = (Priority)reader["priority"],
                            Alarm = (Alarm)reader["alarm"]
                        };
                        list.Add(user);
                    }

                    reader.Close();
                }
                return list;
            }
        }

    }

}