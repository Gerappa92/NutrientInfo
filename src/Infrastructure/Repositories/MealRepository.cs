using Application.Common.Repositories;
using Domain.Entities;
using Infrastructure.Contracts.AzureTables;
using Infrastructure.Extensions;
using Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class MealRepository : IMealRepository
    {
        private const string TABLE_NAME = "Meals";
        
        private readonly IAzureTableRepository<MealEntity> _tableClient;

        public MealRepository(IAzureTableRepository<MealEntity> azureTable)
        {
            _tableClient = azureTable;
            _tableClient.CreateTableClient(TABLE_NAME);
        }

        public async Task AddAsync(Meal meal)
        {
            if (meal is null)
            {
                throw new System.ArgumentException("Meal cannot be null or empty", nameof(meal));
            }
            MealEntity entity = new MealEntity(meal);
            await _tableClient.AddAsync(entity);
        }

        public async Task<Meal> GetAsync(string id)
        {
            if (id.IsEmpty())
            {
                throw new System.ArgumentException("Id cannot be null or empty", nameof(id));
            }
            var mealEntity = await _tableClient.GetByIdAsync(id);
            if(mealEntity is null)
            {
                return null;
            }
            var meal = mealEntity.Map();
            return meal;
        }

        public async Task<IEnumerable<Meal>> GetUsersMeals(string author)
        {
            if(author.IsEmpty())
            {
                throw new System.ArgumentException("Author cannot be null or empty", nameof(author));
            }
            var mealEntities = await _tableClient.QueryAsync(m => m.Author == author);
            List<Meal> meals = new List<Meal>();
            foreach (var entity in mealEntities)
            {
                var meal = entity.Map();
                meals.Add(meal);
            }
            return meals;
        }

        public async Task DeleteAsync(string id)
        {
            if (id.IsEmpty())
            {
                throw new System.ArgumentException("Id cannot be null or empty", nameof(id));
            }
            var mealEntity = await _tableClient.GetByIdAsync(id);
            if(mealEntity is null)
            {
                return;
            }
            await _tableClient.DeleteAsync(mealEntity);
        }

        public async Task UpdateAsync(Meal meal)
        {
            if (meal is null)
            {
                throw new System.ArgumentException("Meal cannot be null or empty", nameof(meal));
            }
            var mealEntity = new MealEntity(meal);
            await _tableClient.UpdateAsync(mealEntity);
        }
    }
}
