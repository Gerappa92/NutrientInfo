using Azure;
using Azure.Data.Tables;
using System;

namespace Infrastructure.Contracts.AzureTables
{
    public abstract class AzureTable : ITableEntity
    {
        public string Id { get; set; }
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public ETag ETag { get; set; }
        DateTimeOffset? ITableEntity.Timestamp { get; set; }
    }
}
