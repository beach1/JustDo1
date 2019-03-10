using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace JustDo1.Model
{
    public abstract class RepositoryBase
    {
        protected readonly string ConnectionString;

        protected RepositoryBase(IConfiguration configuration)
        {
            ConnectionString = configuration["connectionString"];
        }

        protected abstract SqlConnection CreateNewConnection();
    }
}
