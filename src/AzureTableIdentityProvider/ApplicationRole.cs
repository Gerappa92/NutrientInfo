using Azure;
using Azure.Data.Tables;
using System;

namespace AzureTableIdentityProvider
{
    public class ApplicationRole : ITableEntity
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
    }
}
