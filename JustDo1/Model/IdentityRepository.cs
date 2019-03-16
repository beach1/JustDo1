using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace JustDo1.Model
{
    public class IdentityRepository : RepositoryBase, IIdentityRepository
    {

        private string credentialsTable = "dbo.Credentials";

        public IdentityRepository(IConfiguration configuration) : base(configuration)
        {

        }

        protected override SqlConnection CreateNewConnection()
        {
            return new SqlConnection(ConnectionString);
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
                return success != 0;
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
                return success != 0;
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
                return reader.HasRows;
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
                return reader.HasRows;
            }
        }

        public bool AddCredentials(CredentialsModel cred)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"INSERT INTO {credentialsTable} (Email,Password) VALUES (\'{cred.Email}\',\'{cred.Password}\')";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                var success = command.ExecuteNonQuery();
                return success != -1;
            }
        }
    }

}