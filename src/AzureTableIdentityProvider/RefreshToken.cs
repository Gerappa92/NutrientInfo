using System;
using System.Runtime.Serialization;

namespace AzureTableIdentityProvider
{
    public class RefreshToken
    {
        public RefreshToken()
        {

        }

        public RefreshToken(string token, int lifetime)
        {
            Token = token;
            Created = DateTime.UtcNow;
            Expires = DateTime.UtcNow.AddSeconds(lifetime);
        }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime Created { get; set; }
        //public DateTime? Revoked { get; set; }
        //public string ReplacedByToken { get; set; }
        public bool IsActive => !IsExpired; //Revoked == null && !IsExpired;
    }
}
