using System;

namespace Domain.Entities
{
    public class User
    {
        public User(string email, string name, string password)
        {
            Email = email;
            Name = string.IsNullOrEmpty(name) ? email : name;
            Password = password;
        }
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Password { get; set; }
        public string AuthenticationType { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Name { get; set; }
    }
}
