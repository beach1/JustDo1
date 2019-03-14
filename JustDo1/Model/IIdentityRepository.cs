using System.Collections.Generic;

namespace JustDo1.Model
{
    public interface IIdentityRepository
    {
        bool FindCredentials(CredentialsModel cred);
        bool AddCredentials(CredentialsModel cred);
        bool EmailCheck(string cred);
        void CreateCode(string email, int code);
        bool ResetPass(ResetCredentialsModel cred);
        bool ChangePass(ChangeCredentialsModel cred);
    }
}
