using Infrastructure.Contracts.AzureTables;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IAzureTableRepository<T> where T : AzureTable
    {
        void CreateTableClient(string tableName);
        public Azure.Pageable<T> Query();
        public T[] GetAll();
        Task<T> GetAsync(string partitionKey, string rowKey);
        Task<T> GetByIdAsync(string id);
    }
}
