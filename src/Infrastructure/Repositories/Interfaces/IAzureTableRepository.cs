using Infrastructure.Contracts.AzureTables;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IAzureTableRepository<T> where T : AzureTable
    {
        void CreateTableClient(string tableName);
        public Azure.Pageable<T> Query();
        public T[] GetAll();
    }
}
