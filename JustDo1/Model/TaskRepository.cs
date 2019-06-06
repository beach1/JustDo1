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
        private readonly string createTaskKey = "(Name,Description,Checked,Date,Priority,Alarm)";

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
                        Checked = (bool) reader["checked"],
                        Description = (string)reader["description"],
                        Date = ((DateTime)reader["date"]),
                        Priority = (Priority)reader["alarm"]
                };
                }
                return task;
            }
        }

        public void CheckTask(string taskId)
		{
			using (SqlConnection connection = CreateNewConnection())
			{
				connection.Open();
				string sqlExpression = $"UPDATE {taskTable} SET Checked = ~Checked WHERE Id=\'{taskId}\'";
				SqlCommand command = new SqlCommand(sqlExpression, connection);
				command.ExecuteNonQuery();
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
									   "SET Name=@Name , Description=@Description, Checked=@Checked, Date=@Date, Priority=@Priority, Alarm=@Alarm " +
                                       "WHERE Id=@Id";
                SqlCommand command = new SqlCommand(sqlExpression, connection);

                command.Parameters.AddWithValue("@Id", task.Id);
                command.Parameters.AddWithValue("@Name", task.Name);
                command.Parameters.AddWithValue("@Checked", task.Checked);
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
									   "VALUES (@Name , @Description, @Checked, @Date, @Priority, @Alarm)";
                SqlCommand command = new SqlCommand(sqlExpression, connection);

                command.Parameters.AddWithValue("@Name", task.Name);
                command.Parameters.AddWithValue("@Description", task.Description);
                command.Parameters.AddWithValue("@Checked", false);
                command.Parameters.AddWithValue("@Date", task.Date);
                command.Parameters.AddWithValue("@Priority", (int)task.Priority);
                command.Parameters.AddWithValue("@Alarm", (int)task.Alarm);

				command.ExecuteNonQuery();
            }
        }

        public List<TaskModel> FilterTasks(int type, string date, bool check)
        {
	        var whereClauses = new List<string>();

			if (type != 5)
				whereClauses.Add($"Priority={type}");

			if (!String.IsNullOrEmpty(date) && DateTime.TryParseExact(date, "dd.MM.yyyy", CultureInfo.InvariantCulture,
				    DateTimeStyles.None, out var dateTime))
			{
				whereClauses.Add($"Date >= '{dateTime:MM/dd/yyyy}'");
				whereClauses.Add($"Date < '{dateTime.AddDays(1):MM/dd/yyyy}'");
			}

			whereClauses.Add(check ? "Checked=1" : "Checked=0");


			using (SqlConnection connection = CreateNewConnection())
            {
                var sqlExpression = $"{allTableFields} FROM {taskTable}" +
                                    $" WHERE {String.Join(" AND ", whereClauses)}";

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
                            Checked = (bool)reader["checked"],
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