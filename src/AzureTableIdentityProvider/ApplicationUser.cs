using Azure;
using Azure.Data.Tables;
using Newtonsoft.Json;
using System;
using System.Security.Principal;

namespace AzureTableIdentityProvider
{
    public class ApplicationUser : IIdentity, ITableEntity
    {
        public ApplicationUser()
        {

        }

        public ApplicationUser(string email)
        {
            var id = Guid.NewGuid().ToString();
            Id = id;
            RowKey = id;
            Email = email;
            Name = email;
        }
        public virtual string Id { get; set; }
        public virtual string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public virtual bool EmailConfirmed { get; set; }
        public virtual string PasswordHash { get; set; }
        public string AuthenticationType { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
        public string RefreshTokenJson { get; set; }

        public RefreshToken GetRefreshToken() => JsonConvert.DeserializeObject<RefreshToken>(RefreshTokenJson);
        public void SetRefreshToken(RefreshToken refreshToken) => RefreshTokenJson = JsonConvert.SerializeObject(refreshToken);
        public void SetPartitionKey(string partitionKey) => PartitionKey = partitionKey;
    }
}
