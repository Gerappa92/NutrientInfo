using Azure;
using Azure.Data.Tables;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Exceptions;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
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
            _tableClient.CreateIfNotExists();
        }

        public async Task AddAsync(T entity)
        {
            CheckTableClient();
            var response = await _tableClient.AddEntityAsync(entity);
            CheckResponse(response);            
        }

        public async Task<T> GetByIdAsync(string id)
        {
            CheckTableClient();
            var pages = _tableClient.QueryAsync<T>(q => q.Id == id);

            T entity = null;
            await foreach (var item in pages)
            {
                entity = item;
                break;
            }
            return entity;
        }

        public async Task<T> GetAsync(string partitionKey, string rowKey)
        {
            CheckTableClient();
            return await _tableClient.GetEntityAsync<T>(partitionKey, rowKey);
        }

        public async Task<IEnumerable<T>> QueryAsync(System.Linq.Expressions.Expression<Func<T, bool>> query)
        {
            CheckTableClient();
            var pages = _tableClient.QueryAsync(query);
            List<T> result = new List<T>();
            await foreach (var item in pages)
            {
                result.Add(item);
            }
            return result;
        }

        public T[] GetAll()
        {
            CheckTableClient();
            return _tableClient.Query<T>().ToArray();
        }


        public async Task DeleteAsync(T entity)
        {
            CheckTableClient();
            var response = await _tableClient.DeleteEntityAsync(entity.PartitionKey, entity.RowKey);
            CheckResponse(response);
        }

        public async Task UpdateAsync(T entity)
        {
            CheckTableClient();
            var response = await _tableClient.UpdateEntityAsync(entity, ETag.All);
            CheckResponse(response);
        }

        private void CheckTableClient()
        {
            if(_tableClient is null)
            {
                throw new AzureTableRepositoryException("The table client wasn't instantiated");
            }
        }

        private void CheckResponse(Response response)
        {
            if (response.IsError)
            {
                string description = string.Empty;

                if (response.ContentStream != null)
                {
                    using TextReader content = new StreamReader(response.ContentStream);
                    description = $"Status: {response.Status}.\nReason: {response.ReasonPhrase}.\n  Description: {content.ReadToEnd()}";
                }
                throw new AzureTableRepositoryException(description);
            }
        }
    }
}
