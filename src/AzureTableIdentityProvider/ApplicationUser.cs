using Azure;
using Azure.Data.Tables;
using System;
using System.Security.Principal;

namespace AzureTableIdentityProvider
{
    public class ApplicationUser : IIdentity, ITableEntity
    {
        public virtual string Id { get; set; }
        public virtual string Email { get; set; }
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
    }
}
