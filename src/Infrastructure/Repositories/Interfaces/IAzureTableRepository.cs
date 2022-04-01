using Infrastructure.Contracts.AzureTables;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IAzureTableRepository<T> where T : AzureTable
    {
        void CreateTableClient(string tableName);
        Task AddAsync(T entity);
        Task DeleteAsync(T entity);
        Task UpdateAsync(T entity);
        Task<IEnumerable<T>> QueryAsync(System.Linq.Expressions.Expression<Func<T, bool>> query);
        Task<T> GetAsync(string partitionKey, string rowKey);
        Task<T> GetByIdAsync(string id);
        T[] GetAll();
    }
}
