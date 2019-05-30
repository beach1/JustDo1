using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;

namespace JustDo1.Model
{
    public class TaskRepository : RepositoryBase, ITaskRepository
    {
        private readonly string taskTable = "dbo.Tasks";
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

                string sqlExpression = $"UPDATE {taskTable} " +
                                       "SET Name=@Name , Description=@Description, Date=@Date, Priority=@Priority, Alarm=@Alarm " +
                                       "WHERE Id=@Id";
                SqlCommand command = new SqlCommand(sqlExpression, connection);

                command.Parameters.AddWithValue("@Id", task.Id);
                command.Parameters.AddWithValue("@Name", task.Name);
                command.Parameters.AddWithValue("@Description", task.Description);
                command.Parameters.AddWithValue("@Date", task.Date);
                command.Parameters.AddWithValue("@Priority", (int)task.Priority);
                command.Parameters.AddWithValue("@Alarm", (int)task.Alarm);

				command.ExecuteNonQuery();
            }
        }
        public void CreateTask(TaskModel task)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();

                string sqlExpression = $"INSERT INTO {taskTable} {createTaskKey} " +
                                       "VALUES (@Name , @Description, @Date, @Priority, @Alarm)";
                SqlCommand command = new SqlCommand(sqlExpression, connection);

                command.Parameters.AddWithValue("@Name", task.Name);
                command.Parameters.AddWithValue("@Description", task.Description);
                command.Parameters.AddWithValue("@Date", task.Date);
                command.Parameters.AddWithValue("@Priority", (int)task.Priority);
                command.Parameters.AddWithValue("@Alarm", (int)task.Alarm);

				command.ExecuteNonQuery();
            }
        }

        public List<TaskModel> AllTasks(int type)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                var sqlExpression = type == 5
	                ? $"{allTableFields} FROM {taskTable}" 
	                : $"{allTableFields} FROM {taskTable} WHERE Priority={type}";

                connection.Open();
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                SqlDataReader reader = command.ExecuteReader();
                List<TaskModel> list = new List<TaskModel>();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
						var task = new TaskModel
                        {
                            Id = (Guid)reader["id"],
                            Name = (string)reader["name"],
                            Description = (string)reader["description"],
                            Date = (DateTime)reader["date"],
                            Priority = (Priority)reader["priority"],
                            Alarm = (Alarm)reader["alarm"]
                        };
                        list.Add(task);
                    }

                    reader.Close();
                }
                return list;
            }
        }

    }

}