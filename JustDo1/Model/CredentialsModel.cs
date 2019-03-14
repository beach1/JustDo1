
using System;

namespace JustDo1.Model
{
    public class CredentialsModel
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class ResetCredentialsModel
    {
        public int Code { get; set; }
        public string Password { get; set; }
    }
    public class ChangeCredentialsModel
    {
        public string NewPassword { get; set; }
        public string Password { get; set; }
    }
}
