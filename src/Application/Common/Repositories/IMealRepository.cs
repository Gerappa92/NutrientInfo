using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Common.Repositories
{
    public interface IMealRepository
    {
        public Task AddAsync(Domain.Entities.Meal meal);
        public Task DeleteAsync(string id);
        public Task UpdateAsync(Domain.Entities.Meal meal);
        public Task<Domain.Entities.Meal> GetAsync(string id);
        public Task<IEnumerable<Domain.Entities.Meal>> GetUsersMeals(string author);
    }
}
