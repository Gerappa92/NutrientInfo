using Azure;
using Azure.Data.Tables;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class AzureTableRepository<T> : IAzureTableRepository<T> where T : AzureTable, new()
    {
        private readonly string _connectionString;
        private TableClient _tableClient;

        public AzureTableRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("AzureStorageAccount");
        }

        public void CreateTableClient(string tableName)
        {
            _tableClient = new TableClient(_connectionString, tableName);
        }

        public Pageable<T> Query()
        {
            return _tableClient.Query<T>();
        }

        public T[] GetAll()
        {
            return _tableClient.Query<T>().ToArray();
        }

        public async Task<T> GetAsync(string partitionKey, string rowKey)
        {
            return await _tableClient.GetEntityAsync<T>(partitionKey, rowKey);
        }

        public async Task<T> GetByIdAsync(string id)
        {
            var pages = _tableClient.QueryAsync<T>(q => q.Id == id);

            T entity = null;
            await foreach (var item in pages)
            {
                entity = item;
                break;
            }
            return entity;
        }
    }
}
